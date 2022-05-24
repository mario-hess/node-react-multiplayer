import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: undefined,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, payload: any) => {
      state.user = payload
    },
  },
})

export default userSlice.reducer
export const { setUser } = userSlice.actions
