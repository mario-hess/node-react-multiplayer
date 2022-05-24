import { useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { useAppDispatch } from './store'
import { setUser } from './redux/userSlice'

import Navbar from './components/layout/navbar'

import Home from './pages/Home'
import Auth from './pages/Auth'
import Error from './pages/Error'

const App = () => {
  const dispatch = useAppDispatch()

  const silentRefresh = useCallback(async () => {
    try {
      const response: AxiosResponse = await axios.get(
        (import.meta.env.VITE_BASEURL as string) + 'auth/refresh-token'
      )
      axios.defaults.headers.common[
        'Authorization'
      ] = `Bearer ${response.data.token}`
      console.log('Refreshed JWT')
      dispatch(setUser(response.data.user))

      setTimeout(() => {
        silentRefresh()
      }, response.data.expiresIn * 1000 - 1000)
    } catch (response: any) {
      if (response.status !== 201) {
        dispatch(setUser(undefined))
        console.log('Not Authorized')
      }
    }
  }, [dispatch])

  useEffect(() => {
    silentRefresh()
  }, [silentRefresh])

  const style: React.CSSProperties = {
    margin: 0,
    padding: 0,
    width: '100vw',
    minHeight: '100vh',
  }

  return (
    <div style={style}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/auth'
            element={<Auth silentRefresh={silentRefresh} />}
          />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
