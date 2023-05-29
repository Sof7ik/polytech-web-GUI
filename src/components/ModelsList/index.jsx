import {useEffect, useState} from "react";
import { Link } from "react-router-dom";
import styles from "./modelsList.module.css";

export default function ModelsList(props) {
    const [models, setModels] = useState([]);

    useEffect(() => {
        async function getModels() {
            const response = await fetch(`http://localhost:8000/api/models`);
            const data = await response.json();

            setModels(data);
        }
        getModels();
    }, [])

    console.log("modelsList")

    return (
        <>
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
        </>
    );
}