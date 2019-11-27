import Link from 'next/link'

export default () => {
  return (
    <>
      <Link href='/test_page2?id=1'>
        <span>跳转到page2</span>
      </Link>
    </>
  )
}
