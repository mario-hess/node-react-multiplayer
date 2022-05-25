import { useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

import LoadingSpinner from '../../components/layout/loading-spinner'
import Signup from './signup'
import Login from './login'

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
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
  silentRefresh: () => void
}

const Auth: React.FunctionComponent<ComponentProps> = ({
  silentRefresh,
}: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [switchForm, setSwitchForm] = useState(false)
  const userSlice = useSelector((state: any) => state.user)

  const switchView = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault()
    setSwitchForm(!switchForm)
  }

  const AuthForm: React.FunctionComponent = () => {
    return isLoading ? (
      <LoadingSpinner />
    ) : switchForm ? (
      <Wrapper>
        <Content>
          <Signup
            switchForm={switchForm}
            setSwitchForm={setSwitchForm}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
          <p onClick={switchView}>Have an account?</p>
        </Content>
      </Wrapper>
    ) : (
      <Wrapper>
        <Content>
          <Login silentRefresh={silentRefresh} setIsLoading={setIsLoading} />
          <p onClick={switchView}>No Account?</p>
        </Content>
      </Wrapper>
    )
  }

  return userSlice?.user?.payload === undefined ? <AuthForm /> : <p>Game</p>
}

export default Auth
