const nft__details_image_container = {
  borderRadius: "15px",
  overflow: "hidden",
  maxWidth: "500px",
  transition: "transform 0.3s ease-in-out",
  flexShrink: 0
}

const nft__details_image_zoom = {
  opacity: "1", // reduce opacity so you can verify position
  // border: "1px solid lightgray", // show the border of magnifier
  backgroundRepeat: "no-repeat",
  backgroundColor: "white",
  position: "absolute",
  // prevent magnifier blocks the mousemove event of img
  pointerEvents: "none",
  zIndex: 10,
  borderRadius: "15px"
}

const nftStyles = {
  nft__details_image_container,
  nft__details_image_zoom
}

export default nftStyles
