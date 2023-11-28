import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home/Home'
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/dashboard/Dashboard/Dashboard";
import Profile from "../pages/dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import TeachOn from "../pages/dashboard/TeachOn/TeachOn";
import AdminRoute from "./AdminRoute";
import TeacherRequests from "../pages/dashboard/TeacherRequests/TeacherRequests";
import UpdateTeachOn from "../pages/dashboard/TeachOn/UpdateTeachOn";
import Users from "../pages/dashboard/Dashboard/Users/Users";
import AddClass from "../pages/dashboard/Dashboard/AddClass/AddClass";
import TeacherRoute from "./TeacherRoute";



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
            {
                path: 'update-teacher-request',
                element: <UpdateTeachOn/>
            },  
            // teacher routes
            {
                path:'add-class',
                element: <TeacherRoute><AddClass/></TeacherRoute>
            },                   
            // admin routes  
            {
                path: 'teacher-request',
                element: <AdminRoute><TeacherRequests/> </AdminRoute>
            },                     
            {
                path: 'users',
                element: <AdminRoute><Users/> </AdminRoute>
            },                     
                                 
                     
            
        ]
    }
]);