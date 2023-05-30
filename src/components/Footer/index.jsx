import styles from "./footer.module.css";
import logoLetters from "./../../logos/mospolytech-logo-white.svg";

export default function Footer(props) {
    function showCopyDate() {
        const date = new Date().getFullYear();
        let showDate = `${date} г.`;

        if (date !== 2023) {
            showDate = `2023 - ${date} гг.`;
        }

        return showDate;
    }

    return (
        <footer>
            <div className="container">
                <div className={styles.footer__innerWrapper}>
                    <div className={styles.footer__col}>
                        <img src={logoLetters}
                             alt="Московский политех"/>

                        <small className={styles.footer__copyright}>
                            &copy; САПР, гр. 211-324, {showCopyDate()}
                        </small>
                    </div>

                    <div className={styles.footer__col}>
                        <p>Разработчики:</p>
                        <ul className={styles.footer__developers}>
                            <li>Леонид Бычков
                                <ul className={styles.footer__devSocials}>
                                    <li> <a href="https://vk.com/leobychkov" target="_blank" rel="noreferrer">VK</a> </li>
                                    <li><a href="https://t.me/leobychkov" target="_blank" rel="noreferrer">Telegram</a> </li>
                                    <li> <a href="https://leobychkov.ru" target="_blank" rel="noreferrer">Сайт</a> </li>
                                </ul>
                            </li>
                            <li>Сева Буянов
                                <ul className={styles.footer__devSocials}>
                                    <li> <a href="https://vk.com/vpbuyanov" target="_blank" rel="noreferrer">VK</a> </li>
                                    <li> <a href="https://t.me/vpbuyanov" target="_blank" rel="noreferrer">Telegram</a> </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </footer>
    );
}