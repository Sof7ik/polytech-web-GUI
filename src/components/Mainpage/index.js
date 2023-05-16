import styles from "./mainpage.module.css";
import {Link, useRouteLoaderData} from "react-router-dom";
import {useState, } from "react";

export default function Mainpage() {
    const [models, setModels] = useState(useRouteLoaderData("root"));

    return (
        <section className={styles.mainpageSection}>
            <h1>Список моделей</h1>

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
    )
}

export async function loader() {
    const response = await fetch(`http://localhost:8000/api/v3/models`);
    return await response.json();
}