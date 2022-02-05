import React from 'react'
interface CommentType {
  _id: string
  name: string
  email: string
  comment: string
}
export default function Comment({ comment }: CommentType) {
  return (
    <div className="flex gap-x-4">
      <strong>{comment.name}</strong>
      <p>{comment.comment}</p>
    </div>
  )
}
