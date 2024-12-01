import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as TWEEN from 'https://unpkg.com/@tweenjs/tween.js@25.0.0/dist/tween.esm.js'


//GENERAL SCENE SETUP :
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.001,10000);
const WorkSpace = document.getElementById("WorkSpace");
camera.position.set(29.4,-15,12);
camera.rotation.set(0.85,0,0);

const renderer = new THREE.WebGLRenderer({
    canvas : WorkSpace,
    antialias : true,
    alpha : true
});
renderer.setSize( window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio);

const light = new THREE.PointLight( 0xffffff, 3, 0, 0.01 );
light.position.set(29,-15,12);
scene.add( light );


const AmbientLightlight = new THREE.AmbientLight( 0xffffff, 0.1, 0, 0.01 );
scene.add( AmbientLightlight );



const groundGeom = new THREE.PlaneGeometry(1000,550);
const groundMat = new THREE.MeshStandardMaterial({color : "grey"}); 
const ground = new THREE.Mesh(groundGeom,groundMat); 
scene.add(ground);
ground.position.set(0,270,0);

let Able_To_Interact = true;

//LOAD ALL MODELS :
let objects_to_animate = [];
let objects_currently_animating = [];
const loader = new GLTFLoader();

let main_line_rotator;
loader.load( './items/main_line.glb', function ( glb ) 
{
    scene.add(glb.scene);
    main_line_rotator = glb.scene.getObjectByName('rotator');
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
let cockpit_animations;


let Control_Pannel_0 = [];
let Control_Pannel_1 = [];
let Control_Pannel_2 = [];
let Control_Pannel_3 = [];
let fake_green_buttons = [];
let fake_buttons_matrix = [];
let fake_contact_me_buttons = [];
let Current_Pannel = 0;
const skill_buttons_name = ["3D_Printing","Arduino","Kicad","Rasp","Blender","CNC","Csharp","HTML_JS_CSS","Laser_Cutting","Metal_Lathe","PCB_Engraving","Python","Skill_Button_Bonus","SolidWorks","Three_JS"];
const other_prupose_buttons_name = ["Red_Button", "Skills_Button","Experiences_Button","Contact_me_Button","Green_Button_Right","Green_Button_Left","Show_More_Button","Gmail_Button","Github_Button","Linkedin_Button"];

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
    Control_Pannel_1.push(glb.scene.getObjectByName("PCB_Engraving"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Python"));
    Control_Pannel_1.push(glb.scene.getObjectByName("SolidWorks"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Skill_Button_Bonus"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Skills_Button_Rings"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Three_JS"));
    Control_Pannel_1.push(glb.scene.getObjectByName("Central_Pannel_2"));

    
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Left'));
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Right'));
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Left_Ring'));
    Control_Pannel_2.push(glb.scene.getObjectByName('Green_Button_Right_Ring'));
    Control_Pannel_2.push(glb.scene.getObjectByName("Central_Pannel_2"));
    Control_Pannel_2.push(glb.scene.getObjectByName("Show_More_Button"));
    Control_Pannel_2.push(glb.scene.getObjectByName("Show_More_Button_ring"));

    Control_Pannel_3.push(glb.scene.getObjectByName("Linkedin_Button"));
    Control_Pannel_3.push(glb.scene.getObjectByName("Github_Button"));
    Control_Pannel_3.push(glb.scene.getObjectByName("Gmail_Button"));
    Control_Pannel_3.push(glb.scene.getObjectByName("Contact_Me_Buttons_Ring"));


    fake_buttons_matrix.push(glb.scene.getObjectByName("Fake_Button_Matrix"));
    fake_buttons_matrix.push(glb.scene.getObjectByName("Central_Pannel_2"));

    fake_green_buttons.push(glb.scene.getObjectByName("Cube053_1"));
    fake_green_buttons.push(glb.scene.getObjectByName("Cube053"));
    fake_green_buttons.push(glb.scene.getObjectByName("Central_Pannel_2"));
    fake_green_buttons.push(glb.scene.getObjectByName("Cube053_2"));
    fake_green_buttons.push(glb.scene.getObjectByName("Cube053_3"));

    fake_contact_me_buttons.push(glb.scene.getObjectByName("Central_Pannel_2"));
    fake_contact_me_buttons.push(glb.scene.getObjectByName("Contact_Me_Fake_Buttons"));

    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);

    cockpit_animations = glb.animations;
    Cockpit_animation_mixer = new THREE.AnimationMixer(glb.scene);
    Cockpit_animation_mixer.addEventListener( 'finished', function(e) { if(Current_Pannel == 0) {Able_To_Interact = true;} Show_Right_Pannel(0); } );
    cockpit_ready = true;

    Show_Right_Pannel(0);
});



let Mechanical_arm_animation_mixer;
let animations;
let mechanical_arm_animations_for_first_part = [];
let mechanical_arm_animations_for_second_part = [];
let mechanical_arm_ready = false;
let arm_is_moving;

let texture_loader = new THREE.TextureLoader();
texture_loader.crossOrigin = "";

let Skill_Description = document.getElementById("SkillDescription");
let Skill_Description_button = document.getElementById("SkillDescriptionButton");
let Skill_Description_tittle = document.getElementById("SkillDescriptionTittle");
let Skill_Description_image = document.getElementById("SkillDescriptionImage");
let Skill_Description_text = document.getElementById("SkillDescriptionText");

let Skill_Description_Scale = 0;
let Skill_Description_Show = false;
Skill_Description_button.addEventListener("click", Skill_Description_Hide);
let Skill_Cube;
let skill_cube_material = new THREE.MeshStandardMaterial();
let skills_texture_dict = 
{
    "3D_Printing" : "./items/textures/Skill_Cube/3D_Printing.png",
    "Arduino" : "./items/textures/Skill_Cube/Arduino.png",
    "Blender" : "./items/textures/Skill_Cube/Blender.png",
    "CNC" : "./items/textures/Skill_Cube/CNC.png",
    "Csharp" : "./items/textures/Skill_Cube/Csharp.png",
    "HTML_JS_CSS" : "./items/textures/Skill_Cube/HTML_JS_CSS.png",
    "Kicad" : "./items/textures/Skill_Cube/Kicad.png",
    "Laser_Cutting" : "./items/textures/Skill_Cube/Laser_Cutting.png",
    "Metal_Lathe" : "./items/textures/Skill_Cube/Metal_Lathe.png",
    "PCB_Engraving" : "./items/textures/Skill_Cube/PCB_Engraving.png",
    "Python" : "./items/textures/Skill_Cube/Python.png",
    "Rasp" : "./items/textures/Skill_Cube/Rasp.png",
    "SolidWorks" : "./items/textures/Skill_Cube/SolidWorks.png",
    "Three_JS" : "./items/textures/Skill_Cube/Three_JS.png",
    "Skill_Button_Bonus" : "./items/textures/Skill_Cube/Skill_Button_Bonus.png"
}

texture_loader.load(skills_texture_dict["3D_Printing"], function (e) {skill_cube_material.map = e});

loader.load( './items/mecanical_arm.glb', function ( glb )
{
    scene.add(glb.scene);
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);

    Skill_Cube = glb.scene.getObjectByName("skills_cube");
    Skill_Cube.material = skill_cube_material;
    animations = glb.animations;
    for(let i = 0; i < animations.length; i++){
        mechanical_arm_animations_for_first_part.push(THREE.AnimationUtils.subclip(animations[i], "mechanical_arm_1", 0, 81));
        mechanical_arm_animations_for_second_part.push(THREE.AnimationUtils.subclip(animations[i], "mechanical_arm_2", 81, 1000));
    }
    Mechanical_arm_animation_mixer = new THREE.AnimationMixer(glb.scene);
    mechanical_arm_ready = true;
    Mechanical_arm_animation_mixer.addEventListener( 'finished', () => {arm_is_moving = false; Able_To_Interact = true} );
});


let Experience_Rotator;
let Experience_Description = document.getElementById("ExperienceDescription");
let Experience_Description_button = document.getElementById("ExperienceDescriptionButton");
let Experience_Description_tittle = document.getElementById("ExperienceDescriptionTittle");
let Experience_Description_Div = document.getElementById("ExperienceDescriptionDiv");
let Experience_Description_image = document.getElementById("ExperienceDescriptionImage");
let Experience_Description_text = document.getElementById("ExperienceDescriptionText");
let Experience_Description_Scale = 0;
let Experience_Description_Show = false;
Experience_Description_button.addEventListener("click", Experience_Description_Hide);

let project_name_list = ["Optical_Bench_Support", "Innovation_Trophies","Drawing_Bot", "Remote_Warhammer","Three_JS_Portfolio", "Personal_Projects","Board_Games", "KickStarter"];
let project_mesh_list = [];
let project_text_list = []; 
let current_showned_project = 0;
let number_of_rotation_done = 0;

loader.load( './items/Experience_Stand.glb', function ( glb ) 
{
    scene.add(glb.scene);
    Experience_Rotator = glb.scene.getObjectByName("Rotator_Center");
    for (let i = 0; i < project_name_list.length; i++){
        project_mesh_list.push(glb.scene.getObjectByName(project_name_list[i]));
        project_text_list.push(glb.scene.getObjectByName(project_name_list[i]+ "_Text" ));
    }
    Show_Right_Project_Tittle()
    glb.scene.rotation.set(Math.PI/2,0,0);
    glb.scene.position.set(0,0,0);
});



function Show_Right_Pannel(target){
    Control_Pannel_0.forEach(element => {element.visible = false;});
    Control_Pannel_1.forEach(element => {element.visible = false;});
    Control_Pannel_2.forEach(element => {element.visible = false;});
    fake_buttons_matrix.forEach(element => {element.visible = false;});
    fake_green_buttons.forEach(element => {element.visible = false;});
    fake_contact_me_buttons.forEach(element => {element.visible = false;});
    Control_Pannel_3.forEach(element => {element.visible = false;});

    switch(Current_Pannel)
    {
        case 1 : Control_Pannel_1.forEach(element => {element.visible = true;}); break;
        case 2 : Control_Pannel_2.forEach(element => {element.visible = true;}); break;
        case 3 : Control_Pannel_3.forEach(element => {element.visible = true;}); break;
        default : break;
    }
    switch(target)
    {
        case 0 : Control_Pannel_0.forEach(element => {element.visible = true;}); break;
        case 1 : fake_buttons_matrix.forEach(element => {element.visible = true;}); break;
        case 2 : fake_green_buttons.forEach(element => {element.visible = true;}); break;
        case 3 : fake_contact_me_buttons.forEach(element => {element.visible = true;}); break;
        default : break;
    }
}

function Go_To_This_Machine(choice)
{
    let action;
    if(Current_Pannel == 3)
    {
        let tween_me_rotator = new TWEEN.Tween(Me.rotation).to({x : 0, y: 0, z : 0},800).start();
        objects_to_animate.push(tween_me_rotator);
        let tween_rotator = new TWEEN.Tween(main_line_rotator.rotation).to({x : 0, y: 0, z : 0},800)
        .onComplete(() => {
            Show_Right_Pannel(choice);
            Machine_Selection(choice);
            action = Cockpit_animation_mixer.clipAction(cockpit_animations[2]);
            action.setLoop(THREE.LoopOnce).reset().play();
            Current_Pannel = choice;
        }).start();
        objects_to_animate.push(tween_rotator);
    }
    else 
    {
        Show_Right_Pannel(choice);
        Machine_Selection(choice);
        action = Cockpit_animation_mixer.clipAction(cockpit_animations[2]);
        action.setLoop(THREE.LoopOnce).reset().play();
        Current_Pannel = choice;
    }
}

function Machine_Selection(choice){
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
            Cockpit_target_position = [-14,7,-2];
            break;
        case 2 :
            Me_target_position = [0,-2.7,0];
            Cockpit_target_position = [-30.2,7,-3];
            break;
        case 3 :
            Me_target_position = [-15.6,-2.7,0];
            Cockpit_target_position = [-45,6,-4];
            break;
    }
    let tween_Cockpit = new TWEEN.Tween(Cockpit.position).to({x : Cockpit_target_position[0], y: Cockpit_target_position[1], z : Cockpit_target_position[2]},2000).start();
    objects_to_animate.push(tween_Cockpit);
                        
    let tween_Me = new TWEEN.Tween(Me.position).to({x : Me_target_position[0], y: Me_target_position[1], z : Me_target_position[2]},2000)
                        .onComplete(() => {
                            if(choice == 3){
                                let tween_me_rotator = new TWEEN.Tween(Me.rotation).to({x : 0, y: Math.PI/2, z : 0},800).onComplete(() => {Able_To_Interact = true}).start();
                                objects_to_animate.push(tween_me_rotator);
                                let tween_rotator = new TWEEN.Tween(main_line_rotator.rotation).to({x : 0, y: Math.PI/2, z : 0},800).start();
                                objects_to_animate.push(tween_rotator);
                            }
                            else {Able_To_Interact = true;}
                        }).start();
    objects_to_animate.push(tween_Me);
}

function Animate_button(object){
    if( !(objects_currently_animating.includes(object.name)))
        {
            Able_To_Interact = false;
            let position_in_list = objects_to_animate.length;
            
            let tween = new TWEEN.Tween(object.position)
            .to({ x: object.position.x, y: object.position.y-0.15, z: object.position.z-0.05 }, 300) // Target position and duration
            .easing(TWEEN.Easing.Cubic.InOut) // Easing function
            .onComplete(() => {

                //triggers which event to execute depending on which button where pressed at the end of push animation :
                let action;
                
                if(skill_buttons_name.includes(object.name)){
                    if(!(arm_is_moving) )
                        {
                        texture_loader.load(skills_texture_dict[object.name], function (e) {skill_cube_material.map = e}); 
                        arm_is_moving = true;
                        for (let i = 0; i < mechanical_arm_animations_for_first_part.length; i++) {
                            action = Mechanical_arm_animation_mixer.clipAction(mechanical_arm_animations_for_first_part[i]);
                            action.clampWhenFinished = true;
                            action.setLoop(THREE.LoopOnce).reset().play();
                            
                        }
                        Skill_Description_Get_Right_Content(object.name);
                        Mechanical_arm_animation_mixer.addEventListener("finished", start_Skill_Description_Apparition);
                    }
                }
                else
                {
                        
                    switch(object.name)
                    {
                        case "Red_Button" :
                            Animate_Press();
                            action = Cockpit_animation_mixer.clipAction(cockpit_animations[1]);
                            action.clampWhenFinished = true;
                            action.setLoop(THREE.LoopOnce).reset().play();
                            Current_Pannel = 0;
                            break;

                        case "Skills_Button" :
                            if(Current_Pannel != 1){Go_To_This_Machine(1);} else {Able_To_Interact = true;}
                            break;

                        case "Experiences_Button" :
                            if(Current_Pannel != 2){Go_To_This_Machine(2);} else {Able_To_Interact = true;}
                            break;

                        case "Contact_me_Button" :
                            if(Current_Pannel != 3){Go_To_This_Machine(3);} else {Able_To_Interact = true;}
                            break;

                        case "Green_Button_Right":
                            
                            tween = new TWEEN.Tween(Experience_Rotator.rotation)
                            .to({ x: Experience_Rotator.rotation.x, y: Experience_Rotator.rotation.y-Math.PI/4, z: Experience_Rotator.rotation.z }, 300) // Target position and duration
                            .onComplete(() => {Able_To_Interact = true;
                            }).start();
                            objects_to_animate.push(tween);
                            current_showned_project--;
                            number_of_rotation_done++;
                            if(current_showned_project < 0){current_showned_project = 7;}
                            Show_Right_Project_Tittle();
                            break;

                        case "Green_Button_Left":
                            for(let i = 0; i < project_text_list.length; i++)
                            {
                                if(object.name == project_text_list[i].name){ project_text_list[i].visible = true;}
                                else{project_text_list[i].visible = false; }
                            }
                            tween = new TWEEN.Tween(Experience_Rotator.rotation)
                            .to({ x: Experience_Rotator.rotation.x, y: Experience_Rotator.rotation.y+Math.PI/4, z: Experience_Rotator.rotation.z }, 300) // Target position and duration
                            .onComplete(() => {Able_To_Interact = true;
                            }).start();
                            objects_to_animate.push(tween);
                            current_showned_project++;
                            number_of_rotation_done--;
                            if(current_showned_project > 7){current_showned_project = 0;}
                            Show_Right_Project_Tittle();
                            break;

                        case "Show_More_Button":
                            Experience_Description_Get_Right_Content(project_name_list[current_showned_project]);
                            let current_project_mesh = project_mesh_list[current_showned_project]; 
                            tween = new TWEEN.Tween(current_project_mesh.position)
                            .to({ x: current_project_mesh.position.x+6.5*Math.sin(number_of_rotation_done*(Math.PI/4)), y: current_project_mesh.position.y+3.5, z: current_project_mesh.position.z+6.5*Math.cos((number_of_rotation_done*Math.PI/4))}, 300) // Target position and duration
                            .onComplete(() => {
                                start_Experience_Description_Apparition();
                            }).start();
                            objects_to_animate.push(tween);
                            break
                        
                        case "Linkedin_Button":
                            open("https://www.linkedin.com/in/theo-lissarrague/");
                            Able_To_Interact = true
                            break;
                        
                        case "Github_Button":
                            open("https://github.com/theoliss");
                            Able_To_Interact = true
                            break;

                        case "Gmail_Button":
                            window.location.href='mailto:theo.lissarrague@gmail.com';
                            alert("Thank you for trying to contact me !\n If your mail applicaiton do not oppen automatically \n You can send me an email via theo.lissarrague@gmail.com")
                            Able_To_Interact = true
                            break;

                    }
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
                
            }
        )
            .start();
            objects_to_animate.push(tween);
            objects_currently_animating.push(object.name);
        }
}

function Show_Right_Project_Tittle(){
    for(let i = 0; i < project_text_list.length; i++)
        {
            if(project_name_list[current_showned_project] + "_Text" == project_text_list[i].name){ project_text_list[i].visible = true;}
            else{project_text_list[i].visible = false; }
        }
}

function Experience_Description_Get_Right_Content(name){
    let tittle = name.replaceAll("_"," ");
    Skill_Description_tittle.innerText = tittle;
    Experience_Description_tittle.innerText = tittle;
    Experience_Description_image.src = "./items/textures/Experiences_Photos/" + name + ".png";
    switch(name){
        case "Optical_Bench_Support": Experience_Description_text.innerText = 
        "Two years ago (2023), I was approached by my school's junior enterprise to design an optical bench support based on precise specifications. After analyzing the project's requirements, I created a 3D model, then a working prototype that I brought to life through CNC machining and 3D printing.";break;
        case "Innovation_Trophies": Experience_Description_text.innerText = 
        "For the past three years, I have been designing trophies for an indoor competition at my school for the staff. Each year, I tried to come up with new designs, combining various fabrication processes and materials.";break;
        case "Drawing_Bot": Experience_Description_text.innerText = 
        "My fourth year's project was to make a robot that is capable of drawing on walls. Thus, I constructed a base featuring stepper motors connected to plastic belts. The pen is held by a 3D-printed gear and rack, controlled by a servo motor. This project used and sharpend my skills in robotic, mecatronic and electronic.";break;
        case "Remote_Warhammer": Experience_Description_text.innerText = 
        "This project aims to reduce the distance between people during remote social interactions (remote meeting, remote gaming...). This project is composed of two tangible interfaces that are linked together. When an object is put on a table, it is then projected on the other one. Therefore this project can add realism to remote interactions.";break;
        case "Three_JS_Portfolio": Experience_Description_text.innerText = 
        "As you can see, I made a portfolio using 3D technology on web. This project started as a school project in which I put much effort into.";break;
        case "Personal_Projects": Experience_Description_text.innerText = 
        "As a maker, I am perpetualy making many projects that are capitalizing and augmenting my skill set.";break;
        case "Board_Games": Experience_Description_text.innerText = 
        "I developed a passion for designing board games during the COVID-19 lockdown. Since then, I have created five games and am considering commercializing some of them.";break;
        case "KickStarter" : Experience_Description_text.innerText = 
        "With friends, I co-created Mozaik and published it on Kickstarter. These leather coasters are designed to be modular, allowing them to be assembled together. This Kickstarter campaign reached 178% of its funding goal.";break;
    }
}

function Skill_Description_Get_Right_Content(name){
    let tittle = name.replaceAll("_"," ");
    Skill_Description_tittle.innerText = tittle;
    Skill_Description_image.src = "./items/textures/Skill_Cube/" + name + ".png";
    switch(name){
        case "Kicad" : Skill_Description_text.innerText =
        "I have used KiCad for numerous electrical projects over the years to design PCBs involved in them."; break;
        case "Rasp" : Skill_Description_text.innerText =
        "I discovered Raspberry Pi a long time ago and began exploring it in depth during my internship last year. I implemented a system to track the electrical consumption of industrial machines using ModBus communication."; break;
        case "Blender" : Skill_Description_text.innerText =
        "I have been passionate about Blender for a long time, teaching myself and then to ohters how to use it through various projects."; break;
        case "CNC" : Skill_Description_text.innerText =
        "Thanks to the many machines available at my school, I learned how to use CNC machining on different materials (wood, aluminum, plexiglass, etc.)."; break;
        case "Csharp" : Skill_Description_text.innerText =
        "I took several C# classes during my academic training and applied the knowledge in practical projects (especially in Unity projects)."; break;
        case "HTML_JS_CSS" : Skill_Description_text.innerText =
        "I discovered the power of combining HTML, CSS, and JavaScript during my academic studies and found it valuable for deploying applications built for other projects."; break;
        case "Laser_Cutting" : Skill_Description_text.innerText =
        "During my time at my school's FabLab, I spent a lot of time using various machines. Laser cutting proved to be an excellent tool for creating quick prototypes."; break;
        case "Metal_Lathe" : Skill_Description_text.innerText =
        "I worked with a metal lathe during my time at the Devinci FabLab, crafting various objects using this technology (rings, lightsaber hilts, etc.)."; break;
        case "PCB_Engraving" : Skill_Description_text.innerText =
        "Engraving PCBs is a fast and clean method of creating electrical circuits. I used this technique for many electrical projects, appreciating the ability to iterate much faster than when ordering custom PCBs."; break;
        case "Python" : Skill_Description_text.innerText =
        "I started coding in Python at a young age. Now, I use it for numerous projects, particularly those involving AI and data analysis."; break;
        case "SolidWorks" : Skill_Description_text.innerText =
        "I use SolidWorks for all technical designs required for 3D printing or CNC machining. Over the past five years, I have honed my SolidWorks skills through numerous projects and even occasionally teach it to other members of the Devinci FabLab."; break;
        case "Three_JS" : Skill_Description_text.innerText =
        "I discovered Three.js through the project you are currently viewing. I aim to further develop my skills in this field as I see its potential to enhance product websites."; break;
        case "3D_Printing": Skill_Description_text.innerText =
        "This technology is an essential of any FabLab. During my time at the Devinci FabLab, I used it extensively, taught it to other members, and even participated in maintaining and repairing our machines.";break;
        case "Arduino": Skill_Description_text.innerText = 
        "I began creating electrical devices with Arduino, using it for various projects, including robots, games, and prototypes.";break;
        case "Skill_Button_Bonus" : Skill_Description_text.innerText =
        "I am really enjoyed by learning new things, so this button should be completed with a new skill soon..."; break;
    }
}

const start_Skill_Description_Apparition = function () {
    Skill_Description_Show = true;
    Mechanical_arm_animation_mixer.removeEventListener("finished", start_Skill_Description_Apparition);
}

function Skill_Description_Appear(){
    if(Skill_Description_Scale <= 1) {
        Skill_Description_Scale += 0.05;
        Skill_Description.style.scale = Skill_Description_Scale;
    }
}

const start_Experience_Description_Apparition = function () {
    Experience_Description_Show = true;
}

function Experience_Description_Appear(){
    if(Experience_Description_Scale <= 1) {
        Experience_Description_Scale += 0.05;
        Experience_Description.style.scale = Experience_Description_Scale;
    }
}
function Experience_Description_Hide(){
    Experience_Description_Scale = 0; 
    Experience_Description.style.scale = Experience_Description_Scale; 
    Experience_Description_Show = false; 
    let current_project_mesh = project_mesh_list[current_showned_project];
    let tween = new TWEEN.Tween(current_project_mesh.position)
    .to({ x: current_project_mesh.position.x-6.5*Math.sin(number_of_rotation_done*(Math.PI/4)), y: current_project_mesh.position.y-3.5, z: current_project_mesh.position.z-6.5*Math.cos((number_of_rotation_done*Math.PI/4))}, 300) // Target position and duration
    .onComplete(() => {
        Able_To_Interact = true;
    }).start();
    objects_to_animate.push(tween);
}

function Skill_Description_Hide() {
    Able_To_Interact = false;
    Skill_Description_Scale = 0; 
    Skill_Description.style.scale = Skill_Description_Scale; 
    Skill_Description_Show = false; 
    
    let action ;
    if(!(arm_is_moving))
        {
        arm_is_moving = true;
        Mechanical_arm_animation_mixer.stopAllAction();
        for (let i = 0; i < mechanical_arm_animations_for_first_part.length; i++) {
            action = Mechanical_arm_animation_mixer.clipAction(mechanical_arm_animations_for_second_part[i]);
            action.setLoop(THREE.LoopOnce).reset().play();
        }
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
    if(Skill_Description_Show == false && Experience_Description_Show == false && Able_To_Interact == true){
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
                        if(clickedObject.visible == true && clickedObject.parent.visible == true) 
                        {
                            if(skill_buttons_name.includes(clickedObject.parent.name) || other_prupose_buttons_name.includes(clickedObject.parent.name))   
                            {
                                clickedObject = clickedObject.parent;
                            }
                            break;
                        }
                    }
                    console.log(clickedObject);
                    if(other_prupose_buttons_name.includes(clickedObject.name) || skill_buttons_name.includes(clickedObject.name))
                    {   
                        Animate_button(clickedObject);
                    }
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
    if (Skill_Description_Show) { Skill_Description_Appear();}
    if (Experience_Description_Show) { Experience_Description_Appear();}
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
