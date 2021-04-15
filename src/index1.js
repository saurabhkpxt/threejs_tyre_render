import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import filePath from "./model2.glb";

class App extends Component {
  componentDidMount() {
    console.log("this is", GLTFLoader);
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const gltfLoader = new GLTFLoader();

    const x = require("/public/x.json");
    console.log(x);
    let xyz;

    gltfLoader.load(
      filePath,
      (gltf) => {
        // called when the resource is loaded
        console.log("Totally Loaded");
        console.log("before", scene["children"]);

        scene.add(gltf.scene);
        console.log("After", scene["children"]);
      },
      (xhr) => {
        // called while loading is progressing
        console.log(`${(xhr.loaded / xhr.total) * 100}% loaded`);
      },
      (error) => {
        // called when loading has errors
        console.error("An error happened", error);
      }
    );

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;

    var animate = function () {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();
  }
  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
