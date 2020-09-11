import React, { useCallback } from 'react'

import { useAuth } from '../../hooks/auth'
import { Link } from 'react-router-dom'

import { Box, Heading, Flex, Text, Button } from '@chakra-ui/core'

const MenuItems = ({ children }) => (
  <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
    {children}
  </Text>
)

const Header: React.FC = props => {
  const { user, signOut } = useAuth()

  const handleLogOut = useCallback(() => {
    signOut()
  }, [user])

  const [show, setShow] = React.useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="2.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link to="/">
          <Heading as="h1" size="lg">
            Application Name
          </Heading>
        </Link>
      </Flex>

      <Box display={{ sm: 'block', md: 'none' }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'flex' }}
        width={{ sm: 'full', md: 'auto' }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Contact</MenuItems>
        <MenuItems>About us</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? 'block' : 'none', md: 'block' }}
        mt={{ base: 4, md: 0 }}
      >
        {user && (
          <>
            <Box as="span" fontSize="lg" marginRight="1rem">
              Welcome {user.email}
            </Box>
            <Button bg="transparent" border="1px" onClick={handleLogOut}>
              Logoff
            </Button>
          </>
        )}
        {!user && (
          <Link to="/sign-up">
            <Button bg="transparent" border="1px">
              Create account
            </Button>
          </Link>
        )}
      </Box>
    </Flex>
  )
}

export default Header
