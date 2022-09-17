export function debounce(callback: () => void, delay = 1000): () => void {
  let timerId: NodeJS.Timeout

  return () => {
    clearTimeout(timerId)
    timerId = setTimeout(callback, delay)
  }
}
