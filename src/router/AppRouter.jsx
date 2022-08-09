import { useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";

import Navbar from "../components/Navbar";
import { AuthContext } from "../context/AuthContext";
import Dashboard from "../pages/Dashboard";
import EditBlog from "../pages/EditBlog";
import Login from "../pages/Login";
import MyBlog from "../pages/MyBlogs";
import NewBlog from "../pages/NewBlog";
import Profile from "../pages/Profile";
import Register from "../pages/Register";
import View from "../pages/View";

const AppRouter = () => {
  const { currentUser } = useContext(AuthContext);
  function PrivateRouter() {
    return currentUser ? <Outlet /> : <Navigate to="/" replace />;
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />

        <Route path="/newblog" element={<PrivateRouter />}>
          <Route path="" element={<NewBlog />} />
        </Route>
        <Route path="/editblog" element={<PrivateRouter />}>
          <Route path="" element={<EditBlog />} />
        </Route>
        <Route path="/view" element={<PrivateRouter />}>
          <Route path="" element={<View />} />
        </Route>
        <Route path="/myblogs" element={<PrivateRouter />}>
          <Route path="" element={<MyBlog />} />
        </Route>
        <Route path="/profile" element={<PrivateRouter />}>
          <Route path="" element={<Profile />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
