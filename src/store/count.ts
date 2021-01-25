import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface CountState {
  value: number
}

const initialState: CountState = {
  value: 0
}

const countSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    add(state) {
      state.value++
    },
    sub(state) {
      state.value--
    },
    addByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload
    }
  }
})

export const { add, sub } = countSlice.actions

export default countSlice.reducer
