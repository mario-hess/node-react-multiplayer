import { useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'

import LoadingSpinner from '../../components/layout/loading-spinner'
import Signup from './signup'
import Login from './login'

interface ComponentProps {
  silentRefresh: () => void
}

const Auth = ({ silentRefresh }: ComponentProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [switchForm, setSwitchForm] = useState(false)
  const userSlice = useSelector((state: any) => state.user)

  const switchView = (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault()
    setSwitchForm(!switchForm)
  }

  const AuthForm = () => {
    return isLoading ? (
      <LoadingSpinner />
    ) : switchForm ? (
      <>
        <Signup
          switchForm={switchForm}
          setSwitchForm={setSwitchForm}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <p onClick={switchView}>Have an account?</p>
      </>
    ) : (
      <>
        <Login
          silentRefresh={silentRefresh}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <p onClick={switchView}>No Account?</p>
      </>
    )
  }

  return userSlice?.user?.payload === undefined ? <AuthForm /> : <p>Game</p>
}

export default Auth
