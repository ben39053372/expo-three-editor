import { useWindowDimensions } from "react-native"

const SCREEN_WIDTH = [0, 600, 960, 1280, 1920]

const BP_KEY = ["xs", "sm", "md", "lg", "xl"]

export const getBreakpoint = (width: number) =>
  BP_KEY[SCREEN_WIDTH.findIndex((value) => width < value)] ||
  BP_KEY[BP_KEY.length - 1]

export const useCurrBreakpoint = () => {
  const { width } = useWindowDimensions()
  return getBreakpoint(width)
}
