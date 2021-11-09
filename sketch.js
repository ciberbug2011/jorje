var balloon,balloonImage1,balloonImage2;
// crea aquí la base de datos y la variable de posición 
var database;
var height;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Función para configurar el entorno inicial
function setup() {
  database=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;
  var balloonHeight = database.ref('balloon/height');
  balloonHeight.on("value",readHeight,showError);
  textSize(20); 
}

// función para mostrar la Interfaz del Usuario (UI por sus siglas en inglés)
function draw() {
  background(bg);

  if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeigt(-10,0)
    //escribe el código para mover el globo aerostático en dirección hacia la izquierda
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeigt(10,0)
    //escribe el código para mover el globo aerostático en dirección hacia la derecha
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeigt(0,-10)
    //escribe el código para mover el globo aerostático en dirección ascendente
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    updateHeigt(0,10)
    //escribe el código para mover el globo aerostático en dirección descendente
  }

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**¡Utiliza las teclas de flecha para mover el globo aerostático!",40,40);
}
function updateHeigt(x,y){
  database.ref('balloon/height').set({
    'x': height.x + x,
     'y': height.x + y
  })
}
function readHeight(data){
  height = data.val();
  console.log(height.x);
  balloon.x = height.x;
  balloon.y = height.y;

}
function showError(){
  console.log("errores y pescados")
}