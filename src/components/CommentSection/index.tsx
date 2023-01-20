import React, { useEffect } from "react"
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { CommentSectionInterface } from "../../interface/commet"
import CommentList from "../CommentList"

export default function CommentSection(props: CommentSectionInterface) {
  const { showComments = false, handleShowComments, postId = "", fetchCommentsUpdated, } = props

  useEffect(() => { fetchCommentsUpdated() }, [])

  return (
    <Accordion
      sx={{ mt: 2, boxShadow: "none", "&:before": { position: "initial", } }}
      expanded={showComments}
      TransitionProps={{ unmountOnExit: true }}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />} onClick={handleShowComments}>
        <Typography variant="body1" color="text.primary">
          {showComments ? "Hide comments" : "Show comments"}
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        <CommentList postId={postId} />
      </AccordionDetails>
    </Accordion>
  )
}
