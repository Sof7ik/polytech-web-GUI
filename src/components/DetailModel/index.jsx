import styles from "./detail_model.module.css";
import React, {useContext, useEffect, useState} from "react";
import {Link, Navigate, useParams} from "react-router-dom";
import Header from "../Header";
import AuthContext from "../../context/auth.context";
import fetchConfig from "../../config/fetch.config";
import Footer from "../Footer";
import Scene from "../Scene";

export default function DetailModel(props) {
    const [modelData, setModelData] = useState({});
    const [editedModelData, setEditedModelData] = useState({});

    const authContext = useContext(AuthContext);

    const [isModelDeleted, setIsModelDeleted] = useState(false);

    const [isEdit, setIsEdit] = useState(false);
    const [isEdited, setIsEdited] = useState(false);

    const handleDeleteClick = async () => {
        try{
            if (window.confirm("Вы уверены, что хотите удалить эту модель?")) {
                // Отправляем DELETE-запрос на сервер для удаления объекта модели
                const response = await fetch(`${fetchConfig.host}/models/${modelData._id}/`, {
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEditedModelData({ ...editedModelData, [name]: value });
    };

    const handleCancelClick = () => {
        setIsEdit(false);
        setEditedModelData(modelData);
    };

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
            const hours = date.getHours() > 10 ? date.getHours() : `0${date.getHours()}`;
            const minutes = date.getMinutes() > 10 ? date.getMinutes() : `0${date.getMinutes()}`;
            const seconds = date.getSeconds() > 10 ? date.getSeconds() : `0${date.getSeconds()}`;

            resultDateStr = `${dayStr}.${monthStr}.${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
        }

        return resultDateStr;
    };

    const handleSaveClick = async () => {
        try {
            setIsEdit(false);
            const name_model = editedModelData.name_model
            const type = editedModelData.type
            const description = editedModelData.description

            let newBody = {
                "name_model": name_model,
                "type": type,
                "description": description
            }

            const response = await fetch(`${fetchConfig.host}/models/${modelData._id}`, {
                method: "PATCH",
                headers: {"apikey": authContext.apiKey, "Content-Type": "application/json"},
                body: JSON.stringify(newBody),
            });
            let newModel = await response.json()

            setModelData( (prevState) => {
                return {...prevState, newModel}
            })

            setIsEdited(prevState => !prevState)

        }catch (error) {
            return error
        }
    };

    const dateCreate = formatDate(modelData.time_create, "h");
    let dateTimeModified = formatDate(modelData.time_updated, "ht");
    const params = useParams()

    useEffect(() => {
        async function loader() {
            const response = await fetch(`${fetchConfig.host}/models/${params.id}`);
            const data = await response.json();
            setModelData(data);
            setEditedModelData(data);
        }
        loader();
    }, [isEdited, params.id])
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
                            <Scene component={modelData.model}/>

                            <div className={styles.modelDesccription}>
                                <div className={styles.modelInformation__text}>
                                    {isEdit ? (
                                        <div>
                                            <input type="text" name="name_model" value={editedModelData.name_model} onChange={handleInputChange} />
                                            <select name="type" onChange={handleInputChange}>
                                                <option value="cube">Кубик</option>
                                                <option value="ball">Шарик</option>
                                                <option value="triangle">Пирамидка</option>
                                            </select>
                                            <input type="text" name="description" value={editedModelData.description} onChange={handleInputChange} />
                                        </div>
                                    ) : (
                                        <div>
                                            <p>
                                                <strong>Название: </strong>
                                                {modelData.name_model}
                                            </p>
                                            <p>
                                                <strong>Тип модели: </strong>
                                                {modelData.type}
                                            </p>
                                            <p className={styles.description}>
                                                <strong>Описание: </strong>
                                                {modelData.description}
                                            </p>
                                        </div>
                                    )}
                                    <p>
                                        <strong>Дата создания: </strong>
                                        {dateCreate}
                                    </p>
                                    <p>
                                        <strong>Дата последнего редактирования: </strong>
                                        {dateTimeModified}
                                    </p>
                                </div>

                                {authContext.loggedIn && authContext.name === modelData.name ? (
                                    <div className={styles.modelInformation__buttons}>
                                        {isEdit ? (
                                            <>
                                                <button onClick={handleSaveClick} className={`${styles.edit} btn orange`}>
                                                    Сохранить
                                                </button>
                                                <button onClick={handleCancelClick} className={`${styles.edit} btn red`}>
                                                    Отменить
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                            <button onClick={() => setIsEdit(true)} className={`${styles.edit} btn orange`}>
                                                Редактировать
                                            </button>
                                            <button onClick={handleDeleteClick} className={`${styles.delete} btn red`}>
                                                Удалить
                                            </button>
                                            </>
                                        )}

                                    </div>
                                ) : ""
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

            <Footer />
        </>
    );
}
