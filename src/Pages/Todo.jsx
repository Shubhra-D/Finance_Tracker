import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask, loadUserTasks } from "../Redux/task";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  Select,
  Spinner,
  NativeSelect,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";

// Motion components
const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionInput = motion(Input);

// Animated background elements
const FloatingOrbs = () => {
  const orbs = Array.from({ length: 6 });

  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={-1}>
      {orbs.map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            width: `${60 + i * 20}px`,
            height: `${60 + i * 20}px`,
            borderRadius: "50%",
            background: `linear-gradient(135deg, 
              rgba(56, 178, 172, 0.1) 0%, 
              rgba(72, 187, 120, 0.1) 50%, 
              rgba(129, 230, 217, 0.1) 100%)`,
            filter: "blur(1px)",
            left: `${(i * 15) % 90}%`,
            top: `${(i * 20) % 80}%`,
          }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -100, 50, 0],
            scale: [1, 1.2, 0.8, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 15 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </Box>
  );
};

// Animated gradient waves
const AnimatedWaves = () => {
  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={-2}>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "100%",
          background:
            "linear-gradient(45deg, rgba(56, 178, 172, 0.05) 0%, rgba(129, 230, 217, 0.05) 50%, rgba(72, 187, 120, 0.05) 100%)",
        }}
        animate={{
          background: [
            "linear-gradient(45deg, rgba(56, 178, 172, 0.05) 0%, rgba(129, 230, 217, 0.05) 50%, rgba(72, 187, 120, 0.05) 100%)",
            "linear-gradient(90deg, rgba(72, 187, 120, 0.05) 0%, rgba(56, 178, 172, 0.05) 50%, rgba(129, 230, 217, 0.05) 100%)",
            "linear-gradient(135deg, rgba(129, 230, 217, 0.05) 0%, rgba(72, 187, 120, 0.05) 50%, rgba(56, 178, 172, 0.05) 100%)",
            "linear-gradient(45deg, rgba(56, 178, 172, 0.05) 0%, rgba(129, 230, 217, 0.05) 50%, rgba(72, 187, 120, 0.05) 100%)",
          ],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </Box>
  );
};

// 👇 get the current user from localStorage or your auth slice
const user = useSelector((state)=>state.auth.user);
  console.log(user);

