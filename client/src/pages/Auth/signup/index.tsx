import { useState } from 'react'
import axios, { AxiosResponse } from 'axios'

interface ComponentProps {
  switchForm: boolean
  setSwitchForm: React.Dispatch<React.SetStateAction<boolean>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const Signup = ({
  switchForm,
  setSwitchForm,
  isLoading,
  setIsLoading,
}: ComponentProps) => {
  const [values, setValues] = useState({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const handleOnChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLTextAreaElement
    event.preventDefault()
    setValues({
      ...values,
      [name]: value,
    })
  }

  const signup = async () => {
    setIsLoading(true)
    try {
      const response: AxiosResponse = await axios.post(
        (import.meta.env.VITE_BASEURL as string) + 'auth/signup',
        {
          email: values.email,
          username: values.username,
          password: values.password,
          confirmPassword: values.confirmPassword,
        }
      )
      setIsLoading(false)

      setSwitchForm(!switchForm)
      console.log(response)
    } catch ({ response }) {
      const res: any = response
      console.log(res.data.message)
      setIsLoading(false)
    }
  }

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <h1>Sign Up</h1>
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
          id='username'
          type='text'
          name='username'
          placeholder='Username'
          value={values.username}
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
        <input
          id='confirmPassword'
          type='password'
          name='confirmPassword'
          placeholder='Confirm Password'
          value={values.confirmPassword}
          onChange={handleOnChange}
        />
      </form>
      <button
        onClick={(e) => {
          e.preventDefault()
          signup()
        }}
        type='submit'
      >
        Sign up
      </button>
    </div>
  )
}

export default Signup
