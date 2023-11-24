import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home/Home'
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";



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
        ]
    },
]);