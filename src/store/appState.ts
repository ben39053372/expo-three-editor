import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface AppState {
  value: number
}

const initialState: AppState = {
  value: 0
}

const AppStateSlice = createSlice({
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

export const { add, sub } = AppStateSlice.actions

export default AppStateSlice.reducer
