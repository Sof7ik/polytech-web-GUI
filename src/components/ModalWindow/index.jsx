import styles from "./modalWindow.module.css";
export default function ModalWindow(props) {
    //console.log("modal window opened", props.title, props.opened);

    return (
        <div className={!props.opened ? styles.modalWindow : `${styles.modalWindow} ${styles.opened}`}>
            <div className={styles.modalContent}>
                <button className={styles.closeModal}
                        onClick={props.closeHandler}>
                    &times;
                </button>

                <p className={styles.modalTitle}>{props.title}</p>

                {props.children}
            </div>
        </div>
    );
}