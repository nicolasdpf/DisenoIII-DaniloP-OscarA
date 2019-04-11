
var canvas = document.getElementById('renderCanvas');
var engine = new BABYLON.Engine(canvas, true);
var scene = new BABYLON.Scene(engine);


var groundName = 'ground1';
var groundWidth = 500, groundHeight = 500, divs = 2;

var sistParticulas = new Array();
var tiempo = 0;
var iParticles = 0;



function generadorDeParticulas(escena){
    if(tiempo % 60 == 0){
        var nombre = String("p " + iParticles);
            sistParticulas.push(new Particula(escena.scene, nombre, 16, 10));
            sistParticulas[iParticles].setCoordinates(tiempo);
            let index;
            for (index = 0; index < sistParticulas.length; index++) {
                if(tiempo % 90 === 0 && index % 2 === 0){
                    sistParticulas[index].setCoordinates(tiempo);
                }
                if(tiempo % 30 === 0 && index % 3 === 0){
                    sistParticulas[index].setCoordinates(tiempo);
                }
                if(tiempo % 70 === 0 && index % 4 === 0){
                    sistParticulas[index].setCoordinates(tiempo);
                }
        }
        iParticles++;
    }
}

//Variable que hará un conteo general de los espacios creados
var iGrounds;

window.addEventListener('DOMContentLoaded', function(){
    
    var gravityVector = new BABYLON.Vector3(0,-9.81, 0);
    var physicsPlugin = new BABYLON.CannonJSPlugin();
    
    var escena = new Scene(scene, canvas, engine);
    escena.createScene();
    escena.createLights();
    escena.generateShadows();
    escena.createGround(groundName, groundWidth, groundHeight, divs);
    
    var ob1 = new Obstaculo(escena.scene,'o1',5,Math.floor(Math.random()*(40 - (-30) + 1) + 1));
    ob1.setPosition(Math.floor(Math.random()*(200 - (-200) + 1)) + 1,1,Math.floor(Math.random()*(200 - (-200) + 1)));
    var ob2 = new Obstaculo(escena.scene,'o1',5,Math.floor(Math.random()*(40 - (-30) + 1) + 1));
    ob2.setPosition(Math.floor(Math.random()*(200 - (-200) + 1)) + 1,1,Math.floor(Math.random()*(200 - (-200) + 1)));
    var ob3 = new Obstaculo(escena.scene,'o1',5,Math.floor(Math.random()*(40 - (-30) + 1) + 1));
    ob3.setPosition(Math.floor(Math.random()*(200 - (-200) + 1)) + 1,1,Math.floor(Math.random()*(200 - (-200) + 1)));

    var particula = new Particula(escena.scene, "PPP", 16, 10);


    var redMat = new BABYLON.StandardMaterial("red", scene);
	redMat.diffuseColor = new BABYLON.Color3(1, 0, 0);
	
	/******* Solid Particle System Parameters*********/
	
	//Base particle
    var particleRadius = 10;

    var particleSpeedX = 0.25 * Math.random() * particleRadius; 
	var particleSpeedY = 0.25 * Math.random() * particleRadius;
	var particleSpeedZ = 0.25 * Math.random() * particleRadius;
	
	var particleNb = 20;
	
	/**************CONTAINING BOX***************/
	
	var boxSize = 400;
	var innerSize = boxSize - 2 * particleRadius;
	
    
    var ground = BABYLON.MeshBuilder.CreateGround("ground", {width:2 * boxSize, height:2 * boxSize}, scene);
	ground.position.y = -boxSize;
	
    var wallLeft = BABYLON.MeshBuilder.CreatePlane("wallLeft", {width: 2 * boxSize, height:2 * boxSize}, scene);
	wallLeft.rotation.y = -Math.PI/2;
	wallLeft.position.x = -boxSize;
	
	var wallRight = BABYLON.MeshBuilder.CreatePlane("wallRight", {width: 2 * boxSize, height:2 * boxSize}, scene);
	wallRight.rotation.y = Math.PI/2;
	wallRight.position.x = boxSize;
	
	var wallFront = BABYLON.MeshBuilder.CreatePlane("wallFront", {width: 2 * boxSize, height:2 * boxSize}, scene);
	wallFront.rotation.y = Math.PI;
	wallFront.position.z = -boxSize;
	
	var wallBack = BABYLON.MeshBuilder.CreatePlane("wallBack", {width: 2 * boxSize, height:2 * boxSize}, scene);
	wallBack.position.z = boxSize;
	
	var roof = ground.clone("roof");
	roof.rotation.x = Math.PI;
	roof.position.y = boxSize;

    var leftNorm = new BABYLON.Vector3(1, 0, 0);
	//var leftPosition = new BABYLON.Vector3(-boxSize, 0, 0);
	
	var rightNorm = new BABYLON.Vector3(-1, 0, 0);
	//var rightPosition = new BABYLON.Vector3(boxSize, 0, 0);
	
	var frontNorm = new BABYLON.Vector3(0, 0, 1);
	//var frontPosition = new BABYLON.Vector3(0, 0, -boxSize);
	
	var backNorm = new BABYLON.Vector3(0, 0, -1);
	//var backPosition = new BABYLON.Vector3(0, 0, boxSize);
	
	var groundNorm = new BABYLON.Vector3(0, 1, 0);
	//var groundPosition = new BABYLON.Vector3(0, -boxSize, 0);
	
	var roofNorm = new BABYLON.Vector3(0, -1, 0);
	//var roofPosition = new BABYLON.Vector3(0, boxSize, 0);
	
	/******* Solid Particle System*****************/
	var sphere = BABYLON.MeshBuilder.CreateSphere('sphere',{diameter:  2*  particleRadius, segments:8}, scene);
    sphere.physicsImpostor = new BABYLON.PhysicsImpostor(mesh, BABYLON.PhysicsImpostor.SphereImpostor, {mass: Math.random(), restitution: 0}, scene);
	var SPS = new BABYLON.SolidParticleSystem('SPS', scene,  {particleIntersection: true});
	SPS.addShape(sphere, particleNb);
	sphere.dispose();
	var mesh = SPS.buildMesh();
	
	//q is any other particle than the current particle
	
	//CURRENT POSITION
	var dx = 0; //difference of centres along x axis
	var dy = 0; //difference of centres along y axis
	var dz = 0; //difference of centres along z axis
	var dx2 = 0; //difference squared along x axis
	var dy2 = 0; //difference squared along y axis
	var dz2 = 0; //difference squared along z axis
	var dl = 0; // length between centres
	var dl2 = 0; //length squared
	var nx = 0; // component of unit vector along line joining centres r
	var ny = 0; // component of unit vector along line joining centres r
	var nz = 0; // component of unit vector along line joining centres r
	var pdotr = 0; //particle velocity dot (nx, ny, nz)
	var qdotr = 0; // q velocity dot r (nx, ny, nz)
	
	//CURRENT VELOCITIES
	var vx = 0; //difference of velocities along x axis
	var vy = 0; //difference of velocities along y axis
	var vz = 0; //difference of velocities along z axis
	var vx2 = 0; //difference squared along x axis
	var vy2 = 0; //difference squared along y axis
	var vz2 = 0; //difference squared along z axis
	var vl = 0; // sqrt diff dot diff
	var vl2 = 0; // diff dot diff
	var vdotd = 0; // diff of velocities dot diff of positions
	
	var sq = 0; // quadratic b^2 - 4ac
	var sqroot = 0; // root of b^2 - 4ac
	var t = 0; //time to collision
	
	// SPS initialization 
	SPS.initParticles = function() {
		for (var p = 0; p < SPS.nbParticles; p++) {
			var x = innerSize - 2 * innerSize * Math.random();
			//var y = innerSize - 2 * innerSize * Math.random();
            var y = 0;
			var z = innerSize - 2 * innerSize * Math.random();
		
			SPS.particles[p].position = new BABYLON.Vector3(x, y, z);
			SPS.particles[p].direction = new BABYLON.Vector3(Math.floor(2.99 * Math.random())- 1, Math.floor(2.99 * Math.random())- 1, Math.floor(2.99 * Math.random())- 1);
			SPS.particles[p].velocity = new BABYLON.Vector3(particleSpeedX * SPS.particles[p].direction.x, particleSpeedY * SPS.particles[p].direction.y, particleSpeedZ * SPS.particles[p].direction.z);
			SPS.particles[p].color = new BABYLON.Color4(0, Math.random(), Math.random(), 1);
		}
		SPS.particles[0].color = new BABYLON.Color4(1, 0, 0, 1); //allows on particle to be followed
		
		
	};
	
	var epsilon = 0.00001; // 
	
	SPS.updateParticle = function(particle) { 
		for (var p = particle.idx + 1; p < SPS.nbParticles; p++) {	
			var q = SPS.particles[p];
			dx = particle.position.x - q.position.x;
			dy = particle.position.y - q.position.y;
			dz = particle.position.z - q.position.z;
			dx2 = dx * dx;
			dy2 = dy * dy;
			dz2 = dz * dz;
			dl2 = dx2 + dy2 + dz2;
		
			vx = particle.velocity.x - q.velocity.x;
			vy = particle.velocity.y - q.velocity.y;
			vz = particle.velocity.z - q.velocity.z;
			vx2 = vx * vx;
			vy2 = vy * vy;
			vz2 = vz * vz;
			vl2 = vx2 + vy2 + vz2;
		
			vdotd = dx * vx + dy * vy + dz * vz;
		
			sq = 4 * vdotd * vdotd - 4 * vl2 * (dl2 - 4 * particleRadius * particleRadius);
		
			if(vdotd < 0 && sq >0) {
				sqroot = Math.sqrt(sq);
				t = (-2 * vdotd - sqroot)/(2 * vl2);
				if(0 < t && t <= 1 ) {

					//new velocity
					dx += vx;
					dy += vy;
					dz += vz;
					dx2 = dx * dx;
					dy2 = dy * dy;
					dz2 = dz * dz;
					dl2 = dx2 + dy2 + dz2;
					if(dl2 == 0) {
						dl2 = 1;
					}
					dl = Math.sqrt(dl2);
					nx = dx/dl;
					ny = dy/dl;
					nz = dz/dl;
				
					vdotn = nx * vx + ny * vy + nz * vz;
				
					particle.velocity.x -= vdotn * nx;
					particle.velocity.y -= vdotn * ny;
					particle.velocity.z -= vdotn * nz;
					q.velocity.x += vdotn * nx;
					q.velocity.y += vdotn * ny;
					q.velocity.z += vdotn * nz;
				
					//position correction
					particle.position.x += vdotn * nx * t;
					particle.position.y += vdotn * ny * t;
					particle.position.z += vdotn * nz * t;
					q.position.x -= vdotn * nx * t;
					q.position.y -= vdotn * ny * t;
					q.position.z -= vdotn * nz * t;
				}
			}
		}
			
		
		nextx = particle.position.x + particle.velocity.x;
		nexty = particle.position.y + particle.velocity.y;
		nextz = particle.position.z + particle.velocity.z;
		
		if(nextx - wallLeft.position.x <= (1 + epsilon) * particleRadius && particle.velocity.x < 0  || wallRight.position.x - nextx < (1 + epsilon) * particleRadius && particle.velocity.x > 0) {
			if(particle.velocity.x < 0) {
				particle.position.x = 2 * wallLeft.position.x - particle.position.x + 2 * particleRadius;
			}
			else {
				particle.position.x = 2 * wallRight.position.x - particle.position.x - 2 * particleRadius;
			}
			particle.velocity.x *= -1;
		} 
		
		if(nexty - ground.position.y <= (1 + epsilon) * particleRadius && particle.velocity.y < 0  || roof.position.y - nexty < (1 + epsilon) * particleRadius && particle.velocity.y > 0) {
			if(particle.velocity.y < 0) {
				particle.position.y = 2 * ground.position.y - particle.position.y + 2 * particleRadius;
			}
			else {
				particle.position.y = 2 * roof.position.y - particle.position.y - 2 * particleRadius;
			}
			particle.velocity.y *= -1;
		}
		
		if(nextz - wallFront.position.z <= (1 + epsilon) * particleRadius && particle.velocity.z < 0  || wallBack.position.z - nextz < (1 + epsilon) * particleRadius && particle.velocity.z > 0) {
			if(particle.velocity.z < 0) {
				particle.position.z = 2 * wallFront.position.z - particle.position.z + 2 * particleRadius;
			}
			else {
				particle.position.z = 2 * wallBack.position.z - particle.position.z - 2 * particleRadius;
			}
			particle.velocity.z *= -1;
		}
		
		particle.position.x += particle.velocity.x;
		//particle.position.y += particle.velocity.y;
		particle.position.z += particle.velocity.z;
		
	}
		
	SPS.initParticles();
	scene.registerAfterRender(function() {	
		SPS.setParticles();			
	});
    scene.enablePhysics(gravityVector, physicsPlugin);






    escena.engine.runRenderLoop(function(){
        
        tiempo ++;
        generadorDeParticulas(escena);
        escena.scene.render();
    });
    setInterval(generadorDeParticulas(escena), 1000);
    showAxis(100);
    scene.enablePhysics(gravityVector, physicsPlugin);
});

