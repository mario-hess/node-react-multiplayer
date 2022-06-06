import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import LoadingSpinner from '../../components/layout/loading-spinner'
import Signup from '../../components/auth/signup'
import Login from '../../components/auth/login'
import Game from '../../components/game'
import { RootState } from '../../store'

const Wrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
`

const Content = styled.div`
  display: flex;
  height: 100%;
  width: 60%;
  margin: auto;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

interface ComponentProps {
  isLoadingAuth: boolean
  setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>
  silentRefresh: () => void
}

const Auth: React.FunctionComponent<ComponentProps> = ({
  isLoadingAuth,
  setIsLoadingAuth,
  silentRefresh,
}: ComponentProps) => {
  const [switchForm, setSwitchForm] = useState(false)
  const user = useSelector((state: RootState) => state.user.data)

  useEffect(() => {
    console.log('Rendering Auth Page...')

    return () => {
      console.log('Cleaning up Auth...')
    }
  }, [])

  const switchView = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault()
    setSwitchForm(!switchForm)
  }

  const AuthForm: React.FunctionComponent = () => {
    return isLoadingAuth ? (
      <LoadingSpinner />
    ) : switchForm ? (
      <Wrapper>
        <Content>
          <Signup
            switchForm={switchForm}
            setSwitchForm={setSwitchForm}
            setIsLoadingAuth={setIsLoadingAuth}
          />
          <p onClick={switchView}>Have an account?</p>
        </Content>
      </Wrapper>
    ) : (
      <Wrapper>
        <Content>
          <Login
            silentRefresh={silentRefresh}
            setIsLoadingAuth={setIsLoadingAuth}
          />
          <p onClick={switchView}>No Account?</p>
        </Content>
      </Wrapper>
    )
  }

  return user === null ? (
    <AuthForm />
  ) : (
    <Game isLoadingAuth={isLoadingAuth} setIsLoadingAuth={setIsLoadingAuth} />
  )
}

export default Auth
