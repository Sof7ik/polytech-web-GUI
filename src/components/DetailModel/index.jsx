import styles from "./detail_model.module.css";
import {useState} from "react";
import {Link, useRouteLoaderData} from "react-router-dom";
import Header from "../Header";

export default function DetailModel() {
    const [modelData, setModelData] = useState(useRouteLoaderData("modelDetail"));

    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <section className={styles.detailPage}>
                        <Link to="/">Назад в список</Link>

                        <h1>Модель "{modelData.name_model}"</h1>
                    </section>
                </div>
            </main>
        </>
    );
}

export async function loader({params}) {
    const modelId = params.id;
    const response = await fetch(`http://localhost:8000/api/v3/models/${modelId}`);
    return await response.json();
}