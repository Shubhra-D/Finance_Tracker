import {
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  Image,
  SimpleGrid,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import { BiBarChart, BiTargetLock } from "react-icons/bi";
import { FaCheckCircle } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import motivation from "../assets/motivate.mp4";
import Footer from "../Common/Footer";
import { Link } from "react-router-dom";

const Motion = motion(Box);
const MotionButton = motion(Button);

// Animated background particles
const ParticleBackground = ({ isDark }) => {
  const particles = Array.from({ length: 50 });

  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={-1}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + (i % 4)}px`,
            height: `${2 + (i % 4)}px`,
            borderRadius: "50%",
            backgroundColor: isDark
              ? `rgba(129, 230, 217, ${0.1 + (i % 3) * 0.1})`
              : `rgba(56, 178, 172, ${0.1 + (i % 3) * 0.1})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.sin(i) * 20, 0],
            opacity: [0.1, 0.6, 0.1],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + (i % 5) * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </Box>
  );
};

// Floating geometric shapes
const FloatingShapes = ({ isDark }) => {
  const shapes = Array.from({ length: 8 });

  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={-1}>
      {shapes.map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${30 + i * 10}px`,
            height: `${30 + i * 10}px`,
            borderRadius: i % 2 === 0 ? "50%" : "20%",
            background: isDark
              ? `linear-gradient(135deg, rgba(129, 230, 217, 0.3), rgba(56, 178, 172, 0.25))`
              : `linear-gradient(135deg, rgba(56, 178, 172, 0.2), rgba(72, 187, 120, 0.2))`,
            left: `${(i * 12) % 90}%`,
            top: `${(i * 15) % 80}%`,
            filter: "blur(1px)",
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            x: [0, 50, -30, 0],
            y: [0, -50, 30, 0],
          }}
          transition={{
            duration: 20 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </Box>
  );
};

const Home = () => {
  const { colorMode } = useColorMode();
  const themeColors = {
    bg: colorMode === "dark" ? "gray.900" : "whiteAlpha.800",
    cardBg: colorMode === "dark" ? "gray.800" : "whiteAlpha.800",
    text: colorMode === "dark" ? "whiteAlpha.900" : "gray.800",
    subText: colorMode === "dark" ? "gray.300" : "gray.600",
    accent: colorMode === "dark" ? "teal.300" : "teal.500",
    gradientFrom: colorMode === "dark" ? "gray.900" : "teal.100",
    gradientTo: colorMode === "dark" ? "gray.700" : "teal.50",
    sectionBg: colorMode === "dark" ? "gray.800" : "gray.100",
  };

  // 🔹 Features Section
  const Features = () => {
    const features = [
      {
        icon: FaCheckCircle,
        title: "Organize Tasks",
        desc: "Plan and manage daily goals effortlessly.",
      },
      {
        icon: FaClock,
        title: "Track Progress",
        desc: "Stay updated with your task completion.",
      },
      {
        icon: BiTargetLock,
        title: "Stay Motivated",
        desc: "Achieve goals with reminders and quotes.",
      },
      {
        icon: BiBarChart,
        title: "Minimal UI",
        desc: "Clean, simple, and distraction-free design.",
      },
    ];

    return (
      <Box
        py={12}
        bg={themeColors.sectionBg}
        position="relative"
        overflow="hidden"
      >
        <ParticleBackground colorMode={colorMode} />
        <Container maxW="6xl" position="relative" zIndex={1}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Heading
              textAlign="center"
              mb={8}
              pt={8}
              color={themeColors.accent}
              fontSize={{ base: "3xl", md: "4xl" }}
            >
              ✨ App Features
            </Heading>
          </motion.div>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={8}>
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <VStack
                  p={6}
                  rounded="2xl"
                   bgGradient="to-r"
                    gradientFrom={colorMode ==='dark'?"pink.500":" teal.200"}
                    gradientTo={colorMode === 'dark'?"cyan.400":" cyan.400"}
                  
                  shadow={colorMode === "dark" ? "2xl" : "xl"}
                  align="center"
                  spacing={4}
                  border={colorMode === "dark" ? "1px solid" : "none"}
                  borderColor={
                    colorMode === "dark" ? "gray.700" : "transparent"
                  }
                  _hover={{
                    shadow: "2xl",
                    transform: "translateY(-5px)",
                    bg: colorMode === "dark" ? "gray.750" : "white",
                  }}
                  transition="all 0.3s ease"
                  position="relative"
                  overflow="hidden"
                >
                  <Box
                    position="absolute"
                    top={0}
                    left={0}
                    right={0}
                    h="3px"
                   />
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Icon as={f.icon} boxSize={12} color={themeColors.accent} />
                  </motion.div>
                  <Heading size="md" color={themeColors.accent}>
                    {f.title}
                  </Heading>
                  <Text
                    textAlign="center"
                    color={themeColors.subText}
                    fontSize="sm"
                  >
                    {f.desc}
                  </Text>
                </VStack>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    );
  };

  // 🔹 Hero Section
  const Hero = () => (
    <Box position="relative" overflow="hidden">
      <FloatingShapes colorMode={colorMode} />
      <Flex
        align="center"
        justify="center"
        minH="70vh"
        direction="column"
        bgGradient={'to-tr'}
        gradientFrom={colorMode === 'dark'? "gray.900":"teal.200"}
        gradientVia={colorMode === 'dark'? "gray.800":"teal.50"}
        gradientTo={colorMode === 'dark'? "teal.900":"cyan.200"}
        textAlign="center"
        px={4}
        position="relative"
        zIndex={1}
      >

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            <Heading
              fontSize={{ base: "4xl", md: "6xl" }}
              mb={6}
              color={themeColors.text}
              bgSize="200% 100%"
            >
              Welcome to Your Productivity Hub
            </Heading>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <Text
            fontSize="xl"
            mb={8}
            color={themeColors.subText}
            maxW="600px"
            lineHeight="1.6"
          >
            Stay organized, motivated, and achieve your goals with ease.
            Experience productivity like never before.
          </Text>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MotionButton
            size="lg"
            h="60px"
            px={10}
            fontSize="lg"
            borderRadius="full"
            bgGradient="to-bl"
            gradientFrom={colorMode === "dark" ? " pink.300" : "teal.500"}
            gradientTo={colorMode === "dark" ? " pink.500" : "teal.700"}
            color={themeColors.subText}
            shadow="2xl"
            _hover={{
              shadow: "2xl",
              
               bgGradient:
                colorMode === "dark"
                  ? "linear-gradient(135deg, teal.300, cyan.300)"
                   : "linear-gradient(135deg, teal.400, teal.600)",
            }}
          >
            <Link to={"/signup"}>🚀 Start Your Journey</Link>
          </MotionButton>
        </motion.div>
      </Flex>
    </Box>
  );

  // 🔹 Spotlight Image Section
  const SpotlightImages = () => {
    const images = [img1, img2, img3, img4, img5, img6, img7, img8];

    return (
      <Box
        py={16}
        bgGradient="to-tl"
        gradientFrom={
          colorMode === "dark"
            ? "rgba(46, 207, 199, 0.1)"
            : "rgba(12, 90, 86, 0.05)"
        }
        gradientTo={
          colorMode === "dark"
            ? "rgba(129, 230, 217, 0.1)"
            : "rgba(72, 187, 120, 0.05)"
        }
        position="relative"
        overflow="hidden"
      >
        <ParticleBackground isDark={colorMode === 'dark'} />
        <Container maxW="6xl" textAlign="center" position="relative" zIndex={1}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            bgGradient={
              colorMode === "dark"
                ? "linear(to-r, teal.300, cyan.300)"
                : "linear(to-r, teal.500, teal.700)"
            }
          >
            <Heading
              mb={10}
              fontSize={{ base: "3xl", md: "4xl" }}
              color={themeColors.accent}
            >
              🌟 Stay Inspired
            </Heading>
          </motion.div>
          <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} gap={6}>
            {images.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.1,
                  rotate: [0, -2, 2, 0],
                  y: -10,
                }}
              >
                <Box
                  position="relative"
                  overflow="hidden"
                  borderRadius="2xl"
                  shadow={colorMode === "dark" ? "2xl" : "xl"}
                  _hover={{
                    shadow: "2xl",
                  }}
                  transition="all 0.3s ease"
                >
                  <Image
                    src={src}
                    alt={`slide-${i}`}
                    boxSize="280px"
                    objectFit="cover"
                    borderRadius="2xl"
                    filter={
                      colorMode === "dark"
                        ? "brightness(0.9) contrast(1.1)"
                        : "none"
                    }
                  />
                  <Box
                    position="absolute"
                    inset={0}
                    opacity={0}
                    _hover={{ opacity: 1 }}
                    transition="opacity 0.3s ease"
                    borderRadius="2xl"
                  />
                </Box>
              </motion.div>
            ))}
          </SimpleGrid>
        </Container>
      </Box>
    );
  };

  const Motivation = () => (
    <Box

      py={16}
      bg={themeColors.sectionBg}
      position="relative"
      overflow="hidden"
    >
      <FloatingShapes isDark={colorMode === 'dark'} />
      <Container maxW="6xl" position="relative" zIndex={1} >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Flex
            direction={{ base: "column", lg: "row" }}
            align="center"
            gap={12}
          >
            {/* Video Embed */}
            <motion.div
              style={{ flex: 1 }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Box
                borderRadius="2xl"
                overflow="hidden"
                shadow={colorMode === "dark" ? "2xl" : "xl"}
                border={colorMode === "dark" ? "1px solid" : "none"}
                bg={themeColors.sectionBg}
                borderColor={colorMode === "dark" ? "gray.700" : "gray.300"}
              >
                <video
                  src={motivation}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "315px",
                    filter: colorMode === "dark" ? "brightness(0.9)" : "none",
                  }}
                />
              </Box>
            </motion.div>

            {/* Quote */}
            <motion.div
              style={{ flex: 1 }}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <VStack align="flex-start" gap={8}>
                <Box
                  p={6}
                  borderRadius="2xl"
                  bgGradient="to-bl"
                  gradientFrom={colorMode === "dark" ? "gray.800" : "teal.200"}
                  gradientVia={colorMode === "dark" ? "gray.700" : "teal.50"}
                  gradientTo={colorMode === "dark" ? "gray.600" : "cyan.200"}
                  border={colorMode === "dark" ? "1px solid" : "1px solid"}
                  borderColor={colorMode === "dark" ? "gray.600" : "teal.200"}
                  shadow="lg"
                >
                  <motion.div
                    animate={{
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                    }}
                    transition={{ duration: 8, repeat: Infinity }}
                  >
                    <Heading
                      fontSize="2xl"
                      fontFamily="cursive"
                      color={themeColors.text}
                      bgSize="200% 100%"
                      lineHeight="1.4"
                    >
                      "Productivity is never an accident. It is always the
                      result of a commitment to excellence, intelligent
                      planning, and focused effort."
                    </Heading>
                  </motion.div>
                </Box>
                <Text
                  fontSize="md"
                  color={themeColors.subText}
                  fontWeight="medium"
                >
                  Remember, It only takes one reason to continue and many to
                  quit. 💪💪
                </Text>
              </VStack>
            </motion.div>
          </Flex>
        </motion.div>
      </Container>
    </Box>
  );

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={colorMode === "dark" ? "dark" : "light"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box  minH="100vh">
          <Hero />
          <Features />
          <SpotlightImages />
          <Motivation />
          <Box bg={themeColors.bg}>
            <Footer />
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default Home;
