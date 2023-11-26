import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home/Home'
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import TeachOn from "../pages/dashboard/TeachOn/TeachOn";



export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />
            },           
            {
                path: "signup",
                element: <SignUp />
            },           
            {
                path: "login",
                element: <Login />
            },
            {
                path: 'teach-on',
                element: <PrivateRoute><TeachOn/></PrivateRoute>
            }           
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute> ,
        children: [
            {
                path: 'profile',
                element: <Profile />
            },                     
                     
            
        ]
    }
]);