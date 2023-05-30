import logo from "../../logos/mospolytech-logo-white.svg";
import styles from "./header.module.css";
import {useContext, useState} from "react";
import AuthContext from "../../context/auth.context";
import LoginModal from "../Login";

export default function Header(props) {
    const authContext = useContext(AuthContext);

    const [loginModalOpened, setLoginModalOpened] = useState(false);

    function onLoginBtnClick(e) {
        setLoginModalOpened(prevState => !prevState);
    }

    function onLogoutBtnClick(e) {
        authContext.loginHandler(false);
    }

    return (
        <>
            <header>
                <div className="container">
                    <div className={styles.headerInnerWrapper}>
                        <img src={logo} alt="Логотип" className={styles.headerLogo}/>

                        <div className={styles.headerButtons}>
                            {
                                !authContext.loggedIn ?
                                    <button className="btn green" onClick={onLoginBtnClick}>Войти</button> :
                                    <button className="btn red" onClick={onLogoutBtnClick}>Выйти</button>
                            }

                        </div>
                    </div>
                </div>
            </header>

            <LoginModal opened={loginModalOpened} closeHandler={onLoginBtnClick}/>
        </>
    );
}