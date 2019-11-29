import dynamic from 'next/dynamic'
import WithRepoBasic from '../components/with-repo-basic'
import api from '../lib/api'

// const MDRenderer = dynamic(() => import('../components/MarkdownRenderer'))
const MDRenderer = dynamic(() => import('../components/MarkdownRenderer'), {
  loading: () => <div>Loading</div>
})

function Detail({ readme }) {
  return <MDRenderer content={readme.content} isBase64={true} />
}

Detail.getInitialProps = async ({
  ctx: {
    query: { owner, name },
    req,
    res
  }
}) => {
  const readmeResp = await api.request(
    {
      url: `/repos/${owner}/${name}/readme`
    },
    req,
    res
  )

  return {
    readme: readmeResp.data
  }
}

export default WithRepoBasic(Detail, 'index')
