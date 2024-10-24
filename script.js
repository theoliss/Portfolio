import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.001,10000);
const WorkSpace = document.getElementById("WorkSpace");
//const control = new OrbitControls(camera,WorkSpace);
camera.position.set(29.4,-15,12);
camera.rotation.set(0.85,0,0);

const renderer = new THREE.WebGLRenderer({
    canvas : WorkSpace,
    antialias : true,
    alpha : true
});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio);

const light = new THREE.PointLight( 0xffffff, 5, 0, 0.01 );
light.position.set(29,-15,12);
scene.add( light );

const groundGeom = new THREE.PlaneGeometry(500,500);
const groundMat = new THREE.MeshStandardMaterial({color : "grey"}); 
const ground = new THREE.Mesh(groundGeom,groundMat);
scene.add(ground);




//LOAD ALL MODELS :
let objects_to_move;
const loader = new GLTFLoader();

loader.load( './items/main_line.glb', function ( glb ) 
{
    scene.add(glb.scene);
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);
    
});

let Me;
loader.load( './items/me.glb', function ( glb ) 
{
    scene.add(glb.scene);
    Me = glb.scene.getObjectByName('Me');
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,6);
});

let Press;
loader.load( './items/press.glb', function ( glb ) 
{
    Press = glb.scene.getObjectByName("Press");
    scene.add(glb.scene);
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);
});

let Cockpit;
let Skills_Button;
let Experiences_Button;
let Contact_me_Button;
let Red_Button;
loader.load( './items/control_panel.glb', function ( glb ) 
{
    Cockpit = glb.scene;
    Skills_Button = glb.scene.getObjectByName('Skills_Button');
    Experiences_Button = glb.scene.getObjectByName('Experiences_Button');
    Contact_me_Button = glb.scene.getObjectByName('Contact_me_Button');
    Red_Button = glb.scene.getObjectByName('Red_Button');
    scene.add(glb.scene);
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);
    objects_to_move = 
    {
        "Me" : {"type" : "me", "object" : Me, "is_animating" : false, "animation_frame" : 0},
        "Press" : {"type" : "press", "object" : Press, "is_animating" : false, "animation_frame" : 0},
        "Cockpit" : {"type" : "Cockpit", "object" : Cockpit, "is_animating" : false, "animation_frame" : 0},
        "Skills_Button" : {"type" : "button", "object" : Skills_Button, "is_animating" : false, "animation_frame" : 0},
        "Experiences_Button" : {"type" : "button", "object" : Experiences_Button, "is_animating" : false, "animation_frame" : 0},
        "Contact_me_Button" : {"type" : "button", "object" : Contact_me_Button, "is_animating" : false, "animation_frame" : 0},
        "Red_Button" : {"type" : "button", "object" : Red_Button, "is_animating" : false, "animation_frame" : 0}
    }
});

let Mecanical_arm;
let mixer;
let animations;
let model_ready = false;
loader.load( './items/mecanical_arm.glb', function ( glb ) 
{
    scene.add(glb.scene);
    Mecanical_arm = glb.scene.getObjectByName('Cylinder001_1');
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);

    animations = glb.animations;
    mixer = new THREE.AnimationMixer(glb.scene);
    model_ready = true;
});

let clock = new THREE.Clock();
const animate = () => {
    for (let element in objects_to_move){
        if(objects_to_move[element]["object"] && objects_to_move[element]["is_animating"]){
            objects_to_move[element]["animation_frame"] = UpdateAnimation(objects_to_move[element]);
            if(objects_to_move[element]["animation_frame"] == 0) {
                objects_to_move[element]["is_animating"] = false;
            }
        }
    };
    if (model_ready) mixer.update(clock.getDelta());
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    //control.update();
};

function StartAnimation(object){
    switch(object.name){
        case "Red_Button" :
            console.log("test");
            objects_to_move[object.name]["is_animating"] = true;
            objects_to_move["Press"]["is_animating"] = true;
            break;
        case "Skills_Button" :
            objects_to_move[object.name]["is_animating"] = true;
            objects_to_move["Cockpit"]["is_animating"] = true;
            objects_to_move["Me"]["is_animating"] = true;
            break;
        case "Experiences_Button" :
            objects_to_move[object.name]["is_animating"] = true;
            for (let i = 0; i < animations.length; i++) {
                mixer.clipAction(animations[i]).setLoop(THREE.LoopOnce).play();
            }
            break;
        case "Contact_me_Button" :
            objects_to_move[object.name]["is_animating"] = true;
            objects_to_move["Cockpit"]["is_animating"] = true;
            objects_to_move["Me"]["is_animating"] = true;
            break;

    }
}

function UpdateAnimation(object){
    switch(object["type"]){
        case "button" :
            return AnimateButton(object);
        case "Cockpit" :
            return AnimateCockpit(object);
        case "me" :
            return AnimateMe(object);
        case "press":
            return AnimatePress(object);
    }
}

function AnimatePress(object){
    let mesh = object["object"];
    let animation_frame = object["animation_frame"];
    if(animation_frame < 15){
        mesh.position.set(mesh.position.x,mesh.position.y-0.35,mesh.position.z);
        Me.position.set(Me.position.x,Me.position.y-0.4,Me.position.z);
        return animation_frame + 1;
    }
    else if(animation_frame < 30){
        mesh.position.set(mesh.position.x,mesh.position.y+0.35,mesh.position.z);
        return animation_frame + 1;
    }
    else{
        return 0;
    }
}

function AnimateCockpit(object){
    let mesh = object["object"];
    let animation_frame = object["animation_frame"];
    if(animation_frame < 150){
        mesh.position.set(mesh.position.x-0.1,mesh.position.y,mesh.position.z);
        camera.position.set(camera.position.x-0.1,camera.position.y,camera.position.z);
        light.position.set(light.position.x-0.1,light.position.y,light.position.z);
        return animation_frame + 1;
    }
    else{
        return 0;
    }
}

function AnimateMe(object){
    let mesh = object["object"];
    let animation_frame = object["animation_frame"];
    if(animation_frame < 150){
        mesh.position.set(mesh.position.x-0.1,mesh.position.y,mesh.position.z);
        return animation_frame + 1;
    }
    else{
        return 0;
    }
}

function AnimateButton(object){
    let mesh = object["object"];
    let animation_frame = object["animation_frame"];
    if(animation_frame < 10){
        mesh.position.set(mesh.position.x,mesh.position.y-0.01,mesh.position.z);
        return animation_frame + 1;
    }
    else if (animation_frame < 20){
        mesh.position.set(mesh.position.x,mesh.position.y+0.01,mesh.position.z);
        return animation_frame + 1;
    }
    else{
        return 0;
    }
}

window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('pointerdown', (event) => {
    if(event.button === 0)
    {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const Children = scene.children;
        console.log(Children);
        // const filteredChildren = Children.filter(item => item.name !== "selector");
        
        const intersects = raycaster.intersectObjects(Children);

        if (intersects.length > 0) {
            const clickedObject = intersects[0].object;
            StartAnimation(clickedObject);
            console.log("you touched :" + clickedObject.name);
        }
    }
});

animate();
