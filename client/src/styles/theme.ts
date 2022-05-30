import { DefaultTheme } from 'styled-components'

export const defaultTheme: DefaultTheme = {
  colors: {
    background: '#293241',
    foreground: '#f2f2f2',
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
    mobileSmall: '320px',
    mobileMedium: '375px',
    mobileLarge: '425px',
    tablet: '768px',
    laptop: '1024px',
    laptopLarge: '1440px',
    desktop: '2560px',
  },
  tapHeight: {
    mobile: '48px',
    desktop: '52px',
  },
}
