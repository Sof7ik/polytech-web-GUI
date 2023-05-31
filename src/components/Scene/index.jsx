import styles from "./scene.module.css"
import * as THREE from 'three';
import { useRef, useEffect } from 'react';

function createScene(width, height, container) {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        75,
        width / height,
        0.1,
        1000
    )
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize( width, height );
    renderer.setClearColor(0xffffff, 0);
    container.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const cube = new THREE.Mesh( geometry, material );
    scene.add( cube );

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame( animate );
        renderer.render( scene, camera );
    }
    animate();
}

export default function Scene(props){
    const sceneRef = useRef(null);

    useEffect(() => {
        const sceneWidth = sceneRef.current.getBoundingClientRect().width;
        const sceneHeight = sceneRef.current.getBoundingClientRect().height;
        createScene(sceneWidth, sceneHeight, sceneRef.current);
    }, []);

    return (
        <div ref={sceneRef} className={styles.sceneWrapper}>
        </div>
    )
}