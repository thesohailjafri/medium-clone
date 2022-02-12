import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Hero from '../components/Hero'
import Post from '../components/Post'
import { sanityClient, urlFor } from '../sanity'
import { TypePost } from '../types'
interface Props {
  posts: [TypePost]
}

export default function Home(props: Props) {
  let posts = props.posts
  return (
    <div className="min-h-screen">
      <Head>
        <title>Medium Clone</title>
        <link rel="icon" href="assets/images/favicon.png" />

        {/* <!-- Geo Positioning Meta Tags. --> */}
        <meta name="geo.region" content="IN-MH" />
        <meta name="geo.placename" content="Mumbai" />
        <meta name="geo.position" content="18;74" />
        <meta name="ICBM" content="18, 74" />
        {/* <!-- Search Eengine and Browser Meta Tags. --> */}
        <meta
          name="description"
          content="Medium clone build with Next.js, TailwindCSS, Sanity.io, and React Hook Form."
        />
        <meta name="abstract" content="A Medium clone build by Sohail Jafri" />
        <meta name="rating" content="General" />
        {/* <!-- Open Graph Meta Tags (ogp.me) --> */}
        <meta property="og:image" content="./assets/screenshots/d-home.png" />
        <meta property="og:site_name" content="Medium Clone" />
      </Head>
      <Hero />
      <div className="mycontainer">
        {/* POSTS */}
        <div className="my-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => {
            return <Post post={post} />
          })}
        </div>
      </div>
    </div>
  )
}

export const getServerSideProps = async () => {
  const qy = `*[_type=="post"]{
    _id,
    title,
    slug,
    mainImage,
    category,
    description,
    publishedAt,
    author -> {
    name,
  }
  }`
  const posts = await sanityClient.fetch(qy)
  return {
    props: {
      posts,
    },
  }
}
