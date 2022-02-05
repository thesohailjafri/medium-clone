export default {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'approved',
      title: 'Approved',
      type: 'boolean',
      description: 'Whether the comment has been approved or not.',
      required: true,
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      required: true,
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      required: true,
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'text',
      required: true,
    },
    {
      name: 'post',
      type: 'reference',
      to: [{ type: 'post' }],
    },
  ],
}
