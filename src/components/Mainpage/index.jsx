import styles from "./mainpage.module.css";
import Header from "../Header";
import ModelsList from "../ModelsList";

export default function MainPage() {
    return (
        <>
            <Header />

            <main>
                <div className="container">
                    <section className={styles.mainpageSection}>
                        <ModelsList />
                    </section>
                </div>
            </main>
        </>
    )
}