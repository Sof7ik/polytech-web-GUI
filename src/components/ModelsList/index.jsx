import {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import styles from "./modelsList.module.css";
import AddModelWrapper from "../AddModelWrapper";
import AuthContext from "../../context/auth.context";
import fetchConfig from "../../config/fetch.config";

export default function ModelsList(props) {
    const [models, setModels] = useState([]);
    const [rerenderModels, setRerenderModels] = useState("1");
    const authContext = useContext(AuthContext);

    function successAddCallback() {
        setRerenderModels(prevState => prevState + "1");
    }

    useEffect(() => {
        async function loader() {
            const response = await fetch(`${fetchConfig.host}/models`);
            const data = await response.json();
            setModels(data);
        }
        loader();
    }, [rerenderModels])

    return (
        <>
        <div className={styles.titleButtonWrapper}>
            <h2 className={styles.mainPageTitle}>Список моделей</h2>

            { authContext.loggedIn ? <AddModelWrapper successCallback={successAddCallback}/> : "" }
        </div>

        { rerenderModels && models.length ?
            (<ul className={styles.modelsList}>
                {models.map(model => (
                    <li className={styles.modelsList__listItem} key={model._id}>
                        <p className={styles.modelItem__title}>{model.name_model}</p>

                        { model.images && model.images.thumb &&
                            <img src={model.images.thumb}
                                 alt={model.name_model}
                                 className={styles.modelItem__preview} />
                        }

                        <Link to={`/models/${model._id}`}>
                            Подробнее
                        </Link>
                    </li>
                ))}
            </ul>)
            :
            <p>Пока моделей нет. Создайте первую!</p> }
        </>
    );
}

// export async function loader() {
//     const response = await fetch(`http://localhost:8000/api/v3/models`);
//     return await response.json();
// }