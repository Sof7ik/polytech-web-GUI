import './App.css';
import React from "react";
import {RouterProvider, createBrowserRouter} from "react-router-dom";

// Components
import Mainpage, {loader as modelsLoader} from "./components/Mainpage";
import DetailModel, {loader as modelDetailLoader} from "./components/DetailModel";
import ErrorPage from "./components/404";

const router = createBrowserRouter([
    {
        path: "/",
        id: "root",
        element: <Mainpage />,
        errorElement: <ErrorPage />,
        loader: modelsLoader,
    },
    {
        path: "/models/:id",
        id: "modelDetail",
        element: <DetailModel />,
        errorElement: <ErrorPage />,
        loader: modelDetailLoader,
    },
]);


function App() {
    return (
        <div className="container">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
