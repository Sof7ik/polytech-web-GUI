import {createContext} from "react";

const authContext = createContext({
    loggedIn: false,
    loginHandler: () => {},
    apiKey: null
})

export default  authContext;