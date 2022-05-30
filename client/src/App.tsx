import { useEffect, useCallback } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import { useAppDispatch } from './store'
import { setUser } from './redux/userSlice'

import Navbar from './components/layout/navbar'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Error from './pages/Error'

import GlobalStyles from './styles/globalStyles'
import { defaultTheme } from './styles/theme'

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
  background-color: #293241;
`

const App: React.FunctionComponent = () => {
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
      }, response.data.expiresIn * 1000 - 10000)
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

  return (
    <ThemeProvider theme={defaultTheme}>
      <Wrapper>
        <GlobalStyles />
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
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
