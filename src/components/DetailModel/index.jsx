import styles from "./detail_model.module.css";
import {useContext, useState} from "react";
import {Link, useRouteLoaderData} from "react-router-dom";
import Header from "../Header";
import AuthContext from "../../context/auth.context";

const handleEditClick = () => {
    console.log('Кнопка "Редактировать" была нажата!');
    // код редактирования
};

const handleDeleteClick = () => {
    console.log('Кнопка "Удалить" была нажата!');
    // код удаления
};

const formatDate = dateStr => {
    if (!dateStr) {
        return "";
    }

    const date = new Date(dateStr);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
};

export default function DetailModel() {
    const [modelData] = useState(useRouteLoaderData("modelDetail"));
    const authContext = useContext(AuthContext);

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