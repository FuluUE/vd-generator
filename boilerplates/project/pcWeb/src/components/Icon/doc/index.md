## `<Icon />`

SVG Icon 组件。

```javascript
import Icon, { logo } from '../Icon';

<Icon
  glyph={logo}
/>
```

或者：

```javascript
import logo from './images/logo.svg';
import Icon from '../Icon';

<Icon
  glyph={logo}
/>
```

### API

参数 | 说明 | 必须
---|---|---
glyph | svg 图标地址变量 | 必填
className | 类名 | 可选
width | 宽度 | 可选
height | 高度 | 可选
