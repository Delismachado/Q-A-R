import React from 'react'
import { ThemeProvider } from '@chakra-ui/core'
import customTheme from './customTheme'

const CustomThemeProvider: React.FC = (props) => {
  return <ThemeProvider theme={customTheme}>{props.children}</ThemeProvider>
}

export default CustomThemeProvider
