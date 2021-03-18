import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type ViewMode = "POV" | "3D" | "2D"

export interface AppState {
  value: number
  viewMode: ViewMode
}

const initialState: AppState = {
  value: 0,
  viewMode: "3D"
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
    },
    changeMode(state, action: PayloadAction<ViewMode>) {
      state.viewMode = action.payload
    }
  }
})

export const { add, sub } = AppStateSlice.actions

export default AppStateSlice.reducer
