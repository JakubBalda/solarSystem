import * as THREE from 'three';
//import * as TWEEN from '@tweenjs/tween.js'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {GUI} from 'dat.gui';
import {CSS2DRenderer, CSS2DObject} from 'three/examples/jsm/renderers/CSS2DRenderer';

import starsTexture from '../img/stars.jpg';
import sunTexture from '../img/sun.jpg';
import mercuryTexture from '../img/mercury.jpg';
import venusTexture from '../img/venus.jpg';
import earthTexture from '../img/earth.jpg';
import marsTexture from '../img/mars.jpg';
import jupiterTexture from '../img/jupiter.jpg';
import saturnTexture from '../img/saturn.jpg';
import saturnRingTexture from '../img/saturn ring.png';
import uranusTexture from '../img/uranus.jpg';
import uranusRingTexture from '../img/uranus ring.png';
import neptuneTexture from '../img/neptune.jpg';
import plutoTexture from '../img/pluto.jpg';

//Setup Scene
const renderer = new THREE.WebGLRenderer();
const defaultCameraX = -90;
const defaultCameraY = 140;
const defaultCameraZ = 140;
const defaultCameraMinDistance = 1;
const defaultCameraMaxDistance = 800;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
renderer.domElement.style.opacity = '1';

const scene = new THREE.Scene();

const mainCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

const orbit = new OrbitControls(mainCamera, renderer.domElement);

orbit.minDistance = defaultCameraMinDistance;
orbit.maxDistance = defaultCameraMaxDistance;
mainCamera.position.set(defaultCameraX, defaultCameraY, defaultCameraZ);

orbit.update();

let activeCamera = mainCamera;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,   
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

//Planet cameras
const sunCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

sunCamera.position.set(80, 15, -25);
sunCamera.lookAt(0,0,-25);

const mercuryCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

mercuryCamera.position.set(28, 10, 5);
mercuryCamera.lookAt(44,0,5);

const venusCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

venusCamera.position.set(48, 10, 7);
venusCamera.lookAt(66,0,7);

const earthCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

earthCamera.position.set(67, 10, 5);
earthCamera.lookAt(89,0,5);

const marsCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

marsCamera.position.set(114, 6, 5);
marsCamera.lookAt(129,0,5);

const jupiterCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

jupiterCamera.position.set(136, 10, 12);
jupiterCamera.lookAt(179,0,12);

const saturnCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

saturnCamera.position.set(187, 10, 10);
saturnCamera.lookAt(235,0,10);

const uranusCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

uranusCamera.position.set(250, 10, 10);
uranusCamera.lookAt(293,0,10);

const neptuneCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

neptuneCamera.position.set(302, 10, 8);
neptuneCamera.lookAt(330,0,8);

const plutoCamera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.5,
    1000
);

plutoCamera.position.set(365, 4, 4);
plutoCamera.lookAt(380,0,4);

//Menu Bar
createMenu();

