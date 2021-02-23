import { useEffect, useState } from "react"

const UPDATE_TIMING = 500

/**
 * A black magic to help UI component get updated ref data
 */
const useUpdate = () => {
  const [, setUpdate] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setUpdate((prev) => !prev)
    }, UPDATE_TIMING)
  })
}
export default useUpdate
