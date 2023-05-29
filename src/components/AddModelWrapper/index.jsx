import {useState} from "react";
import styles from "../Mainpage/mainpage.module.css";
import AddModel from "../AddModel";

export default function AddModelWrapper(props) {
    // function successCreateCallback() {
    //     console.log("success callback");
    //     props.modelsListRerenderHandler(prevState => !prevStazte);
    // }

    const [modalOpened, setModalState] = useState(false);

    // открытие закрытие модалки
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