var showAxis = function(size) {
    var makeTextPlane = function(text, color, size) {
    var dynamicTexture = new BABYLON.DynamicTexture("DynamicTexture", 50, scene, true);
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(text, 5, 40, "bold 36px Arial", color , "transparent", true);
    var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
     };
  
    var axisX = BABYLON.Mesh.CreateLines("axisX", [ 
      new BABYLON.Vector3.Zero(), new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, 0.05 * size, 0), 
      new BABYLON.Vector3(size, 0, 0), new BABYLON.Vector3(size * 0.95, -0.05 * size, 0)
      ], scene);
    axisX.color = new BABYLON.Color3(1, 0, 0);
    var xChar = makeTextPlane("X", "red", size / 10);
    xChar.position = new BABYLON.Vector3(0.9 * size, -0.05 * size, 0);
    var axisY = BABYLON.Mesh.CreateLines("axisY", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( -0.05 * size, size * 0.95, 0), 
        new BABYLON.Vector3(0, size, 0), new BABYLON.Vector3( 0.05 * size, size * 0.95, 0)
        ], scene);
    axisY.color = new BABYLON.Color3(0, 1, 0);
    var yChar = makeTextPlane("Y", "green", size / 10);
    yChar.position = new BABYLON.Vector3(0, 0.9 * size, -0.05 * size);
    var axisZ = BABYLON.Mesh.CreateLines("axisZ", [
        new BABYLON.Vector3.Zero(), new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0 , -0.05 * size, size * 0.95),
        new BABYLON.Vector3(0, 0, size), new BABYLON.Vector3( 0, 0.05 * size, size * 0.95)
        ], scene);
    axisZ.color = new BABYLON.Color3(0, 0, 1);
    var zChar = makeTextPlane("Z", "blue", size / 10);
    zChar.position = new BABYLON.Vector3(0, 0.05 * size, 0.9 * size);
};