//Planet render
const sunGeo = new THREE.SphereGeometry(26, 40, 40);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if(ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

function createOrbit(ring, orbitColor){
    const ringGeo = new THREE.RingGeometry(
        ring.innerRadius,
        ring.outerRadius,
        64);

    const ringMat = new THREE.MeshBasicMaterial({
        color: orbitColor,
        side: THREE.DoubleSide
    });

    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    scene.add(ringMesh);
    ringMesh.position.x = 0;
    ringMesh.position.y = 0;
    const vector3 = new THREE.Vector3(1,0,0);
    ringMesh.rotateOnAxis(vector3, 1.57);
    
}

const mercury = createPlanete(3.2, mercuryTexture, 44);
createOrbit({innerRadius: 43.5, outerRadius: 44}, 0xCC34EB);

const venus = createPlanete(5.8, venusTexture, 68);
createOrbit({innerRadius: 67.5, outerRadius: 68}, 0xC79708);

const earth = createPlanete(6, earthTexture, 89);
createOrbit({innerRadius: 88.5, outerRadius: 89}, 0x1B93CF);

const moon = createPlanete(1, plutoTexture, 99);

const mars = createPlanete(4, marsTexture, 129);
createOrbit({innerRadius: 128.5, outerRadius: 129}, 0xCC5C0C);

const jupiter = createPlanete(12, jupiterTexture, 179);
createOrbit({innerRadius: 178.5, outerRadius: 179}, 0XE6786A);

const saturn = createPlanete(10, saturnTexture, 235, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
createOrbit({innerRadius: 234.5, outerRadius: 235}, 0XFAD291);

const uranus = createPlanete(7, uranusTexture, 293, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
createOrbit({innerRadius: 292.5, outerRadius: 293}, 0X71E5F0);

const neptune = createPlanete(7, neptuneTexture, 330);
createOrbit({innerRadius: 329.5, outerRadius: 330}, 0X1C59E8);

const pluto = createPlanete(2.8, plutoTexture, 380);
createOrbit({innerRadius: 379.5, outerRadius: 380}, 0XA8AEBD);


const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

function animate() {
    //Self-rotation
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    moon.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    //Around-sun-rotation
    mercury.obj.rotateY(0.02);
    mercury.obj.attach(mercuryCamera);

    venus.obj.rotateY(0.015);
    venus.obj.attach(venusCamera);

    earth.obj.rotateY(0.01);
    earth.obj.attach(earthCamera);

    moon.obj.rotateY(0.01);

    mars.obj.rotateY(0.008);
    mars.obj.attach(marsCamera);

    jupiter.obj.rotateY(0.002);
    jupiter.obj.attach(jupiterCamera);

    saturn.obj.rotateY(0.0009);
    saturn.obj.attach(saturnCamera);

    uranus.obj.rotateY(0.0004);
    uranus.obj.attach(uranusCamera);

    neptune.obj.rotateY(0.0002);
    neptune.obj.attach(neptuneCamera);

    pluto.obj.rotateY(0.00015);
    pluto.obj.attach(plutoCamera);

    //labelRenderer.render(scene, activeCamera);
    renderer.render(scene, activeCamera);
}

renderer.setAnimationLoop(animate);

    window.addEventListener('resize', function() {
        mainCamera.aspect = window.innerWidth / window.innerHeight;
        mainCamera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
function createMenu(){
    const gui = new GUI();

    let button = { System:function(){
        switchCamera();
        }};
    
    gui.add(button,'System');

    button = { Slonce:function(){
        switchCamera('sun');
        }};
    
    gui.add(button,'Slonce');

    button = { Merkury:function(){  
        switchCamera('mercury');
       }};

    gui.add(button,'Merkury');

    button = { Wenus:function(){
        switchCamera('venus');
       }};

    gui.add(button,'Wenus');

    button = { Ziemia:function(){
        switchCamera('earth');
       }};

    gui.add(button,'Ziemia');

    button = { Mars:function(){
        switchCamera('mars');
       }};

    gui.add(button,'Mars');

    button = { Jowisz:function(){
        switchCamera('jupiter');

       }};

       gui.add(button,'Jowisz');

    button = { Saturn:function(){
        switchCamera('saturn');

       }};

       gui.add(button,'Saturn');

    button = { Uran:function(){
        switchCamera('uranus');

       }};

       gui.add(button,'Uran');

    button = { Neptun:function(){
        switchCamera('neptune');

       }};

    gui.add(button,'Neptun');

    button = { Pluton:function(){
        switchCamera('pluto');

       }};

    gui.add(button,'Pluton');
       

}


function switchCamera(cameraName){
    switch(cameraName){
        case 'sun':{
            console.log('sunCase');
            fadeControl(sunCamera, 'Sun');
            break;
        }
        case 'mercury':{
            console.log('mercury case');
            fadeControl(mercuryCamera, 'MercuryPlanet');
            break;
        }
        case 'venus':{
            console.log('venus case');
            fadeControl(venusCamera, 'VenusPlanet');
            break;
        }
        case 'earth':{
            console.log('earth case');
            fadeControl(earthCamera, 'EarthPlanet');
            break;
        }
        case 'mars':{
            console.log('mars case');
            fadeControl(marsCamera, 'MarsPlanet');
            break;
        }
        case 'jupiter':{
            console.log('jupiter case');
            fadeControl(jupiterCamera, 'JupiterPlanet');
            break;
        }
        case 'saturn':{
            console.log('saturn case');
            fadeControl(saturnCamera, 'SaturnPlanet');
            break;
        }
        case 'uranus':{
            console.log('uranus case');
            fadeControl(uranusCamera, 'UranusPlanet');
            break;
        }
        case 'neptune':{
            console.log('neptune case');
            fadeControl(neptuneCamera, 'NeptunePlanet');
            break;
        }
        case 'pluto':{
            console.log('pluto case');
            fadeControl(plutoCamera, 'PlutoPlanet');
            break;
        }
        default:{
            console.log('solar system case');
            fadeControl(mainCamera, 'system');
            break;
        }
    }
}

const fadeInDuration = 1000; 
const fadeInDelay = 500; 

const fadeOutDuration = 1000; 
const fadeOutDelay = 500;

function fadeOpacity(startOpacity, endOpacity, duration, onComplete) {
    const startTime = performance.now();
  
    function updateOpacity() {
      const elapsedTime = performance.now() - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const opacity = startOpacity + (endOpacity - startOpacity) * progress;
      document.getElementById('background').style.opacity = opacity;
  
      if (progress < 1) {
        requestAnimationFrame(updateOpacity);
      } else {
        if (onComplete) {
          onComplete();
        }
      }
    }
  
    updateOpacity();
  }

  function fadeControl(switchedCamera, planet){
    if(activePlanetLabel !== undefined){
        fadeDiv(activePlanetLabel);
    }

      setTimeout(() => {
        document.getElementById('background').style.display = 'block';
        fadeOpacity(0, 1, fadeInDuration, () => {
            activeCamera = switchedCamera;
            renderer.setAnimationLoop(animate);
        });
      }, fadeInDelay);

      setTimeout(() => {
        fadeOpacity(1, 0, fadeOutDuration, () => {
            document.getElementById('background').style.display = 'none';
            changeLabel(planet);
        });
      }, fadeInDelay + fadeInDuration + fadeOutDelay);

      function fadeDiv(planet){
        let divOpacity = 1.0;
        let timer = setInterval(function(){
            if(divOpacity <= 0){
                clearInterval(timer);
            }
            document.getElementById(planet).style.opacity = divOpacity;
            console.log(divOpacity);
            divOpacity -= 0.04;
        },20);
      }
  }

  let activePlanetLabel;

  function changeLabel(planet){
    if(activePlanetLabel !== undefined){
        if(planet !== 'system'){
            document.getElementById(activePlanetLabel).style.display = 'none';
            document.getElementById(planet).style.display = 'block';
            fadeDiv(planet)
            activePlanetLabel = planet;

            return;
        }else{
            document.getElementById(activePlanetLabel).style.display = 'none';
            activePlanetLabel = undefined;

            return;
        }
    }
    document.getElementById(planet).style.display = 'block';
    fadeDiv(planet);
    activePlanetLabel = planet;

    function fadeDiv(planet){
        let divOpacity = 0.0;
        let timer = setInterval(function(){
            if(divOpacity >= 1){
                clearInterval(timer);
            }
            document.getElementById(planet).style.opacity = divOpacity;
            divOpacity += 0.02;
        },30);
    }
  }

  