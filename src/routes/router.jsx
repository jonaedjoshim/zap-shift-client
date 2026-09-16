import { createBrowserRouter } from "react-router-dom";

import AuthLayout from "../layouts/AuthLayout";
import DashboardLayout from "../layouts/DashboardLayout";
import RootLayout from "../layouts/RootLayout";

import AboutUs from "../pages/AboutUs/AboutUs";
import ForgotPassword from "../pages/Authentication/ForgotPassword/ForgotPassword";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Coverage from "../pages/Coverage/Coverage";
import DashboardHome from "../pages/Dashboard/DashboardHome";
import MyParcels from "../pages/Dashboard/MyParcels/MyParcels";
import PaymentPage from "../pages/Dashboard/Payment/PaymentPage";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home/Home";
import Pricing from "../pages/Pricing/Pricing";
import SendParcel from "../pages/Send Parcel/SendParcel";
import TrackConsignment from "../pages/TrackConsignment/TrackConsignment";

import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "about",
                element: <AboutUs />,
            },
            {
                path: "coverage",
                element: <Coverage />,
            },
            {
                path: "pricing",
                element: <Pricing />,
            },
            {
                path: "track-consignment",
                element: <TrackConsignment />,
            },
            {
                path: "sendParcel",
                element: (
                    <PrivateRoute>
                        <SendParcel />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            {
                path: "signin",
                element: <SignIn />,
            },
            {
                path: "signup",
                element: <SignUp />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
        ],
    },
    {
        path: "/dashboard",
        element: (
            <PrivateRoute>
                <DashboardLayout />
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                element: <DashboardHome />,
            },
            {
                path: "my-parcels",
                element: <MyParcels />,
            },
            {
                path: "payment/:parcelId",
                element: <PaymentPage />,
            },
        ],
    },
    {
        path: "*",
        element: <ErrorPage />,
    },
]);