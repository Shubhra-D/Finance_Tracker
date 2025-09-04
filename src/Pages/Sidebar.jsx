import React, { useState } from "react";
import {
  Box,
  Button,
  Text,
  VStack,
  HStack,
  IconButton,
  Drawer,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { FaHamburger } from "react-icons/fa";
import { useSelector } from "react-redux";

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);
// Floating particles for sidebar background
const SidebarParticles = () => {
  const particles = Array.from({ length: 8 });
  
  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={0}>
      {particles.map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${8 + i * 4}px`,
            height: `${8 + i * 4}px`,
            borderRadius: "50%",
            background: `rgba(${i % 2 ? '56, 187, 172' : '129, 236, 217'}, 0.5)`,
            left: `${(i * 12) % 90}%`,
            top: `${(i * 25) % 80}%`,
          }}
          animate={{
            y: [0, -30, 15, 0],
            x: [0, 15, -10, 0],
            scale: [1, 1.3, 0.7, 1],
            opacity: [0.3, 0.6, 0.2, 0.3],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 1.5,
          }}
        />
      ))}
    </Box>
  );
};

// Desktop Sidebar Component
const DesktopSidebar = ({ filtering, setFiltering, sorting, setSorting }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
const totalTasks = tasks.length;
const completedTasks = tasks.filter((t) => t.completed).length;
const pendingTasks = totalTasks - completedTasks;
  const filterOptions = [
    { value: "all", label: "🌟 All Tasks", icon: "🌟" },
    { value: "pending", label: "⏳ Pending", icon: "⏳" },
    { value: "completed", label: "✅ Completed", icon: "✅" },
  ];

  const sortOptions = [
    { value: "newest", label: "🆕 Newest First", icon: "🆕" },
    { value: "oldest", label: "⏰ Oldest First", icon: "⏰" },
    { value: "dueAsc", label: "📅 Due Date", icon: "📅" },
  ];

  const buttonVariants = {
    idle: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <MotionBox
      position="fixed"
      left={0}
      top={"80px"}
      h="calc(100vh - 80px)"
      w="320px"
      display={'flex'}
      flexDirection={'column'}
      bgGradient="linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)"
      backdropFilter="blur(20px)"
      borderRight="1px solid rgba(203, 213, 225, 0.3)"
      borderRadius={'2xl'}
      boxShadow="0 0 50px rgba(0, 0, 0, 0.1)"
      zIndex={1000}
      initial={{ x: -320 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      overflow="hidden"
    >
      <SidebarParticles />
      
      {/* Header */}
      <MotionBox
        position="relative"
        zIndex={2}
        p={6}
        borderBottom="1px solid rgba(203, 213, 225, 0.2)"
        bgGradient="linear-gradient(135deg, rgba(56, 178, 172, 0.1) 0%, rgba(129, 230, 217, 0.1) 100%)"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          bgGradient="linear-gradient(135deg, #38B2AC 0%, #4FD1C7 50%, #81E6D9 100%)"
          bgClip="text"
          textAlign="center"
          mb={2}
        >
          ⚡ Task Control
        </Text>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Organize your magical productivity
        </Text>
      </MotionBox>

      {/* Content */}
      <VStack gap={8} p={6} position="relative" flex={"1"} zIndex={2} h="calc(100vh - 120px)" overflow="auto">
        {/* Filter Section */}
        <MotionBox
          w="full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            color="gray.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            🎯 Filter Tasks
          </Text>
          <VStack gap={3} w="full">
            {filterOptions.map((option, index) => (
              <MotionButton
                key={option.value}
                w="full"
                h="12"
                justifyContent="flex-start"
                leftIcon={<span style={{ fontSize: '16px' }}>{option.icon}</span>}
                bg={filtering === option.value 
                  ? "linear-gradient(135deg, #38B2AC 0%, #4FD1C7 100%)" 
                  : "rgba(255, 255, 255, 0.8)"
                }
                color={filtering === option.value ? "white" : "gray.700"}
                border="1px solid"
                borderColor={filtering === option.value 
                  ? "transparent" 
                  : "rgba(203, 213, 225, 0.5)"
                }
                borderRadius="xl"
                onClick={() => setFiltering(option.value)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                _hover={{
                  bg: filtering === option.value 
                    ? "linear-gradient(135deg, #319795 0%, #38B2AC 100%)"
                    : "rgba(248, 250, 252, 1)",
                  borderColor: filtering === option.value 
                    ? "transparent" 
                    : "rgba(56, 178, 172, 0.3)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
                fontWeight="medium"
                fontSize="sm"
              >
                {option.label.split(' ').slice(1).join(' ')}
              </MotionButton>
            ))}
          </VStack>
        </MotionBox>

        {/* Sort Section */}
        <MotionBox
          w="full"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Text
            fontSize="lg"
            fontWeight="bold"
            mb={4}
            color="gray.700"
            display="flex"
            alignItems="center"
            gap={2}
          >
            📊 Sort Order
          </Text>
          <VStack gap={3} w="full">
            {sortOptions.map((option, index) => (
              <MotionButton
                key={option.value}
                w="full"
                h="12"
                justifyContent="flex-start"
                leftIcon={<span style={{ fontSize: '16px' }}>{option.icon}</span>}
                bg={sorting === option.value 
                  ? "linear-gradient(135deg, #805AD5 0%, #9F7AEA 100%)" 
                  : "rgba(255, 255, 255, 0.8)"
                }
                color={sorting === option.value ? "white" : "gray.700"}
                border="1px solid"
                borderColor={sorting === option.value 
                  ? "transparent" 
                  : "rgba(203, 213, 225, 0.5)"
                }
                borderRadius="xl"
                onClick={() => setSorting(option.value)}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                _hover={{
                  bg: sorting === option.value 
                    ? "linear-gradient(135deg, #6B46C1 0%, #805AD5 100%)"
                    : "rgba(248, 250, 252, 1)",
                  borderColor: sorting === option.value 
                    ? "transparent" 
                    : "rgba(128, 90, 213, 0.3)",
                  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                }}
                fontWeight="medium"
                fontSize="sm"
              >
                {option.label.split(' ').slice(1).join(' ')}
              </MotionButton>
            ))}
          </VStack>
        </MotionBox>

        {/* Quick Stats */}
        <MotionBox
          w="full"
          p={4}
          borderRadius="xl"
          bgGradient="linear-gradient(135deg, rgba(249, 168, 212, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%)"
          border="1px solid rgba(249, 168, 212, 0.2)"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Text fontSize="md" fontWeight="bold" mb={3} color="gray.700" textAlign="center">
            📈 Quick Stats
          </Text>
          <VStack spacing={2}>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="gray.600">Total Tasks:</Text>
              <Text fontSize="sm" fontWeight="bold" color="purple.600">{totalTasks}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="gray.600">Completed:</Text>
              <Text fontSize="sm" fontWeight="bold" color="green.600">{completedTasks}</Text>
            </HStack>
            <HStack justify="space-between" w="full">
              <Text fontSize="sm" color="gray.600">Pending:</Text>
              <Text fontSize="sm" fontWeight="bold" color="orange.600">{pendingTasks}</Text>
            </HStack>
          </VStack>
        </MotionBox>
      </VStack>
    </MotionBox>
  );
};

// Mobile Sidebar (Drawer)
const MobileSidebar = ({ filtering, setFiltering, sorting, setSorting, isOpen, onClose }) => {
  const tasks = useSelector((state) => state.tasks.tasks);
const totalTasks = tasks.length;
const completedTasks = tasks.filter((t) => t.completed).length;
const pendingTasks = totalTasks - completedTasks;
  const filterOptions = [
    { value: "all", label: "All Tasks"},
    { value: "pending", label: " Pending"},
    { value: "completed", label: "Completed" },
  ];

  const sortOptions = [
    { value: "newest", label: "Newest First",  },
    { value: "oldest", label: "Oldest First" },
    { value: "dueAsc", label: " Due Date"},
  ];

  return (
    <Drawer.Root isOpen={isOpen} placement="left" onClose={onClose} size="sm">
      <Drawer.Backdrop backdropFilter="blur(4px)" />
      <Drawer.Content
        bgGradient="linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)"
        backdropFilter="blur(20px)"
        overflow="hidden"
      >
        <Box position="absolute" inset="0" overflow="hidden" zIndex={0}>
          <SidebarParticles />
        </Box>
        
        <Drawer.ActionTrigger 
          zIndex={3}
          color="gray.600"
          _hover={{ bg: "rgba(203, 213, 225, 0.2)" }}
        />
        
        <Drawer.Header
          position="relative"
          zIndex={2}
          borderBottom="1px solid rgba(203, 213, 225, 0.2)"
          bgGradient="linear-gradient(135deg, rgba(56, 178, 172, 0.1) 0%, rgba(129, 230, 217, 0.1) 100%)"
        >
          <Text
            fontSize="xl"
            fontWeight="bold"
            bgGradient="linear-gradient(135deg, #38B2AC 0%, #4FD1C7 50%, #81E6D9 100%)"
            bgClip="text"
          >
            ⚡ Task Control
          </Text>
          <Text fontSize="sm" color="gray.600">
            Organize your magical productivity
          </Text>
        </Drawer.Header>

        <Drawer.Body position="relative" zIndex={2} p={6}>
          <VStack spacing={6} w="full">
            {/* Filter Section */}
            <Box w="full">
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
                🎯 Filter Tasks
              </Text>
              <VStack spacing={3} w="full">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    w="full"
                    h="12"
                    justifyContent="flex-start"
                    bg={filtering === option.value 
                      ? "linear-gradient(135deg, #38B2AC 0%, #4FD1C7 100%)" 
                      : "rgba(255, 255, 255, 0.8)"
                    }
                    color={filtering === option.value ? "white" : "gray.700"}
                    border="1px solid"
                    borderColor={filtering === option.value 
                      ? "transparent" 
                      : "rgba(203, 213, 225, 0.5)"
                    }
                    borderRadius="xl"
                    onClick={() => setFiltering(option.value)}
                    _hover={{
                      bg: filtering === option.value 
                        ? "linear-gradient(135deg, #319795 0%, #38B2AC 100%)"
                        : "rgba(248, 250, 252, 1)",
                      borderColor: filtering === option.value 
                        ? "transparent" 
                        : "rgba(56, 178, 172, 0.3)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    }}
                    fontWeight="medium"
                    fontSize="sm"
                    transition="all 0.2s ease"
                  >
                    {option.label}
                  </Button>
                ))}
              </VStack>
            </Box>

            {/* Sort Section */}
            <Box w="full">
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.700">
                📊 Sort Order
              </Text>
              <VStack spacing={3} w="full">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    w="full"
                    h="12"
                    justifyContent="flex-start"
                    bg={sorting === option.value 
                      ? "linear-gradient(135deg, #805AD5 0%, #9F7AEA 100%)" 
                      : "rgba(255, 255, 255, 0.8)"
                    }
                    color={sorting === option.value ? "white" : "gray.700"}
                    border="1px solid"
                    borderColor={sorting === option.value 
                      ? "transparent" 
                      : "rgba(203, 213, 225, 0.5)"
                    }
                    borderRadius="xl"
                    onClick={() => setSorting(option.value)}
                    _hover={{
                      bg: sorting === option.value 
                        ? "linear-gradient(135deg, #6B46C1 0%, #805AD5 100%)"
                        : "rgba(248, 250, 252, 1)",
                      borderColor: sorting === option.value 
                        ? "transparent" 
                        : "rgba(128, 90, 213, 0.3)",
                      transform: "translateY(-2px)",
                      boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                    }}
                    fontWeight="medium"
                    fontSize="sm"
                    transition="all 0.2s ease"
                  >
                    {option.label.split(' ').slice(1).join(' ')}
                  </Button>
                ))}
              </VStack>
            </Box>

            {/* Quick Stats */}
            <Box
              w="full"
              p={4}
              borderRadius="xl"
              bgGradient="linear-gradient(135deg, rgba(249, 168, 212, 0.1) 0%, rgba(196, 181, 253, 0.1) 100%)"
              border="1px solid rgba(249, 168, 212, 0.2)"
            >
              <Text fontSize="md" fontWeight="bold" mb={3} color="gray.700" textAlign="center">
                📈 Quick Stats
              </Text>
              <VStack gap={2}>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">Total Tasks:</Text>
                  <Text fontSize="sm" fontWeight="bold" color="purple.600">{totalTasks}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">Completed:</Text>
                  <Text fontSize="sm" fontWeight="bold" color="green.600">{completedTasks}</Text>
                </HStack>
                <HStack justify="space-between" w="full">
                  <Text fontSize="sm" color="gray.600">Pending:</Text>
                  <Text fontSize="sm" fontWeight="bold" color="orange.600">{pendingTasks}</Text>
                </HStack>
              </VStack>
            </Box>
          </VStack>
        </Drawer.Body>
      </Drawer.Content>
    </Drawer.Root>
  );
};

// Main Sidebar Component with Responsive Logic
const Sidebar = ({ filtering, setFiltering, sorting, setSorting }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, lg: false });

  // Mobile toggle button
  const MobileToggle = () => (
    <MotionIconButton
      position="fixed"
      top={4}
      left={4}
      zIndex={1001}
      onClick={onOpen}
      mt={14}
      bg="rgba(255, 255, 255, 0.9)"
      backdropFilter="blur(10px)"
      border="1px solid rgba(203, 213, 225, 0.3)"
      borderRadius="xl"
      color="blue.700"
      size="lg"
      boxShadow="0 8px 25px rgba(0, 0, 0, 0.15)"
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 12px 35px rgba(0, 0, 0, 0.2)"
      }}
      whileTap={{ scale: 0.95 }}
      _hover={{
        bg: "rgba(56, 178, 172, 0.1)",
        borderColor: "rgba(56, 178, 172, 0.3)",
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    ><FaHamburger/></MotionIconButton>
  );

  return (
    <>
      {isMobile ? (
        <>
          <MobileToggle />
          <MobileSidebar
            filtering={filtering}
            setFiltering={setFiltering}
            sorting={sorting}
            setSorting={setSorting}
            isOpen={isOpen}
            onClose={onClose}
          />
        </>
      ) : (
        <DesktopSidebar
          filtering={filtering}
          setFiltering={setFiltering}
          sorting={sorting}
          setSorting={setSorting}
        />
      )}
    </>
  );
};

export default Sidebar;