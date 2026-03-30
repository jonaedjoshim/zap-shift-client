import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AuthLayout from "../layouts/AuthLayout";
import SignIn from "../pages/Authentication/SignIn/SignIn";
import SignUp from "../pages/Authentication/SignUp/SignUp";
import Coverage from "../pages/Coverage/Coverage";
import AboutUs from "../pages/AboutUs/AboutUs";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/Send Parcel/SendParcel";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'about',
                element: <AboutUs />
            },
            {
                path: 'coverage',
                element: <Coverage />
            },
            {
                path: 'sendParcel',
                element: (
                    <PrivateRoute>
                        <SendParcel />
                    </PrivateRoute>
                )
            }
        ]
    },
    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: 'signin',
                element: <SignIn />
            },
            {
                path: 'signup',
                element: <SignUp />
            },
        ]
    },
    {
        path: '*',
        element: <ErrorPage />
    }
]);