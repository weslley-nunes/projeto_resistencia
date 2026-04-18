const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(process.cwd(), 'prisma', 'dev.db');
const BACKUP_DIR = path.join(process.cwd(), 'prisma', 'backups');
const BACKUP_INTERVAL_MS = 24 * 60 * 60 * 1000; // 24 hours
const CHECK_INTERVAL_MS = 60 * 60 * 1000; // 1 hour

function performBackup() {
    console.log('[Backup Robot] Verificando integridade da base de dados...');
    
    if (!fs.existsSync(DB_PATH)) {
        console.log('[Backup Robot] dev.db não encontrado. Pulando backup.');
        return;
    }

    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    // List existing backups
    const files = fs.readdirSync(BACKUP_DIR)
        .filter(f => f.endsWith('.db') || f.endsWith('.sqlite'))
        .map(f => ({ name: f, time: fs.statSync(path.join(BACKUP_DIR, f)).mtime.getTime() }))
        .sort((a, b) => b.time - a.time); // Newest first

    const now = Date.now();

    // Check if we already backed up in the last 24h
    if (files.length > 0) {
        const newest = files[0];
        const age = now - newest.time;
        if (age < BACKUP_INTERVAL_MS) {
            console.log(`[Backup Robot] Último backup foi há ${(age / 1000 / 60 / 60).toFixed(1)} horas. Nenhuma cópia necessária agora.`);
            return;
        }
    }

    // Time to backup!
    const dateStr = new Date().toISOString().replace(/[:.]/g, '-');
    const backupTarget = path.join(BACKUP_DIR, `dev_backup_${dateStr}.db`);
    
    try {
        fs.copyFileSync(DB_PATH, backupTarget);
        console.log(`[Backup Robot] SUcesso! Cópia de segurança criada em: ${backupTarget}`);
        files.unshift({ name: path.basename(backupTarget), time: Date.now() });

        // Rolling constraint: keep only last 7
        if (files.length > 7) {
            const toDelete = files.slice(7);
            for (const file of toDelete) {
                fs.unlinkSync(path.join(BACKUP_DIR, file.name));
                console.log(`[Backup Robot] Apagando backup antigo para economizar espaço: ${file.name}`);
            }
        }
    } catch(e) {
        console.error('[Backup Robot] Erro ao criar cópia de segurança:', e.message);
    }
}

// Run immediately on boot
performBackup();

// Then run check every hour
setInterval(performBackup, CHECK_INTERVAL_MS);
