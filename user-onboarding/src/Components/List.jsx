import React from 'react'
import Card from './Card'

export default function List({ post }) {
  console.log("List -> post", post)
  return (
    <div>
      {post.map(p => {
        return <Card user={p} />
      })}
    </div>
  )
}
