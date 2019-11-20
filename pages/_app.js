// 每个子路由公用
import App from 'next/app'
import 'antd/dist/antd.css'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    // 执行子页面的getInitialProps
    let pageProps
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default MyApp
