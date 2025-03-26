import { loginUser, signUpUser, googleSignIn } from "../Redux/auth";
import { Box, Button, Heading, Input, Text, VStack, } from "@chakra-ui/react";
import { FcGoogle } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
 const [name,setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    if(user){
      navigate("/todo")
    }
  },[user,navigate])
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signUpUser({name, email, password })).then((result)=>{
        if (!result.error) {
          navigate("/todo"); 
        }
      });
    } else {
      dispatch(loginUser({ email, password })).then((result)=>{
        if (!result.error) {
          navigate("/todo"); 
        }
      });
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Heading size="lg" textAlign="center" mb={4}>
        {isSignup ? "Sign Up" : "Login"}
      </Heading>
      
      {/* Email & Password Form */}
      <VStack as="form" onSubmit={handleSubmit} spacing={4}>
      <Input
          type="name"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Text color="red.500">{error}</Text>}
        <Button type="submit" bg="teal.400" color="whiteAlpha.900" isLoading={loading}>
          {isSignup ? "Sign Up" : "Login"}
        </Button>
      </VStack>

      {/* Toggle Signup/Login */}
      <Text mt={4} textAlign="center" color={'gray.400'} cursor="pointer" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </Text>

      {/* Google Sign-In */}
      <Button
        colorScheme="blue"
        variant="outline"
        w="full"
        margin={3}
        onClick={() => dispatch(googleSignIn())}
        isLoading={loading}
      >
       <FcGoogle /> Sign in with Google
      </Button>
    </Box>
  );
};

export default Auth;
