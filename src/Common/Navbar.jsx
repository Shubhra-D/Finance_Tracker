import { logoutUser } from "../Redux/auth";
import { Box, Button, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import React from "react";
import { FaLaptop } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };
  return (
    <Box bg="teal.500" px={5} py={3} boxShadow="md" position={"sticky"}>
      <Flex alignItems="center">
        <FaLaptop />
        <Heading fontSize={"2xl"} color="white" fontWeight={"bold"}>
          To-Do📝
        </Heading>
        <Spacer />
        {user ? (
          <Flex align="center" gap={4}>
            <Text fontWeight="bold">{user.displayName || user?.email.split("@")[0]||"User"}</Text>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex gap={4}>
            <Button
              as={Link}
              to="/signup"
              colorScheme="teal"
              variant="outline"
              color={"whiteAlpha.800"}
            >
              Sign Up
            </Button>
            <Button
              as={Link}
              to="/login"
              bg={"whiteAlpha.900"}
              color={"blackAlpha.900"}
              borderColor={"teal.900"}
              colorScheme="teal"
              variant="solid"
            >
              Login
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Navbar;
