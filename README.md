## 使用next+koa2实现React服务端渲染(开发中...)

### 启动方式:

```
npm run dev
```

[windows下载安装redis](https://github.com/microsoftarchive/redis/releases)



#### SSR页面渲染流程：

```

开始
↓
浏览器发起/page请求
↓
koa接收到请求，并调用nextjs
↓
nextjs开始渲染
↓
调用_app的getInitialProps
↓
调用页面的getInitialProps
↓
渲染出最终html
↓
返回给浏览器，渲染
↓
结束
```

#### 客户端路由跳转：

```
开始
↓
点击链接按钮
↓
异步加载页面的组件js
↓
调用页面的getInitialProps
↓
数据返回，路由变化
↓
渲染新页面
↓
结束
```
