import axios from "axios";

type User = {
  name?: string;
  email: string;
  password: string;
};
//Register user

const register = async (userData: User | any) => {
  const response = await axios.post("/api/users/", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Login user
const login = async (userData: User) => {
  const response = await axios.post("/api/users/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  localStorage.removeItem("user");
};

const authService = {
  register,
  logout,
  login,
};

export default authService;
