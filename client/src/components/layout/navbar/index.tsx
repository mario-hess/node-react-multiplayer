import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../../store'
import { setUser } from '../../../redux/userSlice'

import './navbar.module.css'
import BurgerMenu from './burger-menu'

const Navbar = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userSlice = useSelector((state: any) => state.user)

  const list: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
  }
  const listLink: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    padding: '1.5em',
    textDecoration: 'none',
  }

  const logout = async (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault()
    try {
      await axios.get((import.meta.env.VITE_BASEURL as string) + 'auth/logout')
      dispatch(setUser(undefined))
      navigate('/auth')
    } catch ({ response }) {
      console.log(response)
    }
  }

  return (
    <>
      <BurgerMenu />
      <ul style={list}>
        <li>
          <Link style={listLink} to='/'>
            Home
          </Link>
        </li>
        {userSlice?.user?.payload === undefined ? (
          <li>
            <Link style={listLink} to='/auth'>
              Auth
            </Link>
          </li>
        ) : (
          <>
            <li>
              <Link style={listLink} to='/auth'>
                Game
              </Link>
            </li>
            <li>
              <p style={listLink} onClick={logout}>
                Logout
              </p>
            </li>
          </>
        )}
      </ul>
    </>
  )
}

export default Navbar
