// 每个子路由公用
import App from 'next/app'
import 'antd/dist/antd.css'
import { Provider } from 'react-redux'
import Router from 'next/router'
import withRedux from '../lib/with-redux'
import Layout from '../components/Layout'
import PageLoading from '../components/PageLoading'

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

  state = {
    loading: false
  }

  startLoading = () => {
    this.setState({
      loading: true
    })
  }

  stopLoading = () => {
    this.setState({
      loading: false
    })
  }

  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }
  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props
    const { loading } = this.state
    return (
      <Provider store={reduxStore}>
        {loading ? <PageLoading /> : null}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    )
  }
}

export default withRedux(MyApp)
