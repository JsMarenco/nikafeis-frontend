import saveAs from "file-saver"
import { v4 as uuid } from "uuid"

export const firstLetterUppercase = (string: string) => {
  return deleteSpaces(string.charAt(0).toUpperCase() + string.slice(1))
}

const deleteSpaces = (string: string) => {
  string = string.trim()

  return string.replace(/\s/g, "")
}

export const convertDate = (date: string) => {
  const dateObject = new Date(date)
  const now = new Date()

  const diff = now.getTime() - dateObject.getTime()

  const seconds = Math.floor(diff / 1000)
  const minutes = Math.floor(diff / 1000 / 60)
  const hours = Math.floor(diff / 1000 / 60 / 60)
  const days = Math.floor(diff / 1000 / 60 / 60 / 24)
  const months = Math.floor(diff / 1000 / 60 / 60 / 24 / 30)
  const years = Math.floor(diff / 1000 / 60 / 60 / 24 / 30 / 12)

  if (seconds < 60) {
    return `${seconds} seconds ago`
  } else if (minutes < 60) {
    return `${minutes} minutes ago`
  } else if (hours < 24) {
    return `${hours} hours ago`
  } else if (days < 30) {
    return `${days} days ago`
  } else if (months < 12) {
    return `${months} months ago`
  } else {
    return `${years} years ago`
  }
}

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window

  return {
    width,
    height,
  }
}

export const deleteSpacesAndReplaceWithUnderscore = (string: string) => {
  string = deleteSpaces(string)

  return string.replace(/\s/g, "-")
}

export const saveInLocalStorage = (key: string, obj: unknown) => {
  localStorage.setItem(key, JSON.stringify(obj))
}

export const getFromLocalStorage = (key: string) => {
  const item = localStorage.getItem(key)

  if (item) {
    return JSON.parse(item)
  }

  return null
}

export const changeTitle = (title: string) => {
  document.title = title
}

export const copyToClipboard = (text: string) => {
  const textArea = document.createElement("textarea")

  textArea.style.position = "fixed"
  textArea.style.top = "0"
  textArea.style.left = "0"
  textArea.style.width = "2em"
  textArea.style.height = "2em"
  textArea.style.padding = "0"
  textArea.style.border = "none"
  textArea.style.outline = "none"
  textArea.style.boxShadow = "none"
  textArea.style.background = "transparent"
  textArea.value = text

  document.body.appendChild(textArea)

  textArea.select()

  try {
    document.execCommand("copy")
    document.body.removeChild(textArea)
    return true
  }
  catch (err) {
    console.log("🚀 ~ file: index.ts:104 ~ copyToClipboard ~ err", err)
    document.body.removeChild(textArea)
    return false
  }
}

export const generateShareLink = (url: string) => {
  return `${window.location.origin}${url}`
}

export const downloadAndSaveImage = async (imageUrl: string) => {
  saveAs(imageUrl, uuid())
}
