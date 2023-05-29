import {useContext, useState} from "react";
import AuthContext from "../../context/auth.context";
import ModalWindow from "../ModalWindow";

export default function AddModel(props) {
    const authContext = useContext(AuthContext);
    async function createModel(event) {
        event.preventDefault();

        const data = {
            "name": authContext.name,
            "name_model": modelName,
            "type": modelType,
            "model": {
                "data": modelCode,
            },
            "description": modelDescription,
            "comments": []
        }

        const createResponse = await fetch("http://localhost:8000/api/models", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                "apikey": authContext.apiKey,
            }
        });

        if (createResponse.status >= 200 && createResponse.status < 300) {
            // закрываем модалку

            props.successCallback();
            props.closeHandler(null);
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

    const [modelName, setModelName] = useState("");
    const [modelType, setModelType] = useState("ball");
    const [modelCode, setModelCode] = useState("кодим тут");
    const [modelDescription, setModelDescription] = useState("описание");

    console.log(props);

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
                            modelTypes.map((type, idx) => {
                                let isSelected = false;
                                if (!modelType.length && idx === 0) {
                                    isSelected = true;
                                }
                                else if (modelType.length && modelType === type.value) {
                                    isSelected = true;
                                }

                                return (
                                    <option value={`${type.value}`}
                                            {...isSelected ? "selected" : ""} key={idx}>
                                        {type.text}
                                    </option>);
                            })
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

                <button type="submit" className="btn green">
                    Создать
                </button>
            </form>
        </ModalWindow>
    );
}