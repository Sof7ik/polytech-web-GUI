import styles from "./mainpage.module.css";
import {Link, useLoaderData} from "react-router-dom";
import {useState, } from "react";
import ModalWindow from "../ModalWindow";

let modalOpened, setModalState;

export default function Mainpage() {
    console.log("rerender")

    const [models, setModels] = useState(useLoaderData());
    [modalOpened, setModalState] = useState(false);

    return (
        <>
            <section className={styles.mainpageSection}>
                <h1>Список моделей</h1>

                <button className={`${styles.addModelBtn} btn green`}
                        data-opened={modalOpened}
                        onClick={addModelModalHandler}>
                    Добавить модель
                </button>

                { models.length ?
                    (<ul className={styles.modelsList}>
                        {models.map(model => (
                            <li className={styles.modelsList__listItem} key={model._id}>
                                <Link to={`/models/${model._id}`}>
                                    <>{model.name_model}</>
                                </Link>
                            </li>
                        ))}
                    </ul>)
                    :
                    <p>Пока моделей нет. Создайте первую!</p> }
            </section>

            <ModalWindow opened={modalOpened}
                         closeHandler={addModelModalHandler}>

            </ModalWindow>
        </>
    )
}

export async function loader() {
    const response = await fetch(`http://localhost:8000/api/v3/models`);
    return await response.json();
}

function addModelModalHandler(event) {
    const btn = event.currentTarget;
    console.log(btn);

    setModalState(prevState => !prevState);
}