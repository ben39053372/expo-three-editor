import { StyleSheet } from "react-native"

const medium = 10

export const border = StyleSheet.create({
  radius: {
    borderRadius: medium
  },
  radiusTop: {
    borderTopStartRadius: medium,
    borderTopEndRadius: medium
  },
  radiusBottom: {
    borderBottomLeftRadius: medium,
    borderBottomRadius: medium
  },
  radiusLeft: {
    borderTopLeftRadius: medium,
    borderBottomLeftRadius: medium
  },
  radiusRight: {
    borderTopRightRadius: medium,
    borderBottomRightRadius: medium
  },
  shadow1: {
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.2,
    shadowRadius: 3
  },
  shadow2: {
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowOpacity: 0.3,
    shadowRadius: 4
  },
  shadow3: {
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6
    },
    shadowOpacity: 0.4,
    shadowRadius: 5
  }
})
