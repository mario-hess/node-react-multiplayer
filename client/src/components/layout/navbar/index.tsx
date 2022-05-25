import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { useAppDispatch } from '../../../store'
import { toggled } from './burger-menu/slice'
import { setUser } from '../../../redux/userSlice'

import BurgerMenu from './burger-menu'

type StyledProps = {
  isToggled: boolean
}

const Nav = styled.nav<StyledProps>`
  position: fixed;
  top: 0px;
  left: ${(props) => (props.isToggled ? '0px' : '-200px')};
  width: 200px;
  height: 100vh;
  background-color: #e3e3e3;
  transition: all 0.5s ease;
`

const List = styled.ul`
  display: flex;
  position: absolute;
  width: 100%;
  align-items: center;
  justify-content: center;
  height: 40vh;
  flex-direction: column;
  list-style: none;
  overflow: hidden;
`

const ListLink = styled(Link)`
  display: block;
  color: black;
  text-align: center;
  padding: 0.5em;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: pink;
  }
`

const Logout = styled.p`
  display: block;
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
  const isToggled = useSelector((state: any) => state.burgerMenu.isToggled)
  const userSlice = useSelector((state: any) => state.user)

  const logout = async (event: React.MouseEvent<HTMLParagraphElement>) => {
    event.preventDefault()
    dispatch(toggled())
    try {
      await axios.get((import.meta.env.VITE_BASEURL as string) + 'auth/logout')
      dispatch(setUser(undefined))
      navigate('/auth')
    } catch ({ response }) {
      console.log(response)
    }
  }

  const toggle = (
    event:
      | React.MouseEvent<SVGSVGElement>
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLParagraphElement>
  ) => {
    dispatch(toggled())
  }

  return (
    <>
      <BurgerMenu isToggled={isToggled} toggle={toggle} />

      <Nav isToggled={isToggled}>
        <List>
          <li>
            <ListLink to='/' onClick={toggle}>
              Home
            </ListLink>
          </li>
          {userSlice?.user?.payload === undefined ? (
            <li>
              <ListLink to='/auth' onClick={toggle}>
                Auth
              </ListLink>
            </li>
          ) : (
            <>
              <li>
                <ListLink to='/auth' onClick={toggle}>
                  Game
                </ListLink>
              </li>
              <li>
                <Logout onClick={logout}>Logout</Logout>
              </li>
            </>
          )}
        </List>
      </Nav>
    </>
  )
}

export default Navbar
