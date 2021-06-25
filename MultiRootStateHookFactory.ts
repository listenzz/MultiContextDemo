import { useEffect, useRef, useState } from 'react'

export function createMultiRootStateHook<S>(initialState: S) {
  const callbacks: Array<(state: S) => void> = []
  let data = initialState

  return () => {
    const [state, setState] = useState(data)
    const previous = useRef(state)
    previous.current = state

    useEffect(() => {
      const callback = (state: S) => {
        if (previous.current !== state) {
          setState(state)
        }
      }
      callbacks.push(callback)

      return () => {
        const index = callbacks.indexOf(callback)
        if (index !== -1) {
          callbacks.splice(index, 1)
        }
      }
    }, [])

    useEffect(() => {
      data = state
      callbacks.forEach(cb => cb(state))
    }, [state])

    return [state, setState] as const
  }
}
