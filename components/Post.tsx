import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { urlFor } from '../sanity'

export default function Post({ post }) {
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
          <div className="grid grid-cols-6 gap-x-2">
            <div className=" col-span-5 ">
              <h3 className="text-2xl font-semibold">{post.title}</h3>
            </div>
            <div className="col-span-1">
              <Image
                height={'50px'}
                width={'50px'}
                objectFit="cover"
                src={urlFor(post.author.image).url()!}
                className=" rounded-md"
                alt={post.author.name}
              />
            </div>
          </div>
          <p className=" text-lg">
            {post.description.length > 200
              ? post.description.slice(0, 200) + '...'
              : post.description}
          </p>
        </div>
      </div>
    </Link>
  )
}
