import { createBrowserRouter } from "react-router-dom";
import Home from '../pages/Home/Home/Home'
import MainLayout from "../layouts/MainLayout";
import SignUp from "../pages/SignUp/SignUp";
import Login from "../pages/Login/Login";
import Profile from "../pages/dashboard/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import TeachOn from "../pages/dashboard/TeachOn/TeachOn";
import AdminRoute from "./AdminRoute";
import TeacherRequests from "../pages/dashboard/TeacherRequests/TeacherRequests";
import UpdateTeachOn from "../pages/dashboard/TeachOn/UpdateTeachOn";
import Users from "../pages/dashboard/Dashboard/Users/Users";
import AddClass from "../pages/dashboard/Dashboard/Classes/AddClass";
import TeacherRoute from "./TeacherRoute";
import MyClasses from "../pages/dashboard/Dashboard/Classes/MyClasses";
import DashboardLayout from "../layouts/DashboardLayout";
import UpdateClass from "../pages/dashboard/Dashboard/Classes/UpdateClass/UpdateClass";
import AllClassRequests from "../pages/dashboard/Dashboard/Classes/AllClassRequests";
import AllClasses from "../pages/dashboard/Dashboard/Classes/AllClasses";
import AddPhone from "../pages/dashboard/Profile/AddPhone";
import MyClassProgressDetails from "../pages/dashboard/Dashboard/Classes/MyClassProgressDetails";
import ClassDetails from "../pages/dashboard/Dashboard/Classes/ClassDetails";
import ClassProgressDetails from "../pages/dashboard/Dashboard/Classes/ClassProgressDetails";
import Payment from "../pages/dashboard/Payment/Payment";
import Cart from "../pages/dashboard/Cart/Cart";


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
                path: "classes",
                element: <AllClasses/>
            },           
            {
                path: "class/:id",
                element: <PrivateRoute><ClassDetails/></PrivateRoute>
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
        element: <PrivateRoute><DashboardLayout/> </PrivateRoute> ,
        children: [
            // c
            {
                path: 'profile',
                element: <Profile />
            },                     
            {
                path: 'add-phone/:id',
                element: <AddPhone/>
            },                     
            {
                path: 'update-teacher-request',
                element: <UpdateTeachOn/>
            },            
            {
                path: 'payment/:id',
                element: <Payment/>
            }, 
            {
                path: 'cart',
                element: <Cart/>
            }, 

            // teacher routes
            {
                path:'add-class',
                element: <TeacherRoute><AddClass/></TeacherRoute>
            },                   
            {
                path:'my-class',
                element: <TeacherRoute><MyClasses/> </TeacherRoute>
            },
            {
                path:'my-class/:id',
                element: <TeacherRoute><MyClassProgressDetails/> </TeacherRoute>
            },
            {
                path:'update-class/:id',
                element: <TeacherRoute><UpdateClass/> </TeacherRoute>
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
            {
                path: 'all-classes',
                element: <AdminRoute><AllClassRequests /> </AdminRoute>
            },                     
            {
                path: 'class-progress/:id',
                // TODO: need to add the component
                element: <AdminRoute><ClassProgressDetails/> </AdminRoute>
            },                     
                                 
                     
            
        ]
    }
]);