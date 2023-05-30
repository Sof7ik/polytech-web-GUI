import styles from "./preloader.module.css";
import polytechLogo from "./../../logos/mospolytech-logo-white.png";
import {useState} from "react";

export default function Preloader(props) {
    const [isLoaded, setIsLoaded] = useState(getPreloaderState());

    function getPreloaderState() {
        return JSON.parse(localStorage.getItem("preloader_loaded"));
    }

    function closePreloader() {
        localStorage.setItem("preloader_loaded", JSON.stringify(true));
        setIsLoaded(true);
    }

    setTimeout( () => {
        closePreloader();
    }, 1400)

    return(
        <div className={`${styles.preloader} ${isLoaded ? styles.loaded : ""}`} id="preloader">
            <div className={styles.preloader__inner}>
                <div className={styles.preloader__wrap}>
                    <img src={polytechLogo}
                         alt="loader logo"
                         className={styles.preloader__image}/>
                </div>
            </div>
        </div>

    );
}