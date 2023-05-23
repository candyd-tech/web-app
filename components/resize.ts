export const resize = (url: string, width: string): string => {
  let split_url = url.split("/")
  split_url.splice(split_url.indexOf("upload") + 1, 0, width)

  return split_url.join("/")
}
