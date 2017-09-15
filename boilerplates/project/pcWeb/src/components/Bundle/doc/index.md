## `<Bundle></Bundle>`

基本用法：

```jsx
import loadSomething from 'bundle-loader?lazy!./Something';

<Bundle load={loadSomething}>
  {(mod) => (
    // do something w/ the module
  )}
</Bundle>

// 或
<Bundle load={loadSomething}>
  {(Comp) => (
    Comp
    ? <Comp />
    : <Loading />
  )}
</Bundle>
```

也可以使用动态导入方法： `import()`。

```jsx
<Bundle load={() => import('./Something')}>
  {(mod) => (
    // do something w/ the module
  )}
</Bundle>
```