const Todo = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  


  useEffect(() => {
    if (user?.uid) {
      dispatch(loadUserTasks(user.uid));
    }
  }, [user, dispatch]);

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
          import.meta.env.VITE_WEATHER_API_KEY
        }&units=metric`
      );
      setWeather(data);
    } catch (err) {
      setError("City not found or API error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
  if (!user) {
    console.error("User not found, cannot add task");
    return;
  }
  if (task.trim() === "") return;

  const newTask = {
    id: Date.now(),
    text: task,
    priority: priority || "Low",
    userId: user.uid,  
  };

  console.log("Dispatching:", newTask);
  dispatch(addTask(newTask));

  setTask("");
  setPriority("");
};


  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "linear-gradient(135deg, #FF6B6B 0%, #FF8E53 100%)";
      case "Medium":
        return "linear-gradient(135deg, #4ECDC4 0%, #44A08D 100%)";
      case "Low":
        return "linear-gradient(135deg, #A8E6CF 0%, #7FCDCD 100%)";
      default:
        return "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <Box
      minH="100vh"
      position="relative"
      bgGradient="linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)"
      p={4}
    >
      <AnimatedWaves />
      <FloatingOrbs />

      <MotionBox
        maxW="4xl"
        mx="auto"
        mt={14}
        p={8}
        borderRadius="3xl"
        bg="rgba(255, 255, 255, 0.95)"
        backdropFilter="blur(20px)"
        border="1px solid rgba(255, 255, 255, 0.2)"
        boxShadow="0 25px 50px rgba(0, 0, 0, 0.25)"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        zIndex={1}
      >
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Text
            fontSize="4xl"
            mb={6}
            fontWeight="bold"
            textAlign="center"
            bgGradient="to-r"
            gradientFrom={"teal.400"}
            gradientVia={"blue.500"}
            gradientTo={"purple.600"}
            bgClip="text"
          >
            ✨ Your Magical Tasks
          </Text>
          <Text
            fontSize="lg"
            color="gray.600"
            textAlign="center"
            mb={8}
            fontWeight="medium"
          >
            Welcome back, {user?.name} 🌟
          </Text>
        </motion.div>

        {/* Weather Section */}
        <MotionBox
          variants={itemVariants}
          p={6}
          borderRadius="2xl"
          bgGradient="to-r"
          gradientTo={"rgba(129, 230, 217, 0.1)"}
          gradientFrom={"rgba(56, 178,172, 0.1)"}
          // bg="linear-gradient(135deg, rgba(56, 178, 172, 0.1) 0%, rgba(129, 230, 217, 0.1) 100%)"
          border="1px solid rgba(56, 178, 172, 0.2)"
          mb={8}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4} color="teal.700">
            🌤️ Weather Check
          </Text>
          <HStack spacing={4}>
            <MotionInput
              value={city}
              onChange={(e) => setCity(e.target.value)}
              color={"GrayText"}
              placeholder="Enter city name..."
              bg="rgba(255, 255, 255, 0.8)"
              border="1px solid rgba(56, 178, 172, 0.3)"
              borderRadius="xl"
              _focus={{
                border: "2px solid",
                borderColor: "teal.400",
                boxShadow: "0 0 20px rgba(56, 178, 172, 0.3)",
              }}
              whileFocus={{ scale: 1.02 }}
            />
            <MotionButton
              onClick={fetchWeather}
              bgGradient={"to-r"}
              gradientFrom={"teal.400"}
              gradientTo={"teal.600"}
              color="white"
              borderRadius="xl"
              px={8}
              _hover={{
                bg: "to-r",
                gradientFrom: "teal.500",
                gradientTo: "teal.700",
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Weather
            </MotionButton>
          </HStack>

          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ marginTop: "16px", textAlign: "center" }}
            >
              <Spinner color="teal.500" size="lg" />
            </motion.div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Text color="red.500" mt={4} p={3} bg="red.50" borderRadius="xl">
                {error}
              </Text>
            </motion.div>
          )}

          {weather && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Box
                p={6}
                borderRadius="2xl"
                mt={4}
                bgGradient={"to-r"}
                gradientFrom={"rgba(56, 178, 172, 0.2)"}
                gradientTo={"rgba(129, 230, 217, 0.2)"}
                border="1px solid rgba(56, 178, 172, 0.3)"
              >
                <Text fontSize="2xl" color="teal.700" fontWeight="bold" mb={2}>
                  📍 {weather.name}, {weather.sys.country}
                </Text>
                <HStack spacing={6} wrap="wrap" color={"teal.500"}>
                  <Text fontSize="lg">🌡️ {weather.main.temp}°C</Text>
                  <Text fontSize="lg">🌦 {weather.weather[0].description}</Text>
                  <Text fontSize="lg">💨 Wind: {weather.wind.speed} m/s</Text>
                </HStack>
              </Box>
            </motion.div>
          )}
        </MotionBox>

        {/* Add Task Section */}
        <MotionBox
          variants={itemVariants}
          p={6}
          borderRadius="2xl"
          bgGradient="to-r"
          gradientFrom={"rgba(129, 230, 217, 0.1)"}
          gradientTo={"rgba(72, 187, 120, 0.1)"}
          border="1px solid rgba(72, 187, 120, 0.2)"
          mb={8}
        >
          <Text fontSize="xl" fontWeight="bold" mb={4} color="green.700">
            ➕ Create New Task
          </Text>
          <VStack spacing={4}>
            <HStack spacing={4} w="full">
              <MotionInput
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Enter a magical task..."
                flex={1}
                color={"gray.600"}
                bg="rgba(255, 255, 255, 0.8)"
                border="1px solid rgba(72, 187, 120, 0.3)"
                borderRadius="xl"
                _focus={{
                  border: "2px solid",
                  borderColor: "green.400",
                  boxShadow: "0 0 20px rgba(72, 187, 120, 0.3)",
                }}
                whileFocus={{ scale: 1.02 }}
              />
              <Box w="200px">
                <NativeSelect.Root
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  size="md"
                >
                  <NativeSelect.Field
                    placeholder="Select Priority"
                    color={"GrayText"}
                    bg="rgba(255, 255, 255, 0.8)"
                    border="1px solid rgba(72, 187, 120, 0.3)"
                    borderRadius="xl"
                    _focus={{
                      border: "2px solid",
                      borderColor: "green.400",
                    }}
                  >
                    <option value="High">🔥 High</option>
                    <option value="Medium">⚡ Medium</option>
                    <option value="Low">🟢 Low</option>
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
              </Box>
            </HStack>
            <MotionButton
              onClick={handleAddTask}
              bgGradient="to-r"
              gradientFrom="green.500"
              gradientTo="green.700"
              color="white"
              w="full"
              borderRadius="xl"
              h="12"
              fontSize="lg"
              fontWeight="semibold"
              _hover={{
                bgGradient: "to-r",
                gradientFrom: "green.600",
                gradientTo: "green.800",
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ✨ Add Magic Task
            </MotionButton>
          </VStack>
        </MotionBox>

        {/* Task List */}
        <MotionBox variants={itemVariants}>
          <Text fontSize="2xl" fontWeight="bold" mb={6} color="gray.700">
            📋 Your Task Universe
          </Text>
          <VStack spacing={4} align="stretch">
            {tasks &&
              tasks.map((t, index) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <MotionBox
                    p={6}
                    borderRadius="2xl"
                    bg="rgba(255, 255, 255, 0.9)"
                    border="1px solid rgba(255, 255, 255, 0.3)"
                    boxShadow="0 10px 30px rgba(0, 0, 0, 0.1)"
                    position="relative"
                    overflow="hidden"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 15px 40px rgba(0, 0, 0, 0.15)",
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {/* Priority indicator bar */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      h="4px"
                      bg={getPriorityColor(t.priority)}
                    />

                    <VStack align="start" spacing={3}>
                      <Text fontWeight="bold" fontSize="lg" color="gray.700">
                        📌 {t.text}
                      </Text>
                      <HStack>
                        <Box
                          px={3}
                          py={1}
                          borderRadius="full"
                          bg={getPriorityColor(t.priority)}
                          color="white"
                          fontSize="sm"
                          fontWeight="semibold"
                        >
                          {t.priority === "High"
                            ? "🔥"
                            : t.priority === "Medium"
                            ? "⚡"
                            : "🟢"}
                          {t.priority} Priority
                        </Box>
                      </HStack>
                      <MotionButton
                        bgGradient="to-r"
                        gradientFrom={"red.400"}
                        gradientTo={"red.600"}
                        color="white"
                        size="sm"
                        borderRadius="xl"
                        onClick={() =>
                          dispatch(deleteTask({ id: t.id, userId: user.uid }))
                        }
                        _hover={{
                          bgGradient: "to-r",
                          gradientFrom: "red.500",
                          gradientTo: "red.700",
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        🗑️ Delete Task
                      </MotionButton>
                    </VStack>
                  </MotionBox>
                </motion.div>
              ))}
          </VStack>

          {(!tasks || tasks.length === 0) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Box
                textAlign="center"
                py={12}
                borderRadius="2xl"
                bg="rgba(255, 255, 255, 0.5)"
                border="2px dashed rgba(156, 163, 175, 0.5)"
              >
                <Text fontSize="6xl" mb={4}>
                  🌟
                </Text>
                <Text fontSize="xl" color="gray.600" fontWeight="medium">
                  No tasks yet! Create your first magical task above.
                </Text>
              </Box>
            </motion.div>
          )}
        </MotionBox>
      </MotionBox>
    </Box>
  );
};

export default Todo;
