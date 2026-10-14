import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import * as XLSX from 'xlsx';
import { AULAS_CRONOGRAMA, TRILHAS_MODULOS } from '@/lib/activitiesData';

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);

    // @ts-ignore
    if (!session?.user?.email || session.user?.role !== 'ADMIN') {
        return new NextResponse('Unauthorized', { status: 401 });
    }

    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get('type') || 'matrix';
        const id = searchParams.get('id') || '';

        // Fetch students
        const students = await prisma.user.findMany({
            where: { email: { not: 'admin@sistema.local' } },
            orderBy: { name: 'asc' },
            select: {
                id: true,
                name: true,
                email: true,
                city: true,
                school: true,
                status: true,
                role: true
            }
        });

        // Fetch submissions
        const submissions = await prisma.activitySubmission.findMany({
            orderBy: { createdAt: 'desc' }
        });

        // Fetch progress
        const userProgress = await prisma.userProgress.findMany();

        // Fetch quizzes
        const quizResults = await prisma.quizResult.findMany({
            orderBy: { completedAt: 'desc' }
        });

        const workbook = XLSX.utils.book_new();

        // -------------------------------------------------------------
        // CASO 1: Exportar uma atividade específica das Aulas Práticas
        // -------------------------------------------------------------
        if (type === 'activity') {
            const classId = id || 'm1-1';
            const aula = AULAS_CRONOGRAMA.find(a => a.id === classId) || {
                id: classId,
                theme: `Aula ${classId}`,
                practice: 'Atividade Prática',
                moduloLabel: 'Módulo'
            };

            const subMap = new Map();
            submissions.filter(s => s.classId === classId).forEach(s => {
                subMap.set(s.userId, s);
            });

            const rows = students.map(student => {
                const sub = subMap.get(student.id);
                let fileUrls = '-';
                if (sub?.files) {
                    try {
                        const parsed = JSON.parse(sub.files);
                        if (Array.isArray(parsed) && parsed.length > 0) {
                            fileUrls = parsed.map(f => f.url).join(' | ');
                        }
                    } catch (e) {}
                }

                return {
                    'Nome do Cursista': student.name || 'Sem Nome',
                    'E-mail': student.email || '-',
                    'Cidade': student.city || '-',
                    'Escola': student.school || '-',
                    'Status de Entrega': sub ? 'ENTREGUE' : 'PENDENTE',
                    'Data de Envio': sub?.createdAt ? new Date(sub.createdAt).toLocaleString('pt-BR') : '-',
                    'Visibilidade': sub ? (sub.isPublic ? 'Pública' : 'Privada') : '-',
                    'Resposta / Texto': sub?.content || '-',
                    'Anexos (Links)': fileUrls
                };
            });

            const worksheet = XLSX.utils.json_to_sheet(rows);
            XLSX.utils.book_append_sheet(workbook, worksheet, `Atividade_${classId}`);

            const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new NextResponse(buf, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': `attachment; filename="controle_atividade_${classId}.xlsx"`
                }
            });
        }

        // -------------------------------------------------------------
        // CASO 2: Exportar o controle de uma Trilha de Aprendizagem
        // -------------------------------------------------------------
        if (type === 'trail') {
            const moduleId = id || 'modulo1';
            const trilha = TRILHAS_MODULOS.find(t => t.id === moduleId) || TRILHAS_MODULOS[0];
            const totalNodes = trilha.nodes.length;

            const progressMap = new Map<string, Set<string>>();
            userProgress.filter(p => p.moduleId === moduleId).forEach(p => {
                if (!progressMap.has(p.userId)) progressMap.set(p.userId, new Set());
                progressMap.get(p.userId)!.add(p.nodeId);
            });

            const quizMap = new Map();
            quizResults.filter(q => q.moduleId === moduleId).forEach(q => {
                if (!quizMap.has(q.userId)) quizMap.set(q.userId, q);
            });

            const rows = students.map(student => {
                const completedNodes = progressMap.get(student.id) || new Set();
                const completedCount = completedNodes.size;
                const isComplete = completedCount >= totalNodes;
                const quiz = quizMap.get(student.id);

                return {
                    'Nome do Cursista': student.name || 'Sem Nome',
                    'E-mail': student.email || '-',
                    'Cidade': student.city || '-',
                    'Escola': student.school || '-',
                    'Nós Concluídos': `${completedCount} de ${totalNodes}`,
                    'Progresso (%)': `${Math.round((completedCount / totalNodes) * 100)}%`,
                    'Status da Trilha': isComplete ? 'CONCLUÍDO' : (completedCount > 0 ? 'EM ANDAMENTO' : 'NÃO INICIADO'),
                    'Nota da Prova': quiz ? `${quiz.score}%` : 'Não Realizada',
                    'Resultado da Prova': quiz ? (quiz.passed ? 'APROVADO' : 'REPROVADO') : '-',
                    'Data da Prova': quiz?.completedAt ? new Date(quiz.completedAt).toLocaleString('pt-BR') : '-'
                };
            });

            const worksheet = XLSX.utils.json_to_sheet(rows);
            XLSX.utils.book_append_sheet(workbook, worksheet, `Trilha_${trilha.numero}`);

            const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            return new NextResponse(buf, {
                headers: {
                    'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                    'Content-Disposition': `attachment; filename="controle_trilha_${moduleId}.xlsx"`
                }
            });
        }

        // -------------------------------------------------------------
        // CASO 3: Matriz Geral Consolidada (Todas as Aulas e Trilhas)
        // -------------------------------------------------------------

        // Aba 1: Resumo Estatístico de Todas as Atividades e Trilhas
        const subCountsByClass: Record<string, number> = {};
        submissions.forEach(s => {
            if (s.classId) {
                subCountsByClass[s.classId] = (subCountsByClass[s.classId] || 0) + 1;
            }
        });

        const resumoAulas = AULAS_CRONOGRAMA.map(aula => {
            const entregues = subCountsByClass[aula.id] || 0;
            const pendentes = Math.max(0, students.length - entregues);
            const taxa = students.length > 0 ? Math.round((entregues / students.length) * 100) : 0;
            return {
                'ID': aula.id,
                'Módulo': aula.moduloLabel,
                'Data': aula.date,
                'Tema da Aula': aula.theme,
                'Atividade Prática': aula.practice,
                'Total Cursistas': students.length,
                'Entregas Realizadas': entregues,
                'Pendências': pendentes,
                'Taxa de Entrega (%)': `${taxa}%`
            };
        });

        const sheetResumo = XLSX.utils.json_to_sheet(resumoAulas);
        XLSX.utils.book_append_sheet(workbook, sheetResumo, 'Resumo Aulas Práticas');

        // Aba 2: Matriz de Aulas Práticas por Aluno
        const submissionMapByUserAndClass = new Map<string, any>();
        submissions.forEach(s => {
            if (s.classId) {
                submissionMapByUserAndClass.set(`${s.userId}_${s.classId}`, s);
            }
        });

        const matrizAulas = students.map(student => {
            const row: Record<string, any> = {
                'Nome': student.name || 'Sem Nome',
                'E-mail': student.email || '-',
                'Cidade': student.city || '-',
                'Escola': student.school || '-'
            };

            let totalEntregas = 0;
            AULAS_CRONOGRAMA.forEach(aula => {
                const sub = submissionMapByUserAndClass.get(`${student.id}_${aula.id}`);
                if (sub) {
                    totalEntregas++;
                    row[aula.id] = `ENTREGUE (${new Date(sub.createdAt).toLocaleDateString('pt-BR')})`;
                } else {
                    row[aula.id] = 'PENDENTE';
                }
            });

            row['Total de Entregas'] = `${totalEntregas} de ${AULAS_CRONOGRAMA.length}`;
            row['Aproveitamento (%)'] = `${Math.round((totalEntregas / AULAS_CRONOGRAMA.length) * 100)}%`;

            return row;
        });

        const sheetMatrizAulas = XLSX.utils.json_to_sheet(matrizAulas);
        XLSX.utils.book_append_sheet(workbook, sheetMatrizAulas, 'Matriz Aulas Práticas');

        // Aba 3: Matriz de Trilhas de Aprendizagem e Provas
        const userProgressMap = new Map<string, Set<string>>();
        userProgress.forEach(p => {
            const key = `${p.userId}_${p.moduleId}`;
            if (!userProgressMap.has(key)) userProgressMap.set(key, new Set());
            userProgressMap.get(key)!.add(p.nodeId);
        });

        const quizMapByUserAndModule = new Map<string, any>();
        quizResults.forEach(q => {
            const key = `${q.userId}_${q.moduleId}`;
            if (!quizMapByUserAndModule.has(key)) quizMapByUserAndModule.set(key, q);
        });

        const matrizTrilhas = students.map(student => {
            const row: Record<string, any> = {
                'Nome': student.name || 'Sem Nome',
                'E-mail': student.email || '-',
                'Cidade': student.city || '-',
                'Escola': student.school || '-'
            };

            TRILHAS_MODULOS.forEach(trilha => {
                const key = `${student.id}_${trilha.id}`;
                const nodesCompleted = userProgressMap.get(key) || new Set();
                const count = nodesCompleted.size;
                const total = trilha.nodes.length;
                const quiz = quizMapByUserAndModule.get(key);

                row[`Etapa 0${trilha.numero} (Nós)`] = `${count}/${total} (${Math.round((count / total) * 100)}%)`;
                row[`Etapa 0${trilha.numero} (Prova)`] = quiz ? `${quiz.score}% - ${quiz.passed ? 'APROVADO' : 'REPROVADO'}` : 'Não Realizada';
            });

            return row;
        });

        const sheetMatrizTrilhas = XLSX.utils.json_to_sheet(matrizTrilhas);
        XLSX.utils.book_append_sheet(workbook, sheetMatrizTrilhas, 'Matriz Trilhas e Provas');

        const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
        return new NextResponse(buf, {
            headers: {
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
                'Content-Disposition': 'attachment; filename="matriz_geral_controle_resistencia.xlsx"'
            }
        });

    } catch (error) {
        console.error('Error exporting activities to Excel:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
