import {useState} from "react";
import {Link, useRouteLoaderData} from "react-router-dom";
import styles from "./modelsList.module.css";

export default function ModelsList(props) {
    console.log("modelsList")

    const [models, setModels] = useState(useRouteLoaderData("root"));

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