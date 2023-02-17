import React, { useEffect, useState } from "react"

// Third-party dependencies
import { useLocation, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

// Current project dependencies
import { IP } from "interface/post"
import getPostsByUsernameService from "services/api/getPostsByUsernameService"
import PostList from "components/PostList"
import { RootState } from "app/store"
import AppRoutes from "constants/app/routes"

export default function UserPosts() {
  const state = useSelector((state: RootState) => state.user)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<IP[]>([])
  const limit = 5
  const [offset, setOffset] = useState(0)
  const location = useLocation()
  const { the_username } = useParams()

  const fetchPosts = async () => {
    setLoading(true)

    const username = the_username === AppRoutes.userUsernameApp ? state.user.username : the_username || ""

    const { data, success } = await getPostsByUsernameService(username)

    if (success) {
      setPosts(currentPosts => [...currentPosts, ...data])
      setOffset(offset + limit)
    } else {
      setPosts([])
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchPosts()
  }, [location, state.posts])

  return (
    <PostList
      posts={posts}
      loading={loading}
      onIntersection={fetchPosts}
      offset={offset}
    />
  )
}
