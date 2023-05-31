import styles from "./scene.module.css"
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

function createScene(width, height, container, type) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    )
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 0);
    container.appendChild(renderer.domElement);

    console.log(type)

    if (type === "cube") {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000});
        const cub = new THREE.Mesh(geometry, material);

        scene.add(cub);
    } else if (type === "triangle") {
        const geometry1 = new THREE.ConeGeometry(1, 2, 4);
        const material1 = new THREE.MeshBasicMaterial({ color: 0xff0000});
        const triangle = new THREE.Mesh(geometry1, material1);

        scene.add(triangle);
    }else if (type === "ball") {
        const geometry2 = new THREE.SphereGeometry(1, 32, 32);
        const material2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const ball = new THREE.Mesh(geometry2, material2);

        scene.add(ball);
    }

    function animate() {
        requestAnimationFrame( animate );
        camera.position.z = 5;
        renderer.render( scene, camera );
    }

    animate()
}

export default function Scene(props){
    const sceneRef = useRef(null);

    useEffect(() => {
        const sceneWidth = sceneRef.current.getBoundingClientRect().width;
        const sceneHeight = sceneRef.current.getBoundingClientRect().height;
        createScene(sceneWidth, sceneHeight, sceneRef.current, props.type);
    }, [props]);

    return (
        <div ref={sceneRef} className={styles.sceneWrapper}></div>
    )
}