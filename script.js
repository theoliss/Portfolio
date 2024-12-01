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
    console.log(Skill_Cube);
    Skill_Cube.material = skill_cube_material;
    animations = glb.animations;
    console.log(animations);
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
    console.log(project_text_list);
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
                                console.log(Me.rotation);
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
                            console.log("number_of_rotation_done" , number_of_rotation_done);
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
    Experience_Description_tittle.innerText = name;
    Experience_Description_image.src = "./items/textures/Experiences_Photos/" + name + ".png";
    switch(name){
        case "Optical_Bench_Support": Skill_Description_text.innerText = 
        "";break;
        case "Innovation_Trophies": Skill_Description_text.innerText = 
        "";break;
        case "Drawing_Bot": Skill_Description_text.innerText = 
        "";break;
        case "Remote_Warhammer": Skill_Description_text.innerText = 
        "";break;
        case "Three_JS_Portfolio": Skill_Description_text.innerText = 
        "";break;
        case "Personal_Projects": Skill_Description_text.innerText = 
        "";break;
        case "Board_Games": Skill_Description_text.innerText = 
        "";break;
        case "KickStarter" : Skill_Description_text.innerText = 
        "";break;
    }
}

function Skill_Description_Get_Right_Content(name){
    Skill_Description_tittle.innerText = name;
    Skill_Description_image.src = "./items/textures/Skill_Cube/" + name + ".png";
    switch(name){
        case "Kicad" : Skill_Description_text.innerText =
        "I have used Kicad in many electrical projects troughtout the years to make the design of any PCB involved into it."; break;
        case "Rasp" : Skill_Description_text.innerText =
        "I descovered RaspBerry Pi a long time ago but really put my hands into it during last year for my internship. Indeed I incorporated a way of tracking the electrical consuption of industrial machines using ModBus communication."; break;
        case "Blender" : Skill_Description_text.innerText =
        "I have been pationate by Blender since a long time. I learned how to use it by myself throught different projects."; break;
        case "CNC" : Skill_Description_text.innerText =
        "Thanks to the many machines available at my school, I could apprehend how to use CNC machining on several materials (wood, aluminium, plexiglass...)"; break;
        case "Csharp" : Skill_Description_text.innerText =
        "I took several class of C# during my achademical formation and used it in concret projects (especially on Unity projets)."; break;
        case "HTML_JS_CSS" : Skill_Description_text.innerText =
        "I discovered the great combination of HTML CSS JS during my academical formation and find it added value for deployng applications made for other projects."; break;
        case "Laser_Cutting" : Skill_Description_text.innerText =
        "During my time at the FabLab of my school, I spend much time using the several machines we had. Laser cutting was a great way of making quick prototypes."; break;
        case "Metal_Lathe" : Skill_Description_text.innerText =
        "I played with metal lathe during my time at the Devinci FabLab. I have made different kinds of objects thank to this technologies (rings, laser sabers...)"; break;
        case "PCB_Engraving" : Skill_Description_text.innerText =
        "Engraving PCB is a fast and clean way of making electrical circuit. I used this technology for many of my electrical projects. The added value of making its own PCB is the possibility of iterate much faster that when commanding it."; break;
        case "Python" : Skill_Description_text.innerText =
        "I first started coding with python when I was pretty young. Now I used it for many project related to AI or data analysis."; break;
        case "SolidWorks" : Skill_Description_text.innerText =
        "I use SolidWorks for every technical design needed for 3d printing or CNC machining. I have develloped my SolidWorks skills by making the CAO of the many projects I have done for 5 years now. I even somtime teach SolidWorks to the other member of the Devinci FabLab"; break;
        case "Three_JS" : Skill_Description_text.innerText =
        "I discovered Three JS with this project you are currently witnessing. I would like to continue to devellop my skills in this field because I think it can add much value to the website of the product I could want to show in the future."; break;
        case "3D_Printing": Skill_Description_text.innerText =
        "This technology is the bare minimum for any FabLab. Therefore, during my time in the Devinci FabLab, I used it many times in several projects, teach this technology to other members and even participated in the fixing the machines of our fablab";break;
        case "Arduino": Skill_Description_text.innerText = 
        "I started my journey into making electrical devices with Arduino and used it many times either for making robots, games or prototypes";break;
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
