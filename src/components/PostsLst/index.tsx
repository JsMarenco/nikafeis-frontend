import React, { useEffect, useState, useRef } from "react"
import { useLocation, useParams } from "react-router-dom"
import { Stack, } from "@mui/material"
import { RootState } from "../../app/store"
import PostInterface from "../../interface/post"
import getPostsByUsernameService from "../../services/api/getPostsByUsernameService"
import PostCard from "../Cards/PostCard"
import { HOME_ROUTE, USER_USERNAME_APP_ROUTE } from "../../constants/routes"
import getRecentPostsService from "../../services/api/getRecentPostsService"
import { useSelector } from "react-redux"
import NoContent from "../NoContent"
import PostSkeletonList from "../Skeletons/PostSkeleton"
import LoadMore from "../LoadMore"
import { NO_MORE_POSTS } from "../../constants/messages"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BgImage = require("../../assets/bg-3.png")

export default function PostsLst() {
  const state = useSelector((state: RootState) => state.user)
  const location = useLocation()
  const { the_username, postId } = useParams()
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<PostInterface[]>([])
  const limit = 5
  const [offset, setOffset] = useState(0)
  const observer = useRef<IntersectionObserver | null>(null)
  const lastItemRef = useRef(null)

  useEffect(() => { fetchPosts() }, [])
  useEffect(() => { fetchPosts() }, [state.posts, the_username])

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

      success && statusCode === 200 ? setPosts([...posts, ...data]) : setPosts([])

      if (posts.length === offset) {
        setOffset(offset + limit)
      }
    }

    setLoading(false)
  }

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastItem = entries[0]
      if (lastItem.isIntersecting) {
        if (posts.length !== 0) {
          fetchPosts()
        }
      }
    })

    if (lastItemRef.current) {
      observer.current.observe(lastItemRef.current)
    }
    return () => {
      if (observer.current) {
        observer.current.disconnect()
      }
    }
  }, [posts])

  return (
    <>
      <Stack spacing={2}>
        {loading && <PostSkeletonList />}

        {
          !loading && posts.map((post, index: number) => (
            <>
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
            </>
          ))
        }

        {
          !loading && posts.length !== 0 && posts.length === offset ? (
            <div ref={lastItemRef}><LoadMore /></div>
          ) : (
            <NoContent imgSrc={BgImage} text={NO_MORE_POSTS} />
          )
        }

        {
          !loading && posts.length === 0 && (
            <NoContent imgSrc={BgImage} text="There are no posts yet, be the first to create one!" />
          )
        }
      </Stack>
    </>
  )
}
