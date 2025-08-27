import { Box, Text } from '@chakra-ui/react'
import React from 'react'

const Footer = () => {
  return (
    <Box bg="gray.900" color="gray.300" py={8} textAlign="center">
    <Text>&copy; {new Date().getFullYear()} ToDo App. All rights reserved.</Text>
    <Text mt={2} fontSize="sm">
      Stay productive, stay happy ✨
    </Text>
  </Box>
  )
}

export default Footer