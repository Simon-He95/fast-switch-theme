import type { ExtensionContext } from 'vscode'
import { createBottomBar, createSelect, registerCommand, useTheme } from '@vscode-use/utils'

export function activate(context: ExtensionContext) {
  const { getAllTheme, getCurrentTheme, setTheme } = useTheme()
  const themes = getAllTheme()
  context.subscriptions.push(registerCommand('fast-switch-theme.pick', () => {
    const currentTheme = getCurrentTheme()
    const options = themes.map(item => item.label)
    const i = options.indexOf(currentTheme)
    options.splice(i, 1)
    options.unshift(currentTheme)
    createSelect(options, {
      onDidSelectItem(v: string) {
        if (v) {
          const id = themes.find(theme => theme.label === v)!.id || v
          setTheme(id)
        }
      },
      ignoreFocusOut: true,
    }).then((v) => {
      if (!v) {
        setTheme(currentTheme)
      }
      else {
        const id = themes.find(theme => theme.label === v)!.id || v
        setTheme(id)
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
