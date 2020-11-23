import React from 'react'
import { Link } from 'react-router-dom'

import { Flex, Box, Text, Heading, Button } from '@chakra-ui/react'
import { ArrowForwardIcon } from '@chakra-ui/icons'

const Home: React.FC = () => (
  <Flex paddingX="10rem">
    <Flex size="50%" align="center" justify="center">
      <Text textAlign="center">
        <Flex
          direction="column"
          justifyContent="space-around"
          flex="1"
          alignContent="stretch"
          height="80vh"
        >
          <Heading>Welcome to your smart platform</Heading>
          <p>Lorem ipsum is placeholder text commonly used in the graphic</p>
          <Link to="/sign-in">
            <Button
              rightIcon={<ArrowForwardIcon />}
              colorScheme="teal"
              size="lg"
              fontSize="2xl"
            >
              Sign In
            </Button>
          </Link>
        </Flex>
      </Text>
    </Flex>
    <Box>
      <Text bg="tomato" color="black"></Text>
    </Box>
  </Flex>
)

export default Home
