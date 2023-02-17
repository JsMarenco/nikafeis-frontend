import React, { useEffect, useRef, useState } from "react"

// Third-party dependencies
import { Box } from "@mui/material"

// Current project dependencies
import { IP } from "interface/post"
import PostSkeletonList, { PostSkeleton } from "components/Skeletons/PostSkeleton"
import PostCard from "components/Cards/PostCard"
import NoContent from "components/NoContent"
// eslint-disable-next-line @typescript-eslint/no-var-requires
const BgImage = require("../../assets/bg-3.png")

interface IPL {
  posts: IP[],
  loading: true | false,
  onIntersection: () => void,
  offset: number,
}

export default function PostList(props: IPL) {
  const { loading, posts, onIntersection, offset } = props
  const observer = useRef<IntersectionObserver | null>(null)
  const [endReached, setEndReached] = useState(false)
  const lastItemRef = useRef(null)

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const lastItem = entries[0]

      if (lastItem.isIntersecting) {
        if (posts.length !== 0) {
          onIntersection()
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
  }, [posts, onIntersection])

  useEffect(() => {
    if (posts.length < offset) {
      setEndReached(true)
    }
  }, [posts, offset])

  return (
    <>
      {loading && <PostSkeletonList />}

      {
        !loading && posts.map((post, index: number) => (
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
        ))
      }

      {
        endReached && (
          <NoContent
            imgSrc={BgImage}
            text="There is not more post"
          />
        )
      }

      {!loading && posts.length >= offset && !endReached && (
        <Box ref={lastItemRef}>
          <PostSkeleton />
        </Box>
      )}
    </>
  )
}
