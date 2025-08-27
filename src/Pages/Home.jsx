import { Box, Container, Flex, Heading, Icon, Image, SimpleGrid, Text, VStack,Button } from '@chakra-ui/react'
import { motion } from 'framer-motion';
import React from 'react'
import { BiBarChart, BiTargetLock } from 'react-icons/bi';
import { FaCheckCircle } from 'react-icons/fa';
import { FaClock } from 'react-icons/fa6';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import img6 from '../assets/img6.jpg';
import img7 from '../assets/img7.jpg';
import img8 from '../assets/img8.jpg';
import motivation from '../assets/motivate.mp4';
import Footer from '@/Common/Footer';
import { Link } from 'react-router-dom';

const Home = () => {
  const Motion = motion(Box);
  // 🔹 Features Section
const Features = () => {
  const features = [
    { icon: FaCheckCircle, title: "Organize Tasks", desc: "Plan and manage daily goals effortlessly." },
    { icon: FaClock, title: "Track Progress", desc: "Stay updated with your task completion." },
    { icon: BiTargetLock, title: "Stay Motivated", desc: "Achieve goals with reminders and quotes." },
    { icon: BiBarChart, title: "Minimal UI", desc: "Clean, simple, and distraction-free design." },
  ];

  return (
    <Box py={12} bg="gray.50">
      <Container maxW="6xl">
        <Heading textAlign="center" mb={8} pt={8} color={'teal.800'}>
          App Features
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
          {features.map((f, i) => (
            <VStack
              key={i}
              p={6}
              bg="white"
              rounded="2xl"
              shadow="md"
              align="center"
              spacing={4}
              _hover={{ shadow: "xl", transform: "scale(1.05)" }}
              transition="all 0.3s ease"
            >
              <Icon as={f.icon} boxSize={10} color="teal.500" />
              <Heading size="md" color={'teal.500'}>{f.title}</Heading>
              <Text textAlign="center" color="gray.600">
                {f.desc}
              </Text>
            </VStack>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};
// 🔹 Hero Section
const Hero = () => (
  <Flex
    align="center"
    justify="center"
    minH="60vh"
    direction="column"
    bgGradient="linear(to-r, teal.100, teal.50)"
    textAlign="center"
    px={4}
  >
    <Heading fontSize={{ base: "3xl", md: "5xl" }} mb={4}>
      Welcome to Your Productivity Hub
    </Heading>
    <Text fontSize="lg" mb={6} color="gray.700">
      Stay organized, motivated, and achieve your goals with ease.
    </Text>
    <Button colorScheme="teal" size="lg">
      <Link to={'/signup'}>Start Your To-Dos</Link>
    </Button>
  </Flex>
);

// 🔹 Spotlight Image Section
const SpotlightImages = () => {
  const images = [img1,img2,img3,img4,img4,img5,img6,img7,img8
    
  ];

  return (
    <Box py={12} bg="white">
      <Container maxW="5xl" textAlign="center">
        <Heading mb={6}>Stay Inspired</Heading>
        <Flex justify="center" gap={6} wrap="wrap">
          {images.map((src, i) => (
            <Motion
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={src}
                alt={`slide-${i}`}
                boxSize="300px"
                objectFit="cover"
                rounded="2xl"
                shadow="md"
              />
            </Motion>
          ))}
        </Flex>
      </Container>
    </Box>
  );
};
const Motivation = () => (
  <Box py={16} bg="gray.50">
    <Container maxW="6xl">
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        gap={10}
      >
        {/* Video Embed */}
        <Box flex="1" rounded="2xl" overflow="hidden">
          <iframe
            width="100%"
            height="315"
            src={motivation}
            title="Motivation"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>

        {/* Quote */}
        <VStack flex="1" align="flex-start" spacing={6}>
          <Heading fontSize="2xl" color="teal.600" fontFamily={'cursive'}>
            "Productivity is never an accident. It is always the result of a
            commitment to excellence, intelligent planning, and focused effort."
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Remember , It only takes one reason to continue and many to quit.
          </Text>
        </VStack>
      </Flex>
    </Container>
  </Box>
);



  return (
    <>
    <Features/>
    <Hero/>
    <SpotlightImages/>
    <Motivation/>
    <Footer/>
    </>
  )
}

export default Home