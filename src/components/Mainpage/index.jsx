import styles from "./mainpage.module.css";
import {useContext, useState} from "react";
import Header from "../Header";
import AuthContext from "../../context/auth.context";
import ModelsList from "../ModelsList";
import AddModelWrapper from "../AddModelWrapper";

export default function MainPage() {
    const authContext = useContext(AuthContext);
    // const [modelsListNeedRerender, setModelsListRerender] = useState(false);

    // modelsListRerenderHandler={setModelsListRerender}

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