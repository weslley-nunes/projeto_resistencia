Add-Type @"
using System;
using System.Runtime.InteropServices;
using System.Text;

public class Win {
    [DllImport("user32.dll")]
    public static extern bool EnumWindows(EnumWindowsProc enumProc, IntPtr lParam);
    
    public delegate bool EnumWindowsProc(IntPtr hWnd, IntPtr lParam);
    
    [DllImport("user32.dll", CharSet = CharSet.Auto)]
    public static extern int GetWindowText(IntPtr hWnd, StringBuilder strText, int maxCount);
    
    [DllImport("user32.dll")]
    public static extern bool IsWindowVisible(IntPtr hWnd);

    [DllImport("user32.dll")]
    public static extern bool SetForegroundWindow(IntPtr hWnd);

    public static IntPtr FindWindowByTitleSubstring(string substring) {
        IntPtr found = IntPtr.Zero;
        EnumWindows(delegate(IntPtr hWnd, IntPtr lParam) {
            if (IsWindowVisible(hWnd)) {
                StringBuilder sb = new StringBuilder(256);
                GetWindowText(hWnd, sb, 256);
                if (sb.ToString().Contains(substring)) {
                    found = hWnd;
                    return false;
                }
            }
            return true;
        }, IntPtr.Zero);
        return found;
    }
}
"@

$hwnd = [Win]::FindWindowByTitleSubstring("ssh.cloud.google.com")
if ($hwnd -ne [IntPtr]::Zero) {
    Write-Output "Janela SSH encontrada! Ativando..."
    [Win]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    Add-Type -AssemblyName System.Windows.Forms
    
    # Entrar como root
    [System.Windows.Forms.SendKeys]::SendWait("sudo su -{ENTER}")
    Start-Sleep -Seconds 1
    
    # Ir para a pasta do projeto
    [System.Windows.Forms.SendKeys]::SendWait("cd /var/www/projeto_resistencia{ENTER}")
    Start-Sleep -Seconds 1
    
    # Criar um arquivo zip/tar com as pastas prisma e uploads
    [System.Windows.Forms.SendKeys]::SendWait("tar -czvf /tmp/backup_prod.tar.gz prisma/dev.db public/uploads{ENTER}")
    Start-Sleep -Seconds 3
    
    # Mover para a pasta do usuário matematica_gurupi
    [System.Windows.Forms.SendKeys]::SendWait("cp /tmp/backup_prod.tar.gz /home/matematica_gurupi/{ENTER}")
    Start-Sleep -Seconds 1
    
    # Dar permissão ao usuário
    [System.Windows.Forms.SendKeys]::SendWait("chown matematica_gurupi:matematica_gurupi /home/matematica_gurupi/backup_prod.tar.gz{ENTER}")
    Start-Sleep -Seconds 1
    
    # Sair do root para voltar ao usuário normal
    [System.Windows.Forms.SendKeys]::SendWait("exit{ENTER}")
    Start-Sleep -Seconds 1
    
    Write-Output "Comandos enviados com sucesso."
} else {
    Write-Output "Janela do SSH não encontrada."
}
