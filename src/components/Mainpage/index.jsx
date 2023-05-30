import styles from "./mainpage.module.css";
import Header from "../Header";
import ModelsList from "../ModelsList";
import Preloader from "../Preloader";
import Footer from "../Footer";

export default function MainPage() {
    return (
        <>
            <Preloader />

            <Header />

            <main>
                <div className="container">
                    <section className={styles.mainpageSection}>
                        <ModelsList />
                    </section>
                </div>
            </main>

            <Footer />
        </>
    )
}