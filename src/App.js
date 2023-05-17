import './App.css';
import React, {useState} from "react";
import {RouterProvider, createBrowserRouter, BrowserRouter} from "react-router-dom";

// Components
import MainPage, {loader as modelsLoader} from "./components/Mainpage";
import DetailModel, {loader as modelDetailLoader} from "./components/DetailModel";
import ErrorPage from "./components/404";
import AuthContext from "./context/auth.context";

const router = createBrowserRouter([
    {
        path: "/",
        id: "root",
        element: <MainPage />,
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

function getContextDataFormLocalStorage() {
    const data = JSON.parse(localStorage.getItem("authContext"));
    let returnResult = {};

    if (!data) {
        returnResult = {
            isLogged: false,
            apiKey: null
        }
    }
    else {
        returnResult = data;
    }

    return returnResult;
}

function App() {
    // console.log("App")

    const localStorageAuthContext = getContextDataFormLocalStorage();

    const [authContextData, setAuthContextData] = useState({
        isLogged: localStorageAuthContext.isLogged,
        apiKey: localStorageAuthContext.apiKey
    });

    function setLocalStorageAuthContext(newState) {
        localStorage.setItem("authContext", JSON.stringify(newState));

        setAuthContextData(newState);
    }

    const contextDefaultValue = {
        loggedIn: authContextData.isLogged,
        loginHandler: setLocalStorageAuthContext,
        apiKey: authContextData.apiKey,
    }

    return (
        <AuthContext.Provider value={ contextDefaultValue } >
            <RouterProvider router={router} />
        </AuthContext.Provider>
    );
}

export default App;
