import React, { useEffect, useState } from "react"

// Third-party dependencies
import { useParams } from "react-router-dom"

// Current project dependencies
import PostCard from "components/Cards/PostCard"
import { PostSkeleton } from "components/Skeletons/PostSkeleton"
import { IP } from "interface/post"
import getPostByIdService from "services/api/getPostByIdService"

export default function ViewPost() {
  const [post, setPost] = useState<IP>({} as IP)
  const [loading, setLoading] = useState(true)
  const { post_id } = useParams()

  const fetchPost = async () => {
    setLoading(true)

    const { data, success } = await getPostByIdService(post_id || "")

    if (success) {
      setPost(data)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPost()
  }, [])

  return (
    <>
      {loading && <PostSkeleton />}

      {
        !loading && (
          <PostCard
            id={post.id}
            title={post.title}
            content={post.content}
            shares={post.shares}
            comments={post.comments}
            likes={post.likes}
            postImages={post.postImages}
            author={post.author}
            createdAt={post.createdAt}
            updatedAt={post.updatedAt}
          />
        )
      }
    </>
  )
}
