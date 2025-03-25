import { Box, Button, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Box
        height={"100vh"}
        textAlign="center"
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        flexDirection={"column"}
        p={8}
        bg="teal.100"
        boxShadow="lg"
        borderRadius="md"
      >
        <Heading fontSize="2xl" color="teal.600" m={5}>
          Welcome to To-Do App
        </Heading>
        <Text color={"gray.400"}>
          Track your Daily task with our refined Todo app{" "}
        </Text>
        <Text color={"gray.400"} p={3}>
          Create your account{" "}
        </Text>
        <Button
          as={Link}
          to="/signup"
          bg={"teal.400"}
          variant="outline"
          color={"whiteAlpha.900"}
        >
          Sign Up
        </Button>
      </Box>
    </motion.div>
  );
};

export default Home;
