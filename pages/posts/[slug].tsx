import format from 'date-fns/format'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import PortableText from 'react-portable-text'
import { sanityClient, urlFor } from '../../sanity'
import { TypePost } from '../../types'
interface Props {
  post: TypePost
}

export default function PostPage({ post }: Props) {
  return (
    <article className=" mycontainer flex flex-col gap-y-4 pt-6">
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <h6 className="text-gray-500">{post.description}</h6>
      <div className="flex items-center justify-start gap-x-2 font-semibold text-gray-700">
        <div className=" w-14">
          <Image
            src={urlFor(post.author.image).url()!}
            alt={`${post.author.name} image`}
            height={'150px'}
            width={'150px'}
            layout="responsive"
            objectFit="cover"
            className="h-10 rounded-full"
          />
        </div>
        <div>
          <p>Blog posted by {post.author.name}</p>
          <p>Published on {format(new Date(post.publishedAt), 'PPP')}</p>
        </div>
      </div>
      <div className="my-2 w-full overflow-hidden rounded-md bg-cover shadow-md">
        <Image
          src={urlFor(post.mainImage).url()!}
          height={3}
          width={5}
          layout="responsive"
          objectFit="cover"
        />
      </div>
      <PortableText
        content={post.body}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
        serializers={{
          h1: (props: any) => (
            <h1 className="my-5 text-4xl font-bold" {...props} />
          ),
          h2: (props: any) => (
            <h2 className="my-5 text-3xl font-bold" {...props} />
          ),
          h3: (props: any) => (
            <h3 className="my-5 text-2xl font-bold" {...props} />
          ),
          h4: (props: any) => (
            <h4 className="my-5 text-xl font-bold" {...props} />
          ),
          li: ({ children }: any) => (
            <li className=" ml-4 list-disc">{children}</li>
          ),
          link: ({ href, children }: any) => (
            <a className="text-blue-500 hover:underline" href={href}>
              {children}
            </a>
          ),
        }}
      />
    </article>
  )
}

export const getStaticPaths = async () => {
  const qy = `*[_type=="post"]{
    _id,
    slug{
      current
    },
  }`

  const posts = await sanityClient.fetch(qy)

  const paths = posts.map((post: TypePost) => ({
    params: {
      slug: post.slug.current,
    },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const qy = `*[_type=="post" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    mainImage,
    description,
    publishedAt,
    author -> {
      name,
      image
    },
    'categories':*[_type=="category" && post->_ref == ^._id],
    'commets':*[_type=="comment" && post->_ref == ^._id && approved == true],
    body
  }`

  const post = await sanityClient.fetch(qy, {
    slug: params?.slug,
  })

  if (!post) {
    return {
      notFound: true,
    }
  }
  return {
    props: {
      post: post,
    },
  }
}
