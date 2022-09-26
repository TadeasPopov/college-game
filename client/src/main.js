//-----------------------------------------MAIN-----------------------------------------------------------//

const canvasElement = document.getElementById('mainCanvas');

//test objects
p1 = new Player(0,0,50,50,"#D7B29D", 5,5);
p2 = new Player(100,100,50,50,"#F51AA4", 5,5);


const gameObjects = [p1,p2]

const canvas = new Canvas(canvasElement, gameObjects);

canvas.runDrawLoop();


