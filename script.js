import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as TWEEN from 'https://unpkg.com/@tweenjs/tween.js@25.0.0/dist/tween.esm.js'




//GENERAL SCENE SETUP :
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

const groundGeom = new THREE.PlaneGeometry(1000,550);
const groundMat = new THREE.MeshStandardMaterial({color : "grey"}); 
const ground = new THREE.Mesh(groundGeom,groundMat); 
scene.add(ground);
ground.position.set(0,270,0);





//LOAD ALL MODELS :
let objects_to_animate = [];
let objects_currently_animating = [];
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
let cockpit_ready = false;
let Cockpit_animation_mixer;
let Cockpit_animation_mixer_2;
let cockpit_animations;

let Control_Pannel_0 = [];
let Control_Pannel_1 = [];
let Control_Pannel_2 = [];
let fake_green_buttons = [];
let fake_buttons_matrix = [];
let Current_Pannel = 0;
const skill_buttons_name = ["3D_Printing","Arduino","Kicad","Rasp","Blender","CNC","Csharp","HTML_JS_CSS","Laser_Cutting","Metal_Lathe","PBC_Engraving","Python","Skill_Button_Bonus","SolidWorks","Three_JS"];

loader.load( './items/control_panel.glb', function ( glb ) 
{
    Cockpit = glb.scene;
    scene.add(glb.scene);
    
    Control_Pannel_0.push(glb.scene.getObjectByName('Red_Button'));
    Control_Pannel_0.push(glb.scene.getObjectByName('Button_ring'));
    Control_Pannel_0.push(glb.scene.getObjectByName('Central_Pannel'));

    Control_Pannel_1.push(glb.scene.getObjectByName("3D_Printing"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Arduino"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Kicad"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Rasp"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Blender"));
    Control_Pannel_1.push(glb.scene.getObjectByName("CNC"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Csharp"));
    Control_Pannel_1.push(glb.scene.getObjectByName("HTML_JS_CSS"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Laser_Cutting"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Metal_Lathe"));
    Control_Pannel_1.push(glb.scene.getObjectByName("PBC_Engraving"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Python"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Skill_Button_Bonus"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Skills_Button_Rings"));
    Control_Pannel_1.push(glb.scene.getObjectByName("SolidWorks"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Three_JS"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Central_Pannel_2"));

    
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Left'));
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Right'));
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Left_Ring'));
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Right_Ring'));
    Control_Pannel_2.push(glb.scene.getObjectByName("Central_Pannel_2"));

    fake_buttons_matrix.push(glb.scene.getObjectByName("Fake_Button_Matrix"));
    fake_buttons_matrix.push(glb.scene.getObjectByName("Central_Pannel_2"));

    fake_green_buttons.push(glb.scene.getObjectByName("Cube053_1"));
    fake_green_buttons.push(glb.scene.getObjectByName("Cube053"));
    fake_green_buttons.push(glb.scene.getObjectByName("Central_Pannel_2"));


    console.log(Control_Pannel_0);
    console.log(Control_Pannel_1);
    console.log(Control_Pannel_2);

    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);

    cockpit_animations = glb.animations;
    Cockpit_animation_mixer = new THREE.AnimationMixer(glb.scene);
    Cockpit_animation_mixer.addEventListener( 'finished', function(e) { Show_Right_Pannel(0)} );
    cockpit_ready = true;

    Show_Right_Pannel(0);
});



let Mechanical_arm_animation_mixer;
let animations;
let mechanical_arm_ready = false;
let arm_is_moving;
loader.load( './items/mecanical_arm.glb', function ( glb )
{
    scene.add(glb.scene);
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);

    animations = glb.animations;
    Mechanical_arm_animation_mixer = new THREE.AnimationMixer(glb.scene);
    mechanical_arm_ready = true;
    Mechanical_arm_animation_mixer.addEventListener( 'finished', () => {arm_is_moving = false} );
});

function Show_Right_Pannel(target){
    Control_Pannel_0.forEach(element => {element.visible = false;});
    Control_Pannel_1.forEach(element => {element.visible = false;});
    Control_Pannel_2.forEach(element => {element.visible = false;});
    fake_buttons_matrix.forEach(element => {element.visible = false;});
    fake_green_buttons.forEach(element => {element.visible = false;});
    //Control_Pannel_3.forEach(element => {element.visible = false;});

    switch(Current_Pannel)
    {
        case 1 : Control_Pannel_1.forEach(element => {element.visible = true;}); break;
        case 2 : Control_Pannel_2.forEach(element => {element.visible = true;}); break;
        default : break;
        //case 3 :Control_Pannel_3.forEach(element => {element.visible = true;}); break;
    }
    switch(target)
    {
        case 0 : Control_Pannel_0.forEach(element => {element.visible = true;}); break;
        case 1 : fake_buttons_matrix.forEach(element => {element.visible = true;}); break;
        case 2 : fake_green_buttons.forEach(element => {element.visible = true;}); break;
        default : break;
        //case 3 :Control_Pannel_3.forEach(element => {element.visible = true;}); break;
    }
}



function Go_To_This_Machine(choice)
{
    let Me_target_position;
    let Cockpit_target_position;
    switch (choice) 
    {
        case 0 :
            Me_target_position = [31,-2.7,0];
            Cockpit_target_position = [0,0,0];
            break;
        case 1 :
            Me_target_position = [17,-2.7,0];
            Cockpit_target_position = [-14,5,-2];
            break;
        case 2 :
            Me_target_position = [3,-2.7,0];
            Cockpit_target_position = [-29,5,-4];
            break;
        case 3 :
            Me_target_position = [-15,-2.7,0];
            Cockpit_target_position = [-46,5,-4];
            break;
    }
    let tween_Cockpit = new TWEEN.Tween(Cockpit.position).to({x : Cockpit_target_position[0], y: Cockpit_target_position[1], z : Cockpit_target_position[2]},2000)
                    .onComplete(() => {
                        objects_currently_animating = objects_currently_animating.filter(function(e) { return e !== Cockpit.name });
                        })
                    .start();
    objects_to_animate.push(tween_Cockpit);
    objects_currently_animating.push(Cockpit.name);
                        
    let tween_Me = new TWEEN.Tween(Me.position).to({x : Me_target_position[0], y: Me_target_position[1], z : Me_target_position[2]},2000)
                        .onComplete(() => {
                            objects_currently_animating = objects_currently_animating.filter(function(e) { return e !== Me.name });
                        })
                        .start();
    objects_to_animate.push(tween_Me);
    objects_currently_animating.push(Me.name);
}



function Animate_button(object){
    if( !(objects_currently_animating.includes(object.name)))
        {
            let position_in_list = objects_to_animate.length;
    
            let tween = new TWEEN.Tween(object.position)
            .to({ x: object.position.x, y: object.position.y-0.15, z: object.position.z-0.05 }, 300) // Target position and duration
            .easing(TWEEN.Easing.Cubic.InOut) // Easing function
            .onComplete(() => {

                //triggers starts of event depending on which button where pressed :
                let action;
                switch(object.name)
                {
                    case "Red_Button" :
                        Animate_Press();
                        Show_Right_Pannel(0);
                        action = Cockpit_animation_mixer.clipAction(cockpit_animations[0]);
                        action.clampWhenFinished = true;
                        action.setLoop(THREE.LoopOnce).reset().play();
                        Current_Pannel = 0;
                        break;

                    case "Skills_Button" :
                        Go_To_This_Machine(1);
                        Show_Right_Pannel(1);
                        Current_Pannel = 1;
                        action = Cockpit_animation_mixer.clipAction(cockpit_animations[2]);
                        action.setLoop(THREE.LoopOnce).reset().play();
                        break;

                    
                    case "Experiences_Button" :
                        Go_To_This_Machine(2);
                        Show_Right_Pannel(2);
                        action = Cockpit_animation_mixer.clipAction(cockpit_animations[2]);
                        action.setLoop(THREE.LoopOnce).reset().play();
                        Current_Pannel = 2;
                        break;

                    case "Contact_me_Button" :
                        Show_Right_Pannel(3);
                        Go_To_This_Machine(3);
                        Current_Pannel = 3;
                        break;

                    case "Green_Button_Right":
                        if(!(arm_is_moving)){
                            arm_is_moving = true;
                            for (let i = 0; i < animations.length; i++) {
                                Mechanical_arm_animation_mixer.clipAction(animations[i]).setLoop(THREE.LoopOnce).reset();
                                Mechanical_arm_animation_mixer.clipAction(animations[i]).setLoop(THREE.LoopOnce).play();
                            }
                        }
                        break;

                }
                tween = new TWEEN.Tween(object.position).to({x: object.position.x, y: object.position.y+0.15, z: object.position.z+0.05 }, 300)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onComplete(() => 
                            {
                                //Remove the tween and the object from the list of object that are animating :
                                objects_currently_animating = objects_currently_animating.filter(function(e) { return e !== object.name });
                                objects_to_animate.splice(position_in_list,1);
                            })
                        .start();
                objects_to_animate.push(tween);
            })
            .start();
            objects_to_animate.push(tween);
            objects_currently_animating.push(object.name);
        }
}



function Animate_Press(){
    let position_in_list = objects_to_animate.length;

    let tween_Press = 
        new TWEEN.Tween(Press.position)
            .to({ x: Press.position.x, y: Press.position.y-5.5, z: Press.position.z }, 300) // Target position and duration
            .easing(TWEEN.Easing.Cubic.InOut) // Easing function
            .onComplete(() => {
                tween_Press = new TWEEN.Tween(Press.position).to({x: Press.position.x, y: Press.position.y+5.5, z: Press.position.z }, 300)
                        .easing(TWEEN.Easing.Cubic.InOut)
                        .onComplete(() => 
                            {
                                //Remove the tween and the object from the list of object that are animating :
                                objects_currently_animating = objects_currently_animating.filter(function(e) { return e !== Press.name });
                                objects_to_animate.splice(position_in_list,1);
                            })
                        .start();
                objects_to_animate.push(tween_Press);
            })
            .start();
        objects_to_animate.push(tween_Press);

    let tween_Me = new TWEEN.Tween(Me.position)
    .to({ x: Me.position.x, y: Me.position.y-6, z: Me.position.z }, 300) // Target position and duration
    .easing(TWEEN.Easing.Cubic.InOut) // Easing function
    .onComplete(() => {
        //Remove the tween and the object from the list of object that are animating :
        objects_currently_animating = objects_currently_animating.filter(function(e) { return e !== Me.name });
        objects_to_animate.splice(position_in_list,1);
    })
    .start();
            objects_to_animate.push(tween_Me);
            objects_currently_animating.push(Me.name);
}


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
window.addEventListener('pointerdown', (event) => {
    if(event.button === 0)
    {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);

        const Children = scene.children;
        const intersects = raycaster.intersectObjects(Children);

        if (intersects.length > 0) {
            let clickedObject;
            for (let i = 0; i < intersects.length; i++)
            {
                clickedObject = intersects[i].object;
                if(clickedObject.visible == true) 
                {
                    if(skill_buttons_name.includes(clickedObject.parent.name))   
                    {
                        clickedObject = clickedObject.parent;
                    }
                    break;
                }
            }
            if(["Red_Button", "Skills_Button","Experiences_Button","Contact_me_Button","Green_Button_Right","Green_Button_Left"].includes(clickedObject.name) || skill_buttons_name.includes(clickedObject.name))
            {
                Animate_button(clickedObject);
            }
        }
    }
});


window.addEventListener('resize', () => {
    // Update the camera
    camera.aspect =  window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    // Update the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
});

let cockpit_clock = new THREE.Clock();
let mechanical_arm_clock = new THREE.Clock();
const animate = () => {
    
    if (cockpit_ready) Cockpit_animation_mixer.update(cockpit_clock.getDelta());
    if (mechanical_arm_ready) Mechanical_arm_animation_mixer.update(mechanical_arm_clock.getDelta());
    requestAnimationFrame(animate);
    if (objects_to_animate.length != 0)
    {
        objects_to_animate.forEach((element) => element.update());
    }
    if(Cockpit) camera.position.set(Cockpit.position.x+29.4, Cockpit.position.y-15,Cockpit.position.z+12);
    renderer.render(scene, camera);
    //control.update();
};


animate();
