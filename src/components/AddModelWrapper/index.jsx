import {useState} from "react";
import styles from "../Mainpage/mainpage.module.css";
import AddModel from "../AddModel";

export default function AddModelWrapper(props) {
    const [modalOpened, setModalState] = useState(false);

    function addModelModalHandler(event) {
        setModalState(prevState => !prevState);
    }

    return (
        <>
            <button className={`${styles.addModelBtn} btn green`}
                    data-opened={modalOpened}
                    onClick={addModelModalHandler}>
                Добавить модель
            </button>

            <AddModel title="Добавить новую модель"
                  closeHandler={addModelModalHandler}
                  opened={modalOpened}/>
        </>
    );
}