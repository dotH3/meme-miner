import { DateTime } from "luxon"

const randomUUID = () => {
  return crypto.randomUUID().replace(/-/g, "")
}

const getDate = () => {
  return DateTime.now().toFormat("yyyy/MM/dd HH:mm:ss")
}

export { randomUUID, getDate };