import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import AddItem from "./Pages/AddItem";
import Dashboard from "./Pages/Dashboard";
import FoodItems from "./Pages/FoodItems";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import UpdateItem from "./Pages/UpdateItem";

const App: React.FC = () => {
  return (
    <>
      <Router>
        <div className="my-0 mx-auto max-w-5xl w-full text-center py-0 px-5">
          <Header />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/:cat" element={<FoodItems />} />
            <Route path="/:cat/update/:id" element={<UpdateItem />} />
            <Route path="/:cat/add" element={<AddItem />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
