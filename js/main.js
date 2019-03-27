
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

//var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
//var physicsPlugin = new BABYLON.CannonJSPlugin();

var groundName = 'ground1';
var groundWidth = 300, groundHeight = 300, divs = 2;

var sistParticulas = new Array();
var tiempo = 0;

function generadorDeParticulas(escena){
    /*if(iParticles % 60 == 0){
        var nombre = String("particula " + iParticles);
        sistParticulas.push(new Particula(escena.scene, nombre, 16, 2));
        iParticles++;
    }
    iParticles++;*/
}
//Variable que hará un conteo general de los espacios creados
var iGrounds;

window.addEventListener('DOMContentLoaded', function(){
    
    
    
    var escena = new Scene(scene, canvas, engine);
    escena.createScene();
    escena.createGround();
    escena.createLights();
    escena.generateShadows();
    escena.createGround(groundName, groundWidth, groundHeight, divs);
    

    
    var particula = new Particula(escena.scene, 'particula1', 16, 2);
    //particula.crearParticula();
    //particula.torus.
    //var particula2 = new Particula(escena.scene,'particula2', 2, 2.3);
    //particula2.setPosition(2, 1, 3);
    escena.scene.registerBeforeRender(function(){
        //setTimeout(generadorDeParticulas(escena),100000);
        tiempo ++;
        particula.setCoordinates(tiempo);

    });
    
    setInterval(generadorDeParticulas(escena), 1000);
    escena.engine.runRenderLoop(function(){
        generadorDeParticulas(escena);
        particula.getPosition();
        escena.scene.render();
    });
});
