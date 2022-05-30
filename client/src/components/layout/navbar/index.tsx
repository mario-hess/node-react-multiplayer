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
  display: flex;
  position: fixed;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  left: ${(props) => (props.isToggled ? '0px' : '-100%')};
  width: 100%;
  height: 70%;
  transition: all 0.5s ease;
  background-color: ${(props) => props.theme.colors.background};

  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    left: 50%;
    flex-direction: row;
    transform: translate(-50%, 0%);
    align-items: center;
    justify-content: space-between;
    width: 80%;
    height: 3em;
  }
`

const ListLeft = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  overflow: hidden;

  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    flex-direction: row;
    height: 3em;
  }
`
const ListRight = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  list-style: none;
  overflow: hidden;
  margin-top: 3em;

  @media only screen and (min-width: ${(props) =>
      props.theme.breakpoints.laptop}) {
    flex-direction: row;
    height: 3em;
    margin-top: 0px;
  }
`

const ListLink = styled(Link)`
  display: block;
  color: black;
  text-align: center;
  padding: 0.5em;
  text-decoration: none;
  color: ${(props) => props.theme.colors.foreground};

  &:hover {
    cursor: pointer;
    color: pink;
  }
`

const Logout = styled.p`
  display: block;
  color: black;
  text-align: center;
  text-decoration: none;
  color: ${(props) => props.theme.colors.foreground};
  padding: 0.5em;

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
        <ListLeft>
          <li>
            <ListLink to='/' onClick={toggle}>
              Home
            </ListLink>
          </li>
          <li>
            <ListLink to='/' onClick={toggle}>
              Players
            </ListLink>
          </li>
          <li>
            <ListLink to='/' onClick={toggle}>
              Clans
            </ListLink>
          </li>
          <li>
            <ListLink to='/' onClick={toggle}>
              PvE
            </ListLink>
          </li>
          <li>
            <ListLink to='/' onClick={toggle}>
              PvP
            </ListLink>
          </li>
          <li>
            <ListLink to='/' onClick={toggle}>
              Items
            </ListLink>
          </li>
          <li>
            <ListLink to='/' onClick={toggle}>
              Skills
            </ListLink>
          </li>
        </ListLeft>
        <ListRight>
          {userSlice?.user?.payload === undefined ? (
            <li>
              <ListLink to='/auth' onClick={toggle}>
                Account
              </ListLink>
            </li>
          ) : (
            <>
              <li>
                <ListLink to='/' onClick={toggle}>
                  Play
                </ListLink>
              </li>
              <li>
                <ListLink to='/auth' onClick={toggle}>
                  Account
                </ListLink>
              </li>
              <li>
                <Logout onClick={logout}>Logout</Logout>
              </li>
            </>
          )}
        </ListRight>
      </Nav>
    </>
  )
}

export default Navbar
