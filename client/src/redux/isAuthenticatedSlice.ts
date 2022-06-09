import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: any = {
  data: false,
}

const isAuthenticatedSlice = createSlice({
  name: 'isAuthenticated',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.data = action.payload
    },
  },
})

export default isAuthenticatedSlice.reducer
export const { setIsAuthenticated } = isAuthenticatedSlice.actions
