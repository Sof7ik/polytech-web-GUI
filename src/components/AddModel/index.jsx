import {useContext, useState} from "react";
import AuthContext from "../../context/auth.context";
import ModalWindow from "../ModalWindow";
import fetchConfig from "../../config/fetch.config";
import styles from "./addModel.module.css";

export default function AddModel(props) {
    const authContext = useContext(AuthContext);
    async function createModel(event) {
        event.preventDefault();

        /*
        const data = {
            "name": authContext.name,
            "name_model": modelName,
            "type": modelType,
            "model": {
                "data": modelCode,
            },
            "description": modelDescription,
            "comments": [],
            "image": modelImage,
        }
         */

        const formData = new FormData();
        formData.append("name", authContext.name)
        formData.append("name_model", modelName)
        formData.append("type", modelType)
        formData.append("model", modelCode)
        formData.append("description", modelDescription)
        formData.append("comments", JSON.stringify([]))
        formData.append("file", modelImage.file)

        const myHeaders = new Headers();
        myHeaders.append("apikey", authContext.apiKey);

        const createResponse = await fetch(`${fetchConfig.host}/models`, {
            method: 'POST',
            headers: myHeaders,
            body: formData,
        });

        if (createResponse.status >= 200 && createResponse.status < 300) {
            // закрываем модалку
            props.successCallback();
            props.closeHandler(null);
        }
    }

    function generateImageBase64(event) {
        const input = event.currentTarget;
        const file = input.files[0];

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = () => {
            setModelImage({
                file: file,
                base64: reader.result,
            });
        }
        reader.onerror = () => {
            console.warn("Problems while reading file");
        }
    }

    const modelTypes = [
        {
            value: "cube",
            text: "Кубик",
        },
        {
            value: "ball",
            text: "Шарик",
        },
        {
            value: "triangle",
            text: "Пирамидка",
        }
    ]

    const [modelName, setModelName] = useState("тестовая моделька");
    const [modelType, setModelType] = useState("ball");
    const [modelCode, setModelCode] = useState("кодим тут");
    const [modelDescription, setModelDescription] = useState("описание");
    const [modelImage, setModelImage] = useState({file: null, base64: null});

    return (
        <ModalWindow title={props.title}
                     opened={props.opened}
                     closeHandler={props.closeHandler}>
            <form action="" onSubmit={createModel} className="">
                <div className={`input-wrapper`}>
                    <label htmlFor="model-name">Введите название модели:</label>
                    <input type="text"
                           id="model-name"
                           value={modelName}
                           onChange={e => setModelName(e.target.value)}
                           placeholder="Название модели"/>
                </div>

                <div className={`input-wrapper`}>
                    <label htmlFor="model-type">Укажите тип модели:</label>
                    <select id="model-type"
                            value={modelType}
                            onChange={e => setModelType(e.target.value)}>
                        {
                            modelTypes.map((type, idx) => (
                                <option value={`${type.value}`} key={idx}>
                                    {type.text}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <div className={`input-wrapper`}>
                    <label htmlFor="model-code">Код модели (только для чтения):</label>
                    <textarea id="model-code"
                              readOnly={true}
                              value={modelCode}
                              onChange={e => setModelCode(e.target.value)}>
                    </textarea>
                </div>

                <div className={`input-wrapper`}>
                    <label htmlFor="model-description">Введите описание модели:</label>
                    <textarea id="model-description"
                              value={modelDescription}
                              onChange={e => setModelDescription(e.target.value)}>>
                    </textarea>
                </div>

                <div className={`input-wrapper`}>
                    <label htmlFor="model-image">Прикрепите изображение модели:</label>
                    <input type="file"
                           name="model-image"
                           onChange={generateImageBase64}
                           accept="image/png, image/jpeg, image/jpg, image/webp"
                           id="model-image"/>
                </div>

                { modelImage.base64 &&
                    <img src={modelImage.base64}
                         className={styles.previewImage}
                         alt={modelName} />}

                <button type="submit" className="btn green">
                    Создать
                </button>
            </form>
        </ModalWindow>
    );
}