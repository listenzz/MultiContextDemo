import React, { useContext, useEffect, useRef, useState } from 'react'
import { View, Text, TextInput, Button, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'

function createMultiRootStateHook<S>(initialState: S) {
  const callbacks: Array<(state: S) => void> = []
  let data = initialState

  return () => {
    const [state, setState] = useState(data)
    const previous = useRef(state)
    previous.current = state

    useEffect(() => {
      const callback = (state: S) => {
        if (previous.current !== state) {
          setState(state)
        }
      }
      callbacks.push(callback)

      return () => {
        const index = callbacks.indexOf(callback)
        if (index !== -1) {
          callbacks.splice(index, 1)
        }
      }
    }, [])

    useEffect(() => {
      data = state
      callbacks.forEach(cb => cb(state))
    }, [state])

    return [state, setState] as const
  }
}

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

const ThemeContext = React.createContext({ theme: themes.light, toggleTheme: () => {} })

const useThemeState = createMultiRootStateHook(themes.light)

function withThemeContext(WrappedComponent: React.ComponentType<any>) {
  return (props: any) => {
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
}

function Welcome() {
  const { theme } = useContext(ThemeContext)
  return <Text style={styles.text}>Hello {theme.foreground}!</Text>
}

function App() {
  const [text, setText] = useState('')
  const { toggleTheme } = useContext(ThemeContext)
  console.log(`------------`)
  return (
    <View style={styles.container}>
      <Welcome />
      <TextInput value={text} onChangeText={setText} style={styles.input} />
      <Button title="确定" onPress={toggleTheme} />
    </View>
  )
}

export default withNavigationItem({
  titleItem: {
    title: 'ContextDemo',
  },
  rightBarButtonItem: {
    title: 'push',
    action: navigator => navigator.push('App'),
  },
})(withThemeContext(App))

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingTop: 16,
    paddingLeft: 32,
    paddingRight: 32,
  },
  text: {
    backgroundColor: 'transparent',
    fontSize: 17,
    textAlign: 'center',
    margin: 8,
  },
  input: {
    height: 40,
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 8,
    paddingRight: 8,
    borderColor: '#cccccc',
    borderWidth: 1,
  },
})
