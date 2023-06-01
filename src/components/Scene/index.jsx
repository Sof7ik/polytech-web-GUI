import styles from "./scene.module.css"
import * as THREE from 'three';
import {useRef, useEffect, useState} from 'react';

// function createScene(width, height, container, type) {
    // const scene = new THREE.Scene();
    // const camera = new THREE.PerspectiveCamera(
    //     75,
    //     width / height,
    //     0.1,
    //     1000
    // )
    // camera.position.z = 5
    // camera.position.y = 2
    // camera.position.x = -5
    // let cameraTarget = new THREE.Vector3(0, 0, 0);
    // camera.lookAt(cameraTarget)


    // const renderer = new THREE.WebGLRenderer();
    // renderer.setSize(width, height);
    // renderer.setClearColor(0xffffff, 0);
    // container.appendChild(renderer.domElement);

    // let geometry
    //
    // if (type === "cube") {
    //     geometry = new THREE.BoxGeometry(1, 1, 1);
    // } else if (type === "triangle") {
    //     geometry = new THREE.ConeGeometry(1, 2, 4);
    // }else if (type === "ball") {
    //     geometry = new THREE.SphereGeometry(1, 32, 32);
    // }
    //
    // let material = new THREE.MeshBasicMaterial({ color: 0xff0000});
    // let figure = new THREE.Mesh(geometry, material)
    // figure.castShadow = true
    // figure.position.z = 0
    // figure.position.x = 0
    // figure.position.y = 0
    // scene.add(figure)
    //
    // renderer.render( scene, camera );
// }

export default function Scene(props) {
    const sceneRef = useRef(null);
    const [threeObjects, setThreeObjects] = useState({
        scene: new THREE.Scene(),
        camera: new THREE.PerspectiveCamera(75, 16/9, 0.1, 1000),
        renderer: new THREE.WebGLRenderer(),
        geometry: null,
        figure: null,
    });

    useEffect(() => {
        if (props.type === "cube") {
            setThreeObjects(prevState => {
                return {
                    ...prevState,
                    geometry: new THREE.BoxGeometry(1, 1, 1)
                }
            })
        }
        else if (props.type === "triangle") {
            setThreeObjects(prevState => {
                return {
                    ...prevState,
                    geometry: new THREE.ConeGeometry(1, 2, 4)
                }
            })
        }
        else if (props.type === "ball") {
            setThreeObjects(prevState => {
                return {
                    ...prevState,
                    geometry: new THREE.SphereGeometry(1, 32, 32)
                }
            })
        }
    }, [props.type]);

    useEffect(() => {
        if (threeObjects.geometry) {
            const sceneWidth = sceneRef.current.getBoundingClientRect().width;
            const sceneHeight = sceneRef.current.getBoundingClientRect().height;

            threeObjects.camera.position.z = 5
            threeObjects.camera.position.y = 2
            threeObjects.camera.position.x = -5
            let cameraTarget = new THREE.Vector3(0, 0, 0);
            threeObjects.camera.lookAt(cameraTarget)

            threeObjects.renderer.setSize(sceneWidth, sceneHeight);
            threeObjects.renderer.setClearColor(0xffffff, 0);

            if (sceneRef.current.hasChildNodes()) {
                sceneRef.innerHTML = "";
            }

            sceneRef.current.appendChild(threeObjects.renderer.domElement);

            let material = new THREE.MeshBasicMaterial({ color: 0xff0000});

            if (threeObjects.figure) {
                threeObjects.scene.remove(threeObjects.figure);
                threeObjects.figure.geometry.dispose();
                threeObjects.figure.material.dispose();
                threeObjects.figure = undefined;
            }

            console.log(threeObjects)

            threeObjects.figure = new THREE.Mesh(threeObjects.geometry, material)
            threeObjects.figure.castShadow = true
            threeObjects.figure.position.z = 0
            threeObjects.figure.position.x = 0
            threeObjects.figure.position.y = 0

            threeObjects.scene.add(threeObjects.figure)

            threeObjects.renderer.render( threeObjects.scene, threeObjects.camera );
        }
    }, [threeObjects])

    console.log("scene rendered")

    return (
        <div ref={sceneRef} className={styles.sceneWrapper}></div>
    )
}