import { createBrowserRouter } from "react-router-dom";
import HomeLayout from "../layouts/HomeLayout";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Queries from "../pages/Queries";
import Register from "../pages/Register";
import RecommendationsForMe from "../pages/RecommendationsForMe";
import MyQueries from "../pages/MyQueries";
import MyRecommendations from "../pages/MyRecommendations";
import PrivateRoute from "./PrivateRoute";
import AddQuery from "../pages/AddQueries";
import QueryDetails from "../pages/queryDetails";
import UpdateQuery from "../pages/UpdateQuery";
import ErrorPage from "../pages/ErrorPage";
import AboutUs from "../pages/AboutUs";

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/queries',
                element: <Queries />,
                loader: () => fetch('https://ask-and-recommend-server.vercel.app/queries')
            },
            {
                path: '/recommendations-for-me',
                element: <PrivateRoute>
                    <RecommendationsForMe />
                </PrivateRoute>
            },
            {
                path: '/my-queries',
                element: <PrivateRoute>
                    <MyQueries />
                </PrivateRoute>
            },
            {
                path: '/add-query',
                element: <PrivateRoute>
                    <AddQuery />
                </PrivateRoute>
            },
            {
                path: '/details/:id',
                element: <PrivateRoute>
                    <QueryDetails />
                </PrivateRoute>,
                loader: ({ params }) => fetch(`https://ask-and-recommend-server.vercel.app/queries/${params.id}`)
            },
            {
                path: '/update-query/:id',
                element: <UpdateQuery />,
                loader: ({ params }) => fetch(`https://ask-and-recommend-server.vercel.app/queries/${params.id}`)
            },
            {
                path: '/my-recommendations',
                element: <PrivateRoute>
                    <MyRecommendations />
                </PrivateRoute>
            },
            {
                path: '/about-us',
                element: <AboutUs />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
        ]
    }
])

export default router;