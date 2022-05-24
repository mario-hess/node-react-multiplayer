import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isToggled: false,
}

const burgerMenuSlice = createSlice({
  name: 'burgerMenu',
  initialState,
  reducers: {
    toggled: (state) => {
      state.isToggled = !state.isToggled
    },
  },
})

export default burgerMenuSlice.reducer
export const { toggled } = burgerMenuSlice.actions
