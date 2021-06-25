import React, { useContext } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { withNavigationItem } from 'hybrid-navigation'
import { ThemeContext, withThemeContext } from './ThemeContext'

function Welcome() {
  const { theme } = useContext(ThemeContext)
  return <Text style={styles.text}>Hello {theme.foreground}!</Text>
}

function App() {
  const { toggleTheme } = useContext(ThemeContext)
  console.log(`--------------`)
  return (
    <View style={styles.container}>
      <Welcome />
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
