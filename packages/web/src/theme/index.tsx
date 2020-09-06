import React from 'react'
import { ThemeProvider, ColorModeProvider, CSSReset } from '@chakra-ui/core'
import customTheme from './customTheme'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'

const CustomThemeProvider: React.FC = props => {
  return (
    <ThemeProvider theme={customTheme}>
      <ColorModeProvider value="light">
        <EmotionThemeProvider theme={customTheme}>
          <CSSReset />
          {props.children}
        </EmotionThemeProvider>
      </ColorModeProvider>
    </ThemeProvider>
  )
}

export default CustomThemeProvider
