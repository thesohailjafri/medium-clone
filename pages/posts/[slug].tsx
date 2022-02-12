import format from 'date-fns/format'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import React from 'react'
import PortableText from 'react-portable-text'
import { sanityClient, urlFor } from '../../sanity'
import { TypePost } from '../../types'
import { useForm, SubmitHandler } from 'react-hook-form'
interface Props {
  post: TypePost
}

interface FormInputs {
  _id: string
  name: string
  email: string
  comment: string
}

export default function PostPage({ post }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>()
  const [submitted, setSubmitted] = React.useState(false)

  console.log(post)

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(() => {
        setSubmitted(true)
      })
      .catch(() => {
        alert('Something went wrong')
      })
  }

  // React.useEffect(() => {
  //   console.log(errors)
  // }, [errors])

  return (
    <article className=" mycontainer flex flex-col gap-y-4 border-r border-l border-black bg-white py-6 shadow-md">
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
        className="portabletext"
        content={post.body}
        dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
        projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
        serializers={{
          h1: (props: any) => (
            <h1 className=" my-5 text-4xl font-bold" {...props} />
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
      <hr className=" my-4 border border-black" />
      {submitted ? (
        <div className=" rounded-md bg-yellow-500 p-4 shadow-md">
          <h2 className=" mb-2 text-3xl font-bold">
            Thank you for your comment!
          </h2>
          <p className=" font-semibold">
            Your comment will appear in comments section once it gets approved
            by out moderators.
          </p>
        </div>
      ) : (
        <div id="comment">
          <p className="text-4xl font-bold">Leave a comment </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col gap-y-2"
          >
            <input
              {...register('_id')}
              type="hidden"
              name="_id"
              value={post._id}
            />
            <div>
              <label htmlFor="name" className="font-semibold">
                Name
              </label>
              <input
                {...register('name', { required: true })}
                type="text"
                id="name"
                placeholder="Your name"
                className="mb-2 mt-1 w-full rounded-md border p-2 focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="font-semibold">
                Email
              </label>
              <input
                {...register('email', { required: true })}
                type="email"
                id="email"
                placeholder="Your email"
                className="mb-2 mt-1 w-full rounded-md border p-2 focus:border-yellow-500"
              />
            </div>
            <div>
              <label htmlFor="comment" className="font-semibold">
                Comment
              </label>
              <textarea
                {...register('comment', { required: true })}
                id="comment"
                rows={4}
                placeholder="Your comment"
                className="mb-2 mt-1 w-full rounded-md border p-2 focus:border-yellow-500"
              />
            </div>
            <button
              type="submit"
              className="mb-2 mt-1 w-full rounded-md   bg-black p-2 text-white transition-colors duration-100 ease-in hover:text-yellow-500"
            >
              Submit
            </button>
          </form>
          {submitted && <p>{submitted}</p>}
          {/* errors */}
          <ul>
            {errors.name && <li>- Name is required</li>}
            {errors.email && <li>- Email is required</li>}
            {errors.comment && <li>- Comment is required</li>}
          </ul>
        </div>
      )}
      <div id="comments">
        <p className="mb-4 text-3xl font-bold">Comments</p>
        {post?.comments?.map((comment: any) => (
          <div className="flex gap-x-4">
            <strong>{comment.name}</strong>
            <p>{comment.comment}</p>
          </div>
        ))}
      </div>
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
  const qy = `*[_type=="post" && slug.current == '${params?.slug}'][0]{
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
    'comments':*[
      _type=="comment" &&
      post._ref == ^._id &&
      approved == true],
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
