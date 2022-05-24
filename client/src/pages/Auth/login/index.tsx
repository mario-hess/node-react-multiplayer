import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios, { AxiosResponse } from 'axios'
import { useAppDispatch } from '../../../store'
import { setUser } from '../../../redux/userSlice'

interface ComponentProps {
  silentRefresh: () => void
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ silentRefresh, isLoading, setIsLoading }: ComponentProps) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLTextAreaElement
    event.preventDefault()
    setValues({
      ...values,
      [name]: value,
    })
  }

  const login = async () => {
    setIsLoading(true)
    try {
      const response: AxiosResponse = await axios.post(
        (import.meta.env.VITE_BASEURL as string) + 'auth/login',
        {
          email: values.email,
          password: values.password,
        }
      )
      console.log('Login successful')

      dispatch(setUser(response.data.user))
      silentRefresh()
      navigate('/')
    } catch ({ response }) {
      const res: any = response
      console.log(res.data.message)
      setIsLoading(false)
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
          value={values.email}
          onChange={handleOnChange}
        />
        <input
          id='password'
          type='password'
          name='password'
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
