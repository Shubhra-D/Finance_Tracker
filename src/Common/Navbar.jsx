import { useColorMode } from "@/components/ui/color-mode";
import { logoutUser } from "../Redux/auth";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { FaLaptop, FaMoon, FaSun } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  //  Chakra’s built-in hook (not custom import)
  const { colorMode, toggleColorMode } = useColorMode();

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  //  Hide on scroll logic
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Box
      position="fixed"
      top={show ? "0" : "-80px"} // hide/reveal on scroll
      left="0"
      right="0"
      transition="top 0.3s ease-in-out"
      bg={colorMode === "light" ? "whiteAlpha.700" : "blackAlpha.700"}
      backdropFilter="blur(12px)"
      px={5}
      py={3}
      boxShadow="md"
      zIndex="1000"
      borderBottom="1px solid"
      borderColor={colorMode === "light" ? "gray.200" : "whiteAlpha.200"} // subtle border
    >
      <Flex alignItems="center">
        <FaLaptop size={22} />
        <Heading
          fontSize="2xl"
          ml={2}
          fontWeight="bold"
          color={colorMode === "light" ? "black" : "white"}
        >
          <Link to={'/'}>  To-Do 📝</Link>
        
        </Heading>
        <Spacer />

        {user ? (
          <Flex align="center" gap={4}>
            <Text fontWeight="bold">
              {user.displayName || user?.email.split("@")[0] || "User"}
            </Text>
            <Button colorScheme="red" onClick={handleLogout}>
              Logout
            </Button>
          </Flex>
        ) : (
          <Flex gap={4}>
            <Button as={Link} to="/signup" colorScheme="teal" variant="outline">
              Sign Up
            </Button>
            <Button as={Link} to="/login" colorScheme="teal" variant="solid">
              Login
            </Button>
          </Flex>
        )}

        {/*  Dark / Light mode toggle */}
        <Button
          onClick={toggleColorMode}
          size="sm"
          variant="outline"
          border={'none'}
          px={4}
          color={colorMode === "light" ? "black" : "white"}
          _hover={{
            size:"lg",
            bg:"none"
          }}
        >
          {colorMode === "light" ? <FaMoon/> : <FaSun/>}
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
