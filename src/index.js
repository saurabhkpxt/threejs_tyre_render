import React, { Component } from "react";
import ReactDOM from "react-dom";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import filePath from "./model2.glb";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

class App extends Component {
  componentDidMount() {
    // === THREE.JS CODE START ===

    var mixer;

    var gltfLoader = new GLTFLoader();
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x808080);

    var camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.set(50, 50, 50);

    var renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mount.appendChild(renderer.domElement);

    var hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    hemiLight.position.set(0, 20, 0);
    scene.add(hemiLight);

    var dirLight = new THREE.DirectionalLight(0xffffff);
    dirLight.position.set(-3, 10, -10);
    scene.add(dirLight);

    gltfLoader.load(filePath, (gltf) => {
      console.log(gltf);
      scene.add(gltf.scene);

      mixer = new THREE.AnimationMixer(gltf.scene);
    });

    const helper = new THREE.CameraHelper(camera);
    scene.add(helper);

    const controls = new OrbitControls(camera, renderer.domElement);

    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      var delta = clock.getDelta();

      if (mixer) mixer.update(delta);

      renderer.render(scene, camera);
    }

    animate();

    // === THREE.JS EXAMPLE CODE END ===
  }

  render() {
    return <div ref={(ref) => (this.mount = ref)} />;
  }
}

export default App;

ReactDOM.render(<App />, document.getElementById("root"));

//To convert STP to STL https://anyconv.com/stp-to-stl-converter/

//To convert STL to GTLF https://dualbox.com/apps/stl-to-gltf-glb/production

//To view 3D model online https://3dviewer.net/
