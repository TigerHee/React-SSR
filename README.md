## 使用next+koa2实现React服务端渲染(开发中...)

### 启动方式:

```
npm run dev
```

[windows下载安装redis](https://github.com/microsoftarchive/redis/releases)



#### SSR页面渲染流程：

```flow
  1=>start: 开始
  2=>operation: 浏览器发起/page请求
  3=>operation: koa接收到请求，并调用nextjs
  4=>operation: nextjs开始渲染
  5=>operation: 调用app的getInitialProps
  6=>operation: 调用页面的getInitialProps
  7=>operation: 渲染出最终html
  8=>operation: 返回给浏览器，渲染
  9=>end: 结束
  1->2->3->4->5->6->7->8->9
```

#### 客户端路由跳转：

```flow
  1=>start: 开始
  2=>operation: 点击链接按钮
  3=>operation: 异步加载页面的组件js
  4=>operation: 调用页面的getInitialProps
  5=>operation: 数据返回，路由变化
  6=>operation: 渲染新页面
  7=>end: 结束
  1->2->3->4->5->6->7
```
