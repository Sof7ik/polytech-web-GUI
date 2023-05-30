import styles from "./detail_model.module.css";
import React, {useContext, useState} from "react";
import {Link, Navigate, useRouteLoaderData} from "react-router-dom";
import Header from "../Header";
import AuthContext from "../../context/auth.context";
import fetchConfig from "../../config/fetch.config";

export default function DetailModel() {
    const [modelData] = useState(useRouteLoaderData("modelDetail"));
    const authContext = useContext(AuthContext);
    const [isModelDeleted, setIsModelDeleted] = useState(false);

    const handleEditClick = async (event) => {
        try {

        }catch (error) {
            return error
        }
    };

    const handleDeleteClick = async (event) => {
        try{
            if (window.confirm("Вы уверены, что хотите удалить эту модель?")) {
                // Отправляем DELETE-запрос на сервер для удаления объекта модели
                const response = await fetch(`${fetchConfig.host}/api/models/${modelData._id}/`, {
                    method: "DELETE",
                    headers: {"apikey": authContext.apiKey},
                });
                const data = await response.json();

                if (data.deletedCount === 1) {
                    setIsModelDeleted(true);
                }
            }
        }catch (error) {
            return error
        }
    }

    const formatDate = (dateStr, type = "h") => {
        if (!dateStr) {
            return "";
        }

        const date = new Date(dateStr);
        const day = date.getDate();
        const month = date.getMonth() + 1;

        const dayStr = day < 10 ? `0${day}` : day;
        const monthStr = month < 10 ? `0${month}` : month;

        let resultDateStr = `${dayStr}.${monthStr}.${date.getFullYear()}`;

        if (type === "h t" || type === "ht" || type === "h:t") {
            const hours = date.getHours() > 10 ? date.getHours()+1 : `0${date.getHours()}`;
            const minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
            const seconds = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}}`;

            resultDateStr = `${dayStr}.${monthStr}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
        }

        return resultDateStr;
    };

    const dateCreate = formatDate(modelData.time_create, "h");
    const dateTimeModified = formatDate(modelData.time_updated, "ht");
    return (
        <>
            {
                isModelDeleted ? <Navigate to="/"/> : ""
            }

            <Header />
            <main>
                <div className="container">
                    <section className={styles.detailPage}>
                        <Link to="/" className={styles.backToList}>Назад в список</Link>
                        <h1>Модель "{modelData.name_model}" {modelData._id}</h1>
                        <div className={styles.modelInformation}>
                            <div className={styles.modelContainer}>
                                <canvas className={styles.modelCanvas}></canvas>
                            </div>

                            <div className={styles.modelDesccription}>
                                <div className={styles.modelInformation__text}>
                                    <p><strong>Название: </strong>{modelData.name_model}</p>
                                    <p><strong>Тип модели: </strong>{modelData.type}</p>
                                    <p className={styles.description}><strong>Описание: </strong>{modelData.description}</p>
                                    <p><strong>Дата создания: </strong>{dateCreate}</p>
                                    <p><strong>Дата последнего редактирования: </strong>{dateTimeModified}</p>
                                </div>


                                { authContext.loggedIn && authContext.name === modelData.name ?
                                    <div className={styles.modelInformation__buttons}>
                                        <button onClick={handleEditClick} className={`${styles.edit} btn orange`}>Редактировать</button>
                                        <button onClick={handleDeleteClick} className={`${styles.delete} btn red`}>Удалить</button>
                                    </div>
                                    : ""
                                }
                            </div>
                        </div>

                        { modelData.comments && modelData.comments.length ?
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
                            : ""
                        }

                    </section>
                </div>
            </main>
        </>
    );
}

export async function loader({params}) {
    const modelId = params.id;
    const response = await fetch(`${fetchConfig.host}/api/models/${modelId}`);
    return await response.json();
}