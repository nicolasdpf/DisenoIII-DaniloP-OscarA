
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);

//var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
//var physicsPlugin = new BABYLON.CannonJSPlugin();

var groundName = 'ground1';
var groundWidth = 1000, groundHeight = 1000, divs = 2;

var sistParticulas = new Array();
var tiempo = 0;
var iParticles = 0;
function generadorDeParticulas(escena){
    if(tiempo % 60 == 0){
        var nombre = String("p " + iParticles);
        sistParticulas.push(new Particula(escena.scene, nombre, 16, 2));
        sistParticulas[iParticles].setCoordinates(tiempo);
        iParticles++;
    }
}
//Variable que hará un conteo general de los espacios creados
var iGrounds;

window.addEventListener('DOMContentLoaded', function(){
    
    
    
    var escena = new Scene(scene, canvas, engine);
    escena.createScene();
    //escena.createGround();
    escena.createLights();
    escena.generateShadows();
    escena.createGround(groundName, groundWidth, groundHeight, divs);
    
    
    
    //var particula = new Particula(escena.scene, 'p1', 16, 2);
    //particula.crearParticula();
    //particula.torus.
    //var particula2 = new Particula(escena.scene,'particula2', 2, 2.3);
    //particula2.setPosition(2, 1, 3);
    escena.scene.registerBeforeRender(function(){
        //setTimeout(generadorDeParticulas(escena),100000);
        
    });
    
    setInterval(generadorDeParticulas(escena), 1000);
    escena.engine.runRenderLoop(function(){
        
        tiempo ++;
        generadorDeParticulas(escena);
        //particula.getPosition();
        escena.scene.render();
    });
});


//TEST GITHUB