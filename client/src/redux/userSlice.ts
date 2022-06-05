import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type User = {
  _id: string
  email: string
  username: string
  register_date: string
  __v: number
}

const initialState: any = {
  data: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.data = action.payload
    },
  },
})

export default userSlice.reducer
export const { setUser } = userSlice.actions
