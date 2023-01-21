import React, { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Stack, Typography, Button } from "@mui/material"
import { RootState } from "../../app/store"
import PostInterface from "../../interface/post"
import getPostsByUsernameService from "../../services/api/getPostsByUsernameService"
import PostSkeleton from "../Skeletons/PostSkeleton"
import PostCard from "../Cards/PostCard"
import { HOME_ROUTE, USER_USERNAME_APP_ROUTE } from "../../constants/routes"
import getRecentPostsService from "../../services/api/getRecentPostsService"
import { useSelector } from "react-redux"

export default function PostsLst() {
  const state = useSelector((state: RootState) => state.user)
  const location = useLocation()
  const { the_username, postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PostInterface[]>([])
  const limit = 5
  const [offset, setOffset] = useState(0)

  useEffect(() => { fetchPosts() }, [])
  useEffect(() => { fetchPosts() }, [state.posts])
  useEffect(() => { fetchPosts() }, [the_username])

  const fetchPosts = async () => {
    setLoading(true)

    if (the_username === USER_USERNAME_APP_ROUTE) {
      const { data, statusCode, success } = await getPostsByUsernameService(state.user.username)

      if (success && statusCode === 200) {
        setPosts(data)
      }
    }

    if (the_username !== USER_USERNAME_APP_ROUTE && location.pathname !== HOME_ROUTE) {
      const { data, statusCode, success } = await getPostsByUsernameService(the_username || "")

      success && statusCode === 200 ? setPosts(data) : setPosts([])
    }

    if (!postId && !the_username && location.pathname === HOME_ROUTE) {
      const { data, statusCode, success } = await getRecentPostsService(offset, limit)

      success && statusCode === 200 ? setPosts([...data, ...posts]) : setPosts([])

      setOffset(offset + limit)
    }

    setLoading(false)
  }

  return (
    <>
      <Stack spacing={2}>
        {
          loading ? (
            <>
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
              <PostSkeleton />
            </>
          ) : posts.length !== 0 ? (
            <>
              {
                posts.map((post, index: number) => {
                  return (
                    <PostCard
                      key={`${index}_${post.id}`}
                      id={post.id}

                      title={post.title}
                      content={post.content}
                      postImages={post.postImages}

                      likes={post.likes}
                      comments={post.comments}
                      shares={post.shares}

                      author={post.author}

                      createdAt={post.createdAt}
                      updatedAt={post.updatedAt}
                    />
                  )
                })
              }
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                color="text.primary"
                align="center"
                mt={4}
                mb={8}
              >
                There are no posts yet, be the first to create one!
              </Typography>
            </>
          )
        }
      </Stack>
    </>
  )
}
