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
      mobileSmall: string
      mobileMedium: string
      mobileLarge: string
      tablet: string
      laptop: string
      laptopLarge: string
      desktop: string
    }

    tapHeight: {
      mobile: string
      desktop: string
    }
  }
}
