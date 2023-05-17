import ModalWindow from "../ModalWindow";
import {useContext, useEffect, useState} from "react";
import AuthContext from "../../context/auth.context";
import styles from "./login.module.css";

export default function LoginModal({opened, closeHandler}) {
    // console.log("LoginModal");

    const {isLogged, loginHandler, apiKey} = useContext(AuthContext);

    const [inputValue, setInputValue] = useState("");

    const onInputChange = (event) => {
        const value = event.currentTarget.value;
        setInputValue(value);
    }

    async function login(event) {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", inputValue);

        const resp = await fetch(`http://localhost:8000/api/v3/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "name": inputValue
            }),
        });
        if (resp.status === 200) {
            const data = await resp.json();

            // Authorize user
            loginHandler({
                isLogged: true,
                apiKey: data.apiKey
            });

            closeHandler(false);
        }
    }

    return (
        <ModalWindow opened={opened}
                     closeHandler={closeHandler}
                     title="Авторизация">
            <form action="" onSubmit={login} className={styles.loginForm}>
                <div className={`input-wrapper`}>
                    <label htmlFor="user-name">Введите свой логин:</label>
                    <input type="text"
                           id="user-name"
                           value={inputValue}
                           onChange={onInputChange}/>
                </div>

                <button type="submit" className="btn green">
                    Войти
                </button>
            </form>
        </ModalWindow>
    )
}