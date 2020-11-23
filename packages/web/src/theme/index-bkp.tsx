/* eslint-disable react/prop-types */
import React from 'react'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/react'
import customTheme from '.'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

const CustomThemeProvider: React.FC = props => {
  return (
    <ThemeProvider theme={customTheme}>

          {props.children}
    </ThemeProvider>
  )
}

export default CustomThemeProvider
