import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layout/Layout";
import Home from "../page/Home";
import Login from "../page/Login";
import Signup from "../page/Signup";
import Profile from "../page/Profile";
import Test from "../page/Test";
import TestResultList from "../page/TestResultList";

function AppRoutes() {
  return (
    <>
      <UserProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />} />
                <Route path="/test" element={<Test />} />
                <Route path="/list" element={<TestResultList />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </>
  );
}

export default AppRoutes;
