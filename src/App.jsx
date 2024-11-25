// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./page/Home";
// import Detail from "./page/Detail";
import Login from "./page/Login";
import Signup from "./page/Signup";
import Layout from "./layout/Layout";
import { UserProvider } from "./context/UserContext";
// import ProtectedRoute from "./router/ProtectedRoute";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              {/* <Route path="/feeds/:id" element={<Detail />} /> */}
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}
export default App;
