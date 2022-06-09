import { useState } from 'react'
import axios from 'axios'

interface ComponentProps {
  silentRefresh: () => void
  setIsLoadingAuth: React.Dispatch<React.SetStateAction<boolean>>
}

const Login: React.FunctionComponent<ComponentProps> = ({
  silentRefresh,
  setIsLoadingAuth,
}: ComponentProps) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLTextAreaElement
    event.preventDefault()
    setValues({
      ...values,
      [name]: value,
    })
  }

  const login = async () => {
    setIsLoadingAuth(true)
    try {
      await axios.post(
        (import.meta.env.VITE_BASEURL as string) + 'auth/login',
        {
          email: values.email,
          password: values.password,
        }
      )
      console.log('Login successful')
      silentRefresh()
    } catch (response: any) {
      if (response.status !== 201) {
        console.log(response.message)
        setIsLoadingAuth(false)
      }
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form>
        <input
          id='email'
          type='email'
          name='email'
          placeholder='Email'
          value={values.email}
          onChange={handleOnChange}
        />
        <input
          id='password'
          type='password'
          name='password'
          placeholder='Password'
          value={values.password}
          onChange={handleOnChange}
        />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault()
          login()
        }}
        type='submit'
      >
        Login
      </button>
    </div>
  )
}

export default Login
