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
    Write-Output "Janela SSH encontrada! Iniciando deploy..."
    [Win]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    Add-Type -AssemblyName System.Windows.Forms
    
    # Ir para a pasta do projeto correta (usuario normal)
    [System.Windows.Forms.SendKeys]::SendWait("cd ~/projeto_resistencia{ENTER}")
    Start-Sleep -Seconds 1
    
    # Executar o git pull manualmente por garantia
    [System.Windows.Forms.SendKeys]::SendWait("git pull origin main{ENTER}")
    Start-Sleep -Seconds 3
    
    # Executar o script de deploy
    [System.Windows.Forms.SendKeys]::SendWait("chmod +x deploy.sh && ./deploy.sh{ENTER}")
    Start-Sleep -Seconds 1
    
    Write-Output "Comandos de deploy enviados com sucesso."
} else {
    Write-Output "ERRO: Janela do SSH nao encontrada. Deixe ela aberta na tela."
}
