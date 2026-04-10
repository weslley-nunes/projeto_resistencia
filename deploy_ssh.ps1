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
    Write-Output "Found SSH Window! Activating..."
    [Win]::SetForegroundWindow($hwnd)
    Start-Sleep -Seconds 1
    Add-Type -AssemblyName System.Windows.Forms
    [System.Windows.Forms.SendKeys]::SendWait("sudo su -{ENTER}")
    Start-Sleep -Seconds 1
    [System.Windows.Forms.SendKeys]::SendWait("cd /var/www/projeto_resistencia{ENTER}")
    Start-Sleep -Seconds 1
    [System.Windows.Forms.SendKeys]::SendWait("./deploy.sh{ENTER}")
    Write-Output "Commands sent successfully."
} else {
    Write-Output "SSH Window not found."
}
