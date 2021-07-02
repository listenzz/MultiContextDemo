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

当使用最后这种方法时，HOC 请务必转发 `navigationItem`

如下所示

```tsx
export function withThemeContext(WrappedComponent: React.ComponentType<any>) {
  const FC = (props: any) => {
    return (
      <ThemeContext.Provider>
        <WrappedComponent {...props} />
      </ThemeContext.Provider>
    )
  }

  // 请务必传递 navigationItem
  FC.navigationItem = WrappedComponent.navigationItem

  return FC
}
```
