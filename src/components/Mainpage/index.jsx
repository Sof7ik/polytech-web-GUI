import styles from "./mainpage.module.css";
import {Link, useLoaderData} from "react-router-dom";
import {useContext, useState,} from "react";
import ModalWindow from "../ModalWindow";
import Header from "../Header";
import AuthContext from "../../context/auth.context";
import ModelsList from "../ModelsList";

let modalOpened, setModalState;

export default function MainPage() {
    const authContext = useContext(AuthContext);

    [modalOpened, setModalState] = useState(false);

    return (
        <>
            <Header />

            <main>
                <div className="container">
                    <section className={styles.mainpageSection}>
                        <div className={styles.titleButtonWrapper}>
                            <h1 className={styles.mainPageTitle}>Список моделей</h1>

                            {
                                authContext.loggedIn ?
                                    <button className={`${styles.addModelBtn} btn green`}
                                            data-opened={modalOpened}
                                            onClick={addModelModalHandler}>
                                        Добавить модель
                                    </button>
                                : ""
                            }
                        </div>

                        <ModelsList />
                    </section>
                </div>
            </main>

            <ModalWindow opened={modalOpened}
                         closeHandler={addModelModalHandler}
                            title="Добавить новую модель">
            </ModalWindow>
        </>
    )
}

export async function loader() {
    const response = await fetch(`http://localhost:8000/api/v3/models`);
    return await response.json();
}

function addModelModalHandler(event) {
    const btn = event.currentTarget;
    console.log(btn);

    setModalState(prevState => !prevState);
}