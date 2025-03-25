import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../Redux/task";
import {
  Box,
  Button,
  Input,
  Text,
  VStack,
  HStack,
  NativeSelect,
} from "@chakra-ui/react";
import axios from "axios";

const Todo = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const { data } = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=1352225ab2b1c7d764846066d2248fed&units=metric`
        );
        setWeather(data.main.temp);
      } catch (error) {
        console.error("Weather API Error", error);
      }
    };
    fetchWeather();
  }, []);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    dispatch(addTask({ id: Date.now(), text: task, priority }));
    setTask("");
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      mt={10}
      p={6}
      boxShadow="lg"
      borderRadius="md"
      bg="white"
    >
      <Text fontSize="2xl" mb={4}>
        Your Tasks
      </Text>

      {weather && (
        <Text fontSize="md" mb={4} color="teal.500">
          Current Weather: {weather}°C
        </Text>
      )}

      <HStack>
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <NativeSelect.Root
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          size={"md"}
        >
          <NativeSelect.Field placeholder="Select Priority">
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
        <Button onClick={handleAddTask} bg={"teal.400"} color="whiteAlpha.900">
          Add
        </Button>
      </HStack>

      <Box mt={4} spacing={2} margin={"4"}>
        {tasks.map((t) => (
          <Box
            key={t.id}
            margin={"6"}
            boxShadow={"md"}
            bg={"teal.300"}
            borderRadius={"2xl"}
          >
            <VStack justify="space-between" p={2} borderBottom="1px solid #ccc">
              <Text fontWeight={"bold"} color={"teal.700"}>
                📌📌{t.text}{" "}
              </Text>
              <Text color={"whiteAlpha.900"}>Priority: {t.priority}</Text>
              <Button
                color="whiteAlpha.950"
                bg={"red.500"}
                size="sm"
                onClick={() => dispatch(deleteTask(t.id))}
              >
               🗑️Delete
              </Button>
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Todo;
