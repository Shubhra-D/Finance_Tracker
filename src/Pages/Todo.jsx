import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, deleteTask } from "../Redux/task";
import { Box, Button, Input, Text, VStack, HStack, Select, Spinner, NativeSelect } from "@chakra-ui/react";
import axios from "axios";


const Todo = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("");
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
      );
      setWeather(data);
    } catch (err) {
      setError("City not found or API error");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

// Fetch weather when the component mounts or when the city changes
useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleAddTask = () => {
    if (task.trim() === "") return;
    dispatch(addTask({ id: Date.now(), text: task, priority }));
    setTask("");
  };

  return (
    <Box maxW="lg" mx="auto" mt={10} p={6} boxShadow="lg" borderRadius="md" bg="white">
      <Text fontSize="2xl" mb={4} fontWeight={'bold'}>Your Tasks</Text>
      
      <HStack>
        <Input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name..."
        />
        <Button onClick={fetchWeather} bg={'teal.400'} color="whiteAlpha.900">Get Weather</Button>
      </HStack>
      
      {loading && <Spinner />}
      {error && <Text color="red.500">{error}</Text>}
      {weather && (
        <Box p={4} borderWidth={1} borderRadius="md" mt={4} bg={'teal.300'}>
          <Text fontSize="xl" color={'teal.700'} fontWeight={'bold'}>{weather.name}, {weather.sys.country}</Text>
          <Text>🌡️ {weather.main.temp}°C</Text>
          <Text>🌦 {weather.weather[0].description}</Text>
          <Text>💨 Wind Speed: {weather.wind.speed} m/s</Text>
        </Box>
      )}

      <HStack mt={6}>
        <Input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter a task..."
        />
        <NativeSelect.Root value={priority} onChange={(e) => setPriority(e.target.value)} size="md">
          <NativeSelect.Field placeholder="Select Priority">
          <option value="High">🔥High</option>
          <option value="Medium">⚡Medium</option>
          <option value="Low">🟢Low</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator/>
        </NativeSelect.Root>
        <Button onClick={handleAddTask} bg="teal.400" color="whiteAlpha.900">Add</Button>
      </HStack>

      <Box mt={4} spacing={2}>
        {tasks && tasks.map((t) => (
          <Box key={t.id} p={3} mt={3} boxShadow="md" bg="teal.300" borderRadius="md">
            <VStack align="start">
              <Text fontWeight="bold" color="teal.700">📌 {t.text}</Text>
              <Text color="whiteAlpha.900">  {t.priority === "High" ? "🔥" : t.priority === "Medium" ? "⚡" : "🟢"} Priority: {t.priority}</Text>
              <Button color="whiteAlpha.950" bg="red.500" size="sm" onClick={() => dispatch(deleteTask(t.id))}>
                🗑️ Delete
              </Button>
            </VStack>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Todo;