import type { ExtensionContext } from 'vscode'
import { createBottomBar, createSelect, registerCommand, useTheme } from '@vscode-use/utils'

export function activate(context: ExtensionContext) {
  const { getAllTheme, getCurrentTheme, setTheme } = useTheme()
  const themes = getAllTheme()
  context.subscriptions.push(registerCommand('fast-switch-theme.pick', () => {
    const currentTheme = getCurrentTheme()

    createSelect(themes.map(item => item.label), {
      onDidSelectItem(v) {
        if (v) {
          const id = themes.find(theme => theme.label === v)!.id
          setTheme(id || v)
        }
      },
      ignoreFocusOut: true,
    }).then((v) => {
      if (!v) {
        setTheme(currentTheme)
      }
      else {
        const id = themes.find(theme => theme.label === v)!.id
        setTheme(id || v)
      }
    }, () => {
      setTheme(currentTheme)
    })
  }))
  const btn = createBottomBar({
    position: 'right',
    offset: 80,
    text: '$(color-mode)',
    command: 'fast-switch-theme.pick',
  })
  btn.show()
}

export function deactivate() {

}

// 调用函数获取当前主题
