import { createBottomBar, createExtension, createSelect, registerCommand, useTheme } from '@vscode-use/utils'

export = createExtension(() => {
  const { getAllTheme, getCurrentTheme, setTheme } = useTheme()
  const themes = getAllTheme()

  const btn = createBottomBar({
    position: 'right',
    offset: 80,
    text: '$(color-mode)',
    command: 'fast-switch-theme.pick',
  })
  btn.show()
  return [
    registerCommand('fast-switch-theme.pick', () => {
      const currentTheme = getCurrentTheme()
      const options = themes.map(item => item.label)
      const i = options.indexOf(currentTheme)
      options.splice(i, 1)
      options.unshift(currentTheme)
      createSelect(options, {
        onDidChangeActive(v: any) {
          if (v) {
            const id = themes.find(theme => theme.label === v[0].label)!.id || v[0].label
            setTheme(id)
          }
        },
        ignoreFocusOut: true,
      }).then((v: any) => {
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
    }),
  ]
})
