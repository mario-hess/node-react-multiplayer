import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../../store'
import { toggled } from './slice'

const BurgerMenu = () => {
  const dispatch = useAppDispatch()
  const isToggled = useSelector((state: any) => state.burgerMenu.isToggled)

  const color = '#0d0d0d'
  const animationType = 'cubic-bezier(0.4, 0.45, 0.5, 1)'

  const toggle = (event: React.MouseEvent) => {
    event.preventDefault()
    dispatch(toggled())
  }

  const wrapper: React.CSSProperties = {
    position: 'absolute',
    margin: '0.8em',
    cursor: 'pointer',
    WebkitTapHighlightColor: 'transparent',
    touchAction: 'manipulation',
    userSelect: 'none',
    msUserSelect: 'none',
    WebkitUserSelect: 'none',
    MozUserSelect: 'none',
  }

  const centerPath: React.CSSProperties = {
    transition:
      `stroke-dasharray 500ms ${animationType},` +
      `stroke-dashoffset 350ms ${animationType}`,
    fill: 'none',
    stroke: color,
    strokeWidth: 1,
    strokeLinecap: 'round',
    strokeDasharray: isToggled ? '10 24' : '10 24',
    strokeDashoffset: isToggled ? -10 : 0,
  }

  const outerPath: React.CSSProperties = {
    transition:
      `stroke-dasharray 500ms ${animationType},` +
      `stroke-dashoffset 500ms ${animationType}`,
    fill: 'none',
    stroke: color,
    strokeWidth: 1,
    strokeLinecap: 'round',
    strokeDasharray: isToggled ? '7 28' : '10 27',
    strokeDashoffset: isToggled ? '-27' : 0,
  }

  return (
    <svg
      style={wrapper}
      width={50}
      height={50}
      viewBox='-0.5 0 15 12.5'
      onClick={toggle}
    >
      <path
        style={outerPath}
        fill={color}
        d='m 0.5,8.5 h 10 c 1.666667,0 1.820503,-1.4177976 2.5,-3.99644 0.699157,-2.6532508 0.698686,-3.87285249 0.164006,-4.66444661 C 12.621455,-0.91395689 11.176817,-0.99843497 10,0.05017631 L 1,9.0501763'
      />
      <path style={centerPath} fill={color} d={`m 0.5,5 h 10`} />

      <path
        style={outerPath}
        d='m 0.5,1.5 h 10 c 1.666667,0 1.820503,1.4177973 2.5,3.9964398 0.699157,2.6532508 0.698686,3.8728525 0.164006,4.6644462 C 12.621455,10.964134 11.176817,11.048613 10,9.9999998 L 1,1'
        fill={color}
      />
    </svg>
  )
}

export default BurgerMenu
