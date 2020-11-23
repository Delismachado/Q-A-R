import { theme } from '@chakra-ui/react'

// Let's say you want to add custom colors
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors
  }
}

export default customTheme
