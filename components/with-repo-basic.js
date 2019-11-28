import { useEffect } from 'react'
import Repo from './Repo'
import Link from 'next/link'
import { withRouter } from 'next/router'
import api from '../lib/api'
import { get, cache } from '../lib/repo-basic-cache'

function makeQuery(queryObject) {
  const query = Object.entries(queryObject)
    .reduce((result, entry) => {
      result.push(entry.join('='))
      return result
    }, [])
    .join('&')
  return `?${query}`
}

const isServer = typeof window === 'undefined'

export default (Comp, type = 'index') => {
  function WithDetail({ repoBasic, router, ...rest }) {
    const query = makeQuery(router.query)

    useEffect(() => {
      if (!isServer) {
        cache(repoBasic)
      }
    })

    return (
      <div className='repo'>
        <div className='repo-basic'>
          <Repo repo={repoBasic} />
          {/* <div className='tabs'>
            {type === 'index' ? (
              <span className='tab'>Readme</span>
            ) : (
              <Link href={`/detail${query}`}>
                <a className='tab index'>Readme</a>
              </Link>
            )}
          </div> */}
        </div>
        <div>
          <Comp {...rest} />
        </div>
        <style jsx>{`
          .repo {
            padding-top: 20px;
          }
          .repo-basic {
            padding: 20px;
            border: 1px solid #eee;
            margin-bottom: 20px;
            border-radius: 5px;
          }
          .tab + .tab {
            margin-left: 20px;
          }
        `}</style>
      </div>
    )
  }

  WithDetail.getInitialProps = async context => {
    const { router, ctx } = context
    const { owner, name } = ctx.query
    const full_name = `${owner}/${name}`

    // 执行Comp的getInitialProps
    let pageData = {}
    if (Comp.getInitialProps) {
      pageData = await Comp.getInitialProps(context)
    }
    // 如果有缓存优先使用
    if (get(full_name)) {
      return {
        repoBasic: get(full_name),
        ...pageData
      }
    }

    const repoBasic = await api.request(
      {
        url: `/repos/${owner}/${name}`
      },
      ctx.req,
      ctx.res
    )

    return {
      repoBasic: repoBasic.data,
      ...pageData
    }
  }

  return withRouter(WithDetail)
}
