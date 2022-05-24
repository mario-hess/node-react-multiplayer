import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import userReducer from './redux/userSlice'
import burgerMenuReducer from './components/layout/navbar/burger-menu/slice'

const store = configureStore({
  reducer: {
    user: userReducer,
    burgerMenu: burgerMenuReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store
