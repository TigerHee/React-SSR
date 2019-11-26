// 每个子路由公用
import App from 'next/app'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import withRedux from '../lib/with-redux'
import Layout from '../components/Layout'
// import store from '../store/store'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    // 执行子页面的getInitialProps
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    return (
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default withRedux(MyApp)
