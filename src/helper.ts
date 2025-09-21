const randomUUID = () => {
  return crypto.randomUUID().replace(/-/g, "")
}

export { randomUUID };