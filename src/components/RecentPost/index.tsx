import React, { useEffect, useState } from "react"

// Third-party dependencies
import { useLocation } from "react-router-dom"

// Current project dependencies
import { IP } from "interface/post"
import getRecentPostsService from "services/api/getRecentPostsService"
import PostList from "components/PostList"

export default function RecentPost() {
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<IP[]>([])
  const limit = 5
  const [offset, setOffset] = useState(0)
  const location = useLocation()

  const fetchPosts = async () => {
    setLoading(true)

    const { data, success } = await getRecentPostsService(offset, limit)

    if (success) {
      setPosts(currentPosts => [...currentPosts, ...data]) // Concatenate new data to the previous data
      setOffset(offset + limit) // Increment the offset
    } else {
      setPosts([])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [location])

  return (
    <PostList
      posts={posts}
      loading={loading}
      onIntersection={fetchPosts}
      offset={offset}
    />
  )
}
