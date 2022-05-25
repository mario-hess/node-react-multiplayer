import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = {
  colors: {
    background: '#f2f2f2',
    foreground: '#454545',
    selection: '#44475a',
    comment: '#6272a4',
    red: '#ff5555',
    orange: '#ffb86c',
    yellow: '#FFAC33',
    green: '#50fa7b',
    purple: '#bd93f9',
    cyan: '#8be9fd',
    pink: '#ff79c6',
  },
  breakpoints: {
    small: '576px',
    medium: '768px',
    large: '992px',
    xLarge: '1200px',
    xxLarge: '1600px',
    xxxLarge: '2000px',
  },
  tapHeight: {
    mobile: '48px',
    desktop: '52px',
  },
}
