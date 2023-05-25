import styles from "./mainpage.module.css";
import {useContext} from "react";
import Header from "../Header";
import AuthContext from "../../context/auth.context";
import ModelsList from "../ModelsList";
import AddModelWrapper from "../AddModelWrapper";

export default function MainPage() {
    const authContext = useContext(AuthContext);

    return (
        <>
            <Header />

            <main>
                <div className="container">
                    <section className={styles.mainpageSection}>
                        <div className={styles.titleButtonWrapper}>
                            <h1 className={styles.mainPageTitle}>Список моделей</h1>

                            { authContext.loggedIn ? <AddModelWrapper /> : "" }
                        </div>

                        <ModelsList />
                    </section>
                </div>
            </main>
        </>
    )
}

export async function loader() {
    const response = await fetch(`http://localhost:8000/api/v3/models`);
    return await response.json();
}