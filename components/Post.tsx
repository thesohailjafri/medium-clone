import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

export default function Post({ post }: any) {
  return (
    <Link href={`/posts/${post.slug.current}`}>
      <div className=" cursor-pointer overflow-hidden rounded-md bg-white shadow-md">
        {post.mainImage && (
          <Image
            className=""
            width={6}
            height={3}
            layout="responsive"
            objectFit="cover"
            src={urlFor(post.mainImage).url()!}
            alt={`${post.title!} image`}
          />
        )}
        <div className="grid gap-y-2 p-4">
          <h3 className="text-2xl font-semibold">{post.title}</h3>
          <div className=" text-sm text-gray-500">
            By <strong>{post.author && post.author.name}</strong> On{' '}
            <strong>{post.publishedAt.slice(0, 10)}</strong>
          </div>
          <p className=" text-lg">
            {post.description.length > 150
              ? post.description.slice(0, 150) + '...'
              : post.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
