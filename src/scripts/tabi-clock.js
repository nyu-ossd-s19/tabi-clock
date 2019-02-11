

//bellow code borrowed from: https://www.w3schools.com/graphics/tryit.asp?filename=trycanvas_clock_start
// Will - making some edits to clean up formatting

const canvas = document.getElementById("canvas");
// let clockDivWidth = document.getElementById('clock-div').offsetwidth; // trying to determine clock div width to adjust size more dynamically
// console.log(clockDivWidth);
let ctx = canvas.getContext("2d");
let radius = canvas.height / 2;
// if(radius > clockDivWidth / 2){
//   console.log("Radius too big!") // DEBUG
//   radius = clockDiv * radius;
// } else {
//   console.log("Radius is within div bounds") // DEBUG
// }
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
  drawFace(ctx, radius);
  drawNumbers(ctx, radius);
  drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
  var grad;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI);
  ctx.fillStyle = 'white';
  ctx.fill();
  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
  grad.addColorStop(0, 'black');
  grad.addColorStop(0.5, 'black');
  grad.addColorStop(1, 'black');
  ctx.strokeStyle = grad;
  ctx.lineWidth = radius*0.05;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
  ctx.fillStyle = '#333';
  ctx.fill();
}

function drawNumbers(ctx, radius) {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px 'Roboto'";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}

function drawTime(ctx, radius){
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour=hour%12;
    hour=(hour*Math.PI/6)+
    (minute*Math.PI/(6*60))+
    (second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);
    //minute
    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);
    // second
    second=(second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);
}

function drawHand(ctx, pos, length, width) {
    let grad;
    grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
    grad.addColorStop(0, 'black');
    grad.addColorStop(0.5, 'black');
    grad.addColorStop(1, 'black');
    ctx.strokeStyle = grad;
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0,0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}



//functions created by us
function clearScreen(){
  document.querySelectorAll('*').forEach(function(node) {
    if (!node.classList().contains("canvas")){
      node.style.display = "none";
    }

  });

}

let i = 0;
function typeWriteMessage(id, message){
  if (i < message.length){
    document.getElementById(id).innerHTML += message.charAt(i);
    i+=1;
    setTimeout(function(){
      typeWriteMessage(id, message);
    }, 130);
  }
}

function determineGreetingMessage(){
  const d = new Date();
  const hour = d.getHours();
  let message = "";
  if (hour >= 4 && hour <= 11){
    message = "Good Morning.";
  } else if (hour > 11 && hour < 16){
    message = "Good Afternoon.";
  } else{
    message = "Good Night.";
  }

  typeWriteMessage("greeting", message);

}

function determineStyle(){

  const d = new Date();
  const hour = d.getHours();
  let color = "";
  if (hour >= 4 && hour <= 11){
    color = "#9acce0";
  } else if (hour > 11 && hour < 16){
    color = "#fbcb78";
  } else{
    color = "#003366";
    document.getElementById("greeting").style.color = "#f9f9f9";
    document.getElementById("settings").style.color = "#f9f9f9";
  }

  document.body.style.backgroundColor = color;


}



determineGreetingMessage();
determineStyle();
