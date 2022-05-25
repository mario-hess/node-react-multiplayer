import { useSelector } from 'react-redux'
import styled from 'styled-components'

import { useAppDispatch } from '../../../../store'
import { toggled } from './slice'

const animationType = 'cubic-bezier(0.4, 0.45, 0.5, 1)'

type StyledProps = {
  isToggled: boolean
}

const Wrapper = styled.svg`
  position: absolute;
  margin: 0.8em;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
`

const OuterPath = styled.path<StyledProps>`
  transition: stroke-dasharray 500ms ${animationType},
    stroke-dashoffset 500ms ${animationType};
  fill: none;
  stroke: ${(props) => props.theme.colors.foreground};
  stroke-width: 1;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => (props.isToggled ? '7 28' : '10 27')};
  stroke-dashoffset: ${(props) => (props.isToggled ? '-27' : '0')};
`

const CenterPath = styled.path<StyledProps>`
  transition: stroke-dasharray 500ms ${animationType},
    stroke-dashoffset 350ms ${animationType};
  fill: none;
  stroke: ${(props) => props.theme.colors.foreground};
  stroke-with: 1;
  stroke-linecap: round;
  stroke-dasharray: ${(props) => (props.isToggled ? '10 24' : '10 24')};
  stroke-dashoffset: ${(props) => (props.isToggled ? '-10' : '0')};
`

const BurgerMenu: React.FunctionComponent = () => {
  const isToggled = useSelector((state: any) => state.burgerMenu.isToggled)
  const dispatch = useAppDispatch()

  const toggle = (event: React.MouseEvent) => {
    event.preventDefault()
    dispatch(toggled())
  }

  return (
    <Wrapper width={50} height={50} viewBox='-0.5 0 15 12.5' onClick={toggle}>
      <OuterPath
        isToggled={isToggled}
        d='m 0.5,8.5 h 10 c 1.666667,0 1.820503,-1.4177976 2.5,-3.99644 0.699157,-2.6532508 0.698686,-3.87285249 0.164006,-4.66444661 C 12.621455,-0.91395689 11.176817,-0.99843497 10,0.05017631 L 1,9.0501763'
      />
      <CenterPath isToggled={isToggled} d={`m 0.5,5 h 10`} />

      <OuterPath
        isToggled={isToggled}
        d='m 0.5,1.5 h 10 c 1.666667,0 1.820503,1.4177973 2.5,3.9964398 0.699157,2.6532508 0.698686,3.8728525 0.164006,4.6644462 C 12.621455,10.964134 11.176817,11.048613 10,9.9999998 L 1,1'
      />
    </Wrapper>
  )
}

export default BurgerMenu
