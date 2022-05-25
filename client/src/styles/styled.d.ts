import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      background: string
      foreground: string
      selection: string
      comment: string
      red: string
      orange: string
      yellow: string
      green: string
      purple: string
      cyan: string
      pink: string
    }

    breakpoints: {
      small: string
      medium: string
      large: string
      xLarge: string
      xxLarge: string
      xxxLarge: string
    }

    tapHeight: {
      mobile: string
      desktop: string
    }
  }
}
