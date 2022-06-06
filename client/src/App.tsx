import { useState, useEffect, useCallback, createContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { ThemeProvider } from 'styled-components'
import styled from 'styled-components'

import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from './store'
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
  background-color: ${(props) => props.theme.colors.background};
`

const App: React.FunctionComponent = () => {
  const [isLoadingAuth, setIsLoadingAuth] = useState(true)
  const user = useSelector((state: RootState) => state.user.data)
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
      if (user === null) dispatch(setUser(response.data.user))
      if (isLoadingAuth) setIsLoadingAuth(false)
      setTimeout(() => {
        silentRefresh()
      }, response.data.expiresIn * 1000 - 10000)
    } catch (response: any) {
      if (response.status !== 201) {
        if (user) dispatch(setUser(null))
        setIsLoadingAuth(false)
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
              element={
                <Auth
                  isLoadingAuth={isLoadingAuth}
                  setIsLoadingAuth={setIsLoadingAuth}
                  silentRefresh={silentRefresh}
                />
              }
            />
            <Route path='*' element={<Error />} />
          </Routes>
        </BrowserRouter>
      </Wrapper>
    </ThemeProvider>
  )
}

export default App
