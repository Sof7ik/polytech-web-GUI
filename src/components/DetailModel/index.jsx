import styles from "./detail_model.module.css";
import React, {useState} from "react";
import {Link, useRouteLoaderData} from "react-router-dom";
import Header from "../Header";

const handleEditClick = async () => {
    console.log('Кнопка "Редактировать" была нажата!');
    // код редактирования
};

const handleDeleteClick = async () => {
    console.log('Кнопка "Удалить" была нажата!');
    // код удаления
};

const formatDate = dateStr => {
    const date = new Date(dateStr);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

export default function DetailModel() {
    const [modelData] = useState(useRouteLoaderData("modelDetail"));
    const formattedDate = formatDate(modelData.time_create);

    return (
        <>
        <Header/>
        <main>
            <div className="container">
                <section className={styles.detailPage}>
                    <Link to="/">Назад в список</Link>
                    <h1>Модель "{modelData.name_model}"</h1>
                    <div className={styles.modelInformation}>
                        <div className={styles.modelContainer}>
                            <canvas className={styles.modelCanvas}></canvas>
                        </div>
                        <p><strong>Название: </strong>{modelData.name_model}</p>
                        <p><strong>Тип модели: </strong>{modelData.type}</p>
                        <p className={styles.description}><strong>Описание: </strong>{modelData.description}</p>
                        <p><strong>Дата создания: </strong>{formattedDate}</p>
                        <button onClick={handleEditClick} className={styles.edit}>Редактировать</button>
                        <button onClick={handleDeleteClick} className={styles.delete}>Удалить</button>
                    </div>
                    <div>
                        <h2>Комментарии</h2>
                        <div className={styles.commentList}>
                            {modelData.comments.map((comment, index) => (
                                <div key={index} className={styles.commentItem}>
                                    {comment.text}
                                </div>
                            ))}
                        </div>
                    </div>
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