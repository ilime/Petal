export const isDarwin = process.platform === 'darwin'
export const isWin = process.platform === 'win32'
export const isLinux = process.platform === 'linux'
export const isPlasma = process.platform === 'linux' && process.env.XDG_CURRENT_DESKTOP === 'KDE'
