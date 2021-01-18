import { useEffect } from "react"
import { useWindowDimensions } from "react-native"

const useWindowResize = () => {
  const { height, width, scale } = useWindowDimensions()
  useEffect(() => {}, [height, width, scale])
}

export default useWindowResize
