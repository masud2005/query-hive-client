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

const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/queries',
                element: <Queries />,
                loader: () => fetch('http://localhost:5000/queries')
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
                element: <QueryDetails />,
                loader: ({ params }) => fetch(`http://localhost:5000/queries/${params.id}`)
            },
            {
                path: '/update-query/:id',
                element: <UpdateQuery />,
                loader: ({ params }) => fetch(`http://localhost:5000/queries/${params.id}`)
            },
            {
                path: '/my-recommendations',
                element: <PrivateRoute>
                    <MyRecommendations />
                </PrivateRoute>
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