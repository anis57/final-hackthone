import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./pages/Authentication/Login/Login";
import Signup from "./pages/Authentication/Signup/Signup";
import ForgotPassword from "./pages/Authentication/forgotPassword/ForgotPassword";
import ResetPassword from "./pages/Authentication/ResetPassword/ResetPassword";
import Home from "./pages/Home/Home";
import { ToastContainer } from 'react-toastify';
import DashboardLayout from "./Components/DashboardLayout/DashboardLayout";
import Dashboard from "./pages/Dashboard/Dashboard";
import ApplicationForm from "./pages/Dashboard/ApplicationForm";
import AllApplication from "./pages/Dashboard/AllApplication";

const App = () => {

  const Router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login />
        },
        {
          path: 'signup',
          element: <Signup />
        },
        {
          path: 'forgotPassword',
          element: <ForgotPassword />
        },
        {
          path: 'resetPassword/:token',
          element: <ResetPassword />
        },
        {
          path: '/dashboard',
          element: <DashboardLayout />,
          children: [
            {
              path: '/dashboard',
              element: <ApplicationForm />
            },
            {
              path: 'applicationform',
              element: <ApplicationForm />
            },
            {
              path: 'allApplication',
              element: <AllApplication />
            },
          ]
        },
      ]
    }
  ]);

  return (
    <>
      <RouterProvider router={Router} />
      <ToastContainer />
    </>
  )
}

export default App;
