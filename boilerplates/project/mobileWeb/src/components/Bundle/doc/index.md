## `<Bundle />`

基本用法：

```jsx
import Bundle from './components/Bundle';
import Async from './containers/Async';
...

...
<Route
  path="/async"
  render={ (props) => (
    <Bundle load={Async}>
      { (Asyncs) => <Asyncs {...props} /> }
    </Bundle>
    ) }
/>
...

/* 或 */

...
<Route
  path="/async"
  render={ (props) => (
    <Bundle load={Async}>
      { (Asyncs) => (
        Asyncs
        ? <Asyncs {...props} />
        : <Loading />
        ) }
    </Bundle>
    ) }
/>
...
```
