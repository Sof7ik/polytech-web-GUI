import styles from "./detail_model.module.css";
import React, {useContext, useState} from "react";
import {Link, Navigate, useRouteLoaderData} from "react-router-dom";
import Header from "../Header";
import AuthContext from "../../context/auth.context";

export default function DetailModel() {
    const [modelData] = useState(useRouteLoaderData("modelDetail"));
    const authContext = useContext(AuthContext);

    let deleted

    const handleEditClick = () => {

    };

    const handleDeleteClick = async () => {
        try{
            if (window.confirm("Вы уверены, что хотите удалить эту модель?")) {
                // Отправляем DELETE-запрос на сервер для удаления объекта модели
                await fetch(`http://localhost:8000/api/v3/models/${modelData._id}`, {
                    method: "DELETE",
                    headers: {"apikey": authContext.apiKey},
                });
                window.location.href = "/";
            }
        }catch (e) {
            return e
        }
    };

    const formatDate = dateStr => {
        if (!dateStr) {
            return "";
        }

        const date = new Date(dateStr);
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    };

    const formattedDate = formatDate(modelData.time_create);
    return (
        <>
            <Header />
            <main>
                <div className="container">
                    <section className={styles.detailPage}>
                        <Link to="/" className={styles.backToList}>Назад в список</Link>
                        <h1>Модель "{modelData.name_model}"</h1>
                        <div className={styles.modelInformation}>
                            <div className={styles.modelContainer}>
                                <canvas className={styles.modelCanvas}></canvas>
                            </div>

                            <div className={styles.modelDesccription}>
                                <div className={styles.modelInformation__text}>
                                    <p><strong>Название: </strong>{modelData.name_model}</p>
                                    <p><strong>Тип модели: </strong>{modelData.type}</p>
                                    <p className={styles.description}><strong>Описание: </strong>{modelData.description}</p>
                                    <p><strong>Дата создания: </strong>{formattedDate}</p>
                                </div>


                                { authContext.loggedIn ?
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
    const response = await fetch(`http://localhost:8000/api/v3/models/${modelId}`);
    return await response.json();
}