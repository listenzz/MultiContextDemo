import { createMultiRootStateHook } from './MultiRootStateHookFactory'
import React from 'react'

const themes = {
  light: {
    foreground: '#000000',
    background: '#eeeeee',
  },
  dark: {
    foreground: '#ffffff',
    background: '#222222',
  },
}

export const useThemeState = createMultiRootStateHook(themes.light)

export const ThemeContext = React.createContext({ theme: themes.light, toggleTheme: () => {} })

export function withThemeContext(WrappedComponent: React.ComponentType<any>) {
  // 不要直接返回一个匿名函数，这很重要。这是为了适配 hot reload
  const FC = (props: any) => {
    const [theme, setTheme] = useThemeState()
    console.log('--', theme)

    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: () => {
            console.log('toggle', theme === themes.dark)
            setTheme(theme === themes.dark ? themes.light : themes.dark)
          },
        }}>
        <WrappedComponent {...props} />
      </ThemeContext.Provider>
    )
  }

  return FC
}
