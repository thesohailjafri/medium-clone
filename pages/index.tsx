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
    description,
    author -> {
    name,
    image
  }
  }`
  const posts = await sanityClient.fetch(qy)
  return {
    props: {
      posts,
    },
  }
}
