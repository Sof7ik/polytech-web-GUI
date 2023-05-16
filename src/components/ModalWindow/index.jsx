import styles from "./modalWindow.module.css";
export default function ModalWindow(props) {
    return (
        <div className={!props.opened ? styles.modalWindow : `${styles.modalWindow} ${styles.opened}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeModal}
                        onClick={props.closeHandler}>
                    &times;
                </button>

                {props.children}
            </div>
        </div>
    );
}