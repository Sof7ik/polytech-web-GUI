import styles from "./detail_model.module.css";
import {useState} from "react";
import {useRouteLoaderData} from "react-router-dom";

export default function DetailModel() {
    const [modelData, setModelData] = useState(useRouteLoaderData("modelDetail"));

    return (
        <section className={styles.detailPage}>
            <h1>Модель "{modelData.name_model}"</h1>
        </section>
    );
}

export async function loader({params}) {
    const modelId = params.id;
    const response = await fetch(`http://localhost:8080/api/v3/models/${modelId}`);
    return await response.json();
}