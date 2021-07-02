# ContextDemo

演示在 hybrid-navigation 环境下，如何使用 React.Context

注意事项，HOC 注入点一共有三处

- 全局注入，对所有页面生效

  ```ts
  ReactRegistry.startRegisterComponent(withContext)
  ```

- 部分页面共享

  ```ts
  export default withNavigationItem({
    titleItem: {
      title: 'ContextDemo',
    },
    rightBarButtonItem: {
      title: 'push',
      action: navigator => navigator.push('App'),
    },
  })(withThemeContext(App))
  ```

  **或者**

  ```ts
  ReactRegistry.registerComponent('App', () => withThemeContext(App))
  ```
