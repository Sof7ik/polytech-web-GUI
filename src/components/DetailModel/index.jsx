import styles from "./detail_model.module.css";
import {useState} from "react";
import {useRouteLoaderData} from "react-router-dom";

export default function DetailModel() {
    const [modelData] = useState(useRouteLoaderData("modelDetail"));

    return (
        <section className={styles.detailPage}>
            <h1>Модель "{modelData.name_model}"</h1>
            <div className="container">
                <p><strong>Имя модели:</strong>{modelData.name_model}</p>
                <p><strong>Тип модели:</strong>{modelData.type}</p>
                <p><strong>Описание:</strong>{modelData.description}</p>
                <p><strong>Дата создания:</strong>{modelData.time_create}</p>
            </div>
        </section>
    );
}

export async function loader({params}) {
    const modelId = params.id;
    const response = await fetch(`http://localhost:8000/api/v3/models/${modelId}`);
    return await response.json();
}