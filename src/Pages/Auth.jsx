import { loginUser, signUpUser, googleSignIn } from "../Redux/auth";
import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toaster } from "../components/ui/toaster";

const Bubble = motion(Box);

// Enhanced Bubbles with thumping effect
const BubblesBackground = () => {
  const bubbles = Array.from({ length: 12 });

  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={-1}>
      {bubbles.map((_, i) => (
        <Bubble
          key={i}
          position="absolute"
          borderRadius="full"
          bg={`${i % 3 === 0 ? "teal" : i % 3 === 1 ? "blue" : "purple"}.${
            300 + (i % 3) * 100
          }`}
          opacity={0.15 + (i % 3) * 0.05}
          width={`${25 + i * 12}px`}
          height={`${25 + i * 12}px`}
          left={`${(i * 8.5) % 95}%`}
          bottom="-120px"
          filter="blur(0.5px)"
          animate={{
            y: [0, -600 - i * 50, 0],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 8 + i * 0.8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </Box>
  );
};

// Moving Waves Background
const WavesBackground = () => {
  return (
    <Box position="absolute" inset="0" overflow="hidden" zIndex={-2}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", bottom: 0 }}
        animate={{
          x: [0, -50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.path
          fill="rgba(56, 178, 172, 0.1)"
          animate={{
            d: [
              "M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,117.3C672,107,768,117,864,138.7C960,160,1056,192,1152,181.3C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,213.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>

      <motion.svg
        width="120%"
        height="100%"
        viewBox="0 0 1440 320"
        style={{ position: "absolute", bottom: 0 }}
        animate={{
          x: [0, 50, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
          delay: -5,
        }}
      >
        <motion.path
          fill="rgba(72, 187, 120, 0.08)"
          animate={{
            d: [
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,208C672,213,768,203,864,181.3C960,160,1056,128,1152,138.7C1248,149,1344,203,1392,229.3L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
              "M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,133.3C672,139,768,181,864,197.3C960,213,1056,203,1152,181.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            ],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.svg>
    </Box>
  );
};

// Floating Particles
const FloatingParticles = () => {
  const particles = Array.from({ length: 20 });

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
            backgroundColor: `rgba(${56 + i * 10}, ${178 - i * 5}, ${
              172 + i * 3
            }, ${0.3 + (i % 3) * 0.2})`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.8,
          }}
        />
      ))}
    </Box>
  );
};

const Auth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/todo");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUpUser({ name, email, password })).then((result) => {
        if (!result.error) {
          toaster.create({
            description: `Welcome aboard ${name || "User"}`,
            type: "success",
            closable: true,
          });
          navigate("/todo");
        }else{
          toaster.create({
            description: result.error || "Signup failed ❌",
            type: "error",
            duration: 4000,
            closable: true,
          });
        }
      });
    } else {
      dispatch(loginUser({ email, password })).then((result) => {
        if (!result.error) {
          toaster.create({
            description: "Login Succesfull",
            type: "success",
            closable: true,
          });
          navigate("/todo");
        }else{
          toaster.create({
            description: result.error || "Login failed ❌",
            type: "error",
            duration: 4000,
            closable: true,
          });
        }
      });
    }
  };

  return (
    <Box
      position="relative"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="linear-gradient(135deg, rgba(56, 178, 172, 0.1) 0%, rgba(129, 230, 217, 0.1) 50%, rgba(79, 172, 254, 0.1) 100%)"
      overflow="hidden"
    >
      {/* Animated Backgrounds */}
      <WavesBackground />
      <BubblesBackground />
      <FloatingParticles />

      {/* Auth Form with enhanced animation */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Box
          maxW="md"
          mx="auto"
          p={12}
          boxShadow="2xl"
          borderRadius="3xl"
          bg="rgba(255, 255, 255, 0.95)"
          backdropFilter="blur(20px)"
          border="1px solid rgba(255, 255, 255, 0.2)"
          zIndex={1}
        >
          <motion.div
            animate={{
              textShadow: [
                "0 0 10px rgba(56, 178, 172, 0.5)",
                "0 0 20px rgba(56, 178, 172, 0.8)",
                "0 0 10px rgba(56, 178, 172, 0.5)",
              ],
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <Heading size="lg" textAlign="center" mb={4} color={"teal.600"}>
              {isSignup ? "Sign Up" : "Login"}
            </Heading>
          </motion.div>

          {/* Email & Password Form */}
          <VStack as="form" onSubmit={handleSubmit} spacing={4}>
            {isSignup && (
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                style={{ width: "100%" }}
              >
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  bg="rgba(255, 255, 255, 0.8)"
                  border="1px solid rgba(56, 178, 172, 0.3)"
                  color={"blackAlpha.800"}
                  _focus={{
                    border: "2px solid teal.400",
                    boxShadow: "0 0 15px rgba(56, 178, 172, 0.3)",
                  }}
                />
              </motion.div>
            )}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isSignup ? 0.3 : 0.2 }}
              style={{ width: "100%" }}
            >
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                bg="rgba(255, 255, 255, 0.8)"
                border="1px solid rgba(56, 178, 172, 0.3)"
                color={"blackAlpha.800"}
                _focus={{
                  border: "2px solid teal.400",
                  boxShadow: "0 0 15px rgba(56, 178, 172, 0.3)",
                }}
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: isSignup ? 0.4 : 0.3 }}
              style={{ width: "100%" }}
            >
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                bg="rgba(255, 255, 255, 0.8)"
                border="1px solid rgba(56, 178, 172, 0.3)"
                color={"blackAlpha.800"}
                _focus={{
                  border: "2px solid teal.400",
                  boxShadow: "0 0 15px rgba(56, 178, 172, 0.3)",
                }}
              />
            </motion.div>
            {error && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ width: "100%" }}
              >
                <Text color="red.500">{error}</Text>
              </motion.div>
            )}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{ width: "100%" }}
            >
              <Button
                type="submit"
                bgGradient={"to-r"}
                gradientFrom="teal.400"
                gradientTo="teal.600"
                color="whiteAlpha.900"
                isLoading={loading}
                _hover={{
                  bgGradient: "to-r",
                  gradientFrom: "pink.400",
                  gradientTo: "pink.600",
                  boxShadow: "0 8px 25px rgba(56, 178, 172, 0.4)",
                }}
                w="full"
                borderRadius="xl"
                h="12"
                fontSize="md"
                fontWeight="semibold"
              >
                {isSignup ? "Sign Up" : "Login"}
              </Button>
            </motion.div>
          </VStack>

          {/* Toggle Signup/Login */}
          <motion.div whileHover={{ scale: 1.05 }}>
            <Text
              mt={4}
              textAlign="center"
              textStyle={"sm"}
              color={"gray.500"}
              cursor="pointer"
              onClick={() => setIsSignup(!isSignup)}
              _hover={{ color: "teal.500" }}
              transition="color 0.3s ease"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </Text>
          </motion.div>

          {/* Google Sign-In */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{ width: "100%", marginTop: "16px" }}
          >
            <Button
              color="blue.600"
              variant="outline"
              w="full"
              shadow={"lg"}
              onClick={() =>
                dispatch(googleSignIn()).then((result) => {
                  if (!result.error) {
                    toaster.create({
                      description: "Logged in with Google",
                      type: "success",
                      duration: 4000,
                      closable: true,
                    });
                    navigate("/todo");
                  }else{
                    toaster.create({
            description: result.error || "SignIn failed ❌",
            type: "error",
            duration: 4000,
            closable: true,
          });
                  }
                })
              }
              isLoading={loading}
              _hover={{
                color: "white",
                bgGradient: "to-r",
                gradientFrom: "blue.400",
                gradientTo: "blue.700",
                border: "none",
                boxShadow: "0 8px 25px rgba(59, 130, 246, 0.4)",
              }}
              borderRadius="xl"
              h="12"
              border="2px solid"
              borderColor="blue.200"
              bg="rgba(255, 255, 255, 0.8)"
              fontSize="md"
              fontWeight="semibold"
            >
              <FcGoogle />
              Sign in with Google
            </Button>
          </motion.div>
        </Box>
      </motion.div>
    </Box>
  );
};

export default Auth;
