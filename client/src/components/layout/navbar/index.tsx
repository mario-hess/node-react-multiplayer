import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch } from '../../../store'
import { setUser } from '../../../redux/userSlice'

import BurgerMenu from './burger-menu'

const List = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
`

const ListLink = styled(Link)`
  display: block;
  margin: 0;
  padding: 0;
  color: black;
  text-align: center;
  padding: 1.5em;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: pink;
  }
`

const Logout = styled.p`
  display: block;
  margin: 0;
  padding: 0;
  color: black;
  text-align: center;
  padding: 1.5em;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: pink;
  }
`

const Navbar: React.FunctionComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const userSlice = useSelector((state: any) => state.user)

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
      <List>
        <li>
          <ListLink to='/'>Home</ListLink>
        </li>
        {userSlice?.user?.payload === undefined ? (
          <li>
            <ListLink to='/auth'>Auth</ListLink>
          </li>
        ) : (
          <>
            <li>
              <ListLink to='/auth'>Game</ListLink>
            </li>
            <li>
              <Logout onClick={logout}>Logout</Logout>
            </li>
          </>
        )}
      </List>
    </>
  )
}

export default Navbar
