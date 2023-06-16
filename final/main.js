const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');
const screenW = canvas.width = 1024;
const screenH = canvas.height = 576;


const spriteW = 110;
const spriteH = 110;

let startX = 350;
let startY = 120;

const ryuImage = new Image();
ryuImage.src = './Ryu.png';

// stage
const stageImage = new Image();
stageImage.src = './stage.png';

let fouleFrame = 0;
let ryuFrame = 0;
let fightFrame = 0;
let ballFrame = 4;
let gameFrame = 0;
let ballStartX = 150;
let ballIsRunning = false;
let tonneauLife = 100;

const keys = {
    a: {
        pressed: false,
    },
    ArrowLeft: 
    {
        pressed: false,
    },
    ArrowRight:
    {
        pressed: false,
    }  
};



let isMoving = false;
let isFighting = false;
function animate() {
    c.clearRect(0, 0, screenW, screenH);
    c.fillStyle = "black";
    c.fillRect(0, 0, screenW, screenH);
    
    // fond mer
    c.drawImage(stageImage, 72, 208, 750, 175, 0, 0, 1024, 200);
    // quaie
    c.drawImage(stageImage, 8, 392, 895,72, 0, 200, 1024, 150);
    // Bateau - Dessiné sur le canvas hors écran
    c.drawImage(stageImage,10, 0, 540,200, 0, 4, 540, 200);
   
   // foule1
   c.drawImage(stageImage, 551, 9 + 64*fouleFrame, 40, 64, 125, 117, 40, 64);
    if(gameFrame % 15 === 0) {
        if(fouleFrame <2) fouleFrame ++;
        else fouleFrame = 0;
    }

    const tonneauX = 800;
    const tonneauY = 150;
    // tonneau
    if(tonneauLife > 0) {

    c.drawImage(stageImage, 544, 465, 160, 106, tonneauX, tonneauY, 160, 155);
    }
    else {
        c.drawImage(stageImage, 712, 470, 210, 60, tonneauX, tonneauY, 160, 155);
        }
       
            // Ryu
   
    !isMoving && !isFighting && c.drawImage(ryuImage, 0+spriteW*ryuFrame, 0, spriteW, spriteH, startX, startY, spriteW*1.50, spriteH*1.50);
    if(gameFrame % 9 === 0) {
        if(ryuFrame <4) ryuFrame ++;
        else ryuFrame = 0;
    }
   
 
    if(keys.ArrowRight.pressed) {

        if( startX + (spriteW - 60)  < tonneauX) { 

            startX += 5;
        }

        
        c.drawImage(ryuImage, 0 +spriteW*ryuFrame,spriteH * 1 , spriteW, spriteH, startX, startY, spriteW*1.50, spriteH*1.50);
        if(gameFrame % 30 === 0) {
            if(ryuFrame <5) ryuFrame ++;
            else ryuFrame = 0;
        }
    }
    if(keys.ArrowLeft.pressed) {
        startX -= 5;
        c.drawImage(ryuImage, 0 +spriteW*ryuFrame,spriteH * 2 , spriteW, spriteH, startX, startY, spriteW*1.50, spriteH*1.50);
        if(gameFrame % 30 === 0) {
            if(ryuFrame <5) ryuFrame ++;
            else ryuFrame = 0;
        }
    }
    if(isFighting) {
      
        c.drawImage(ryuImage, 0 +spriteW*fightFrame,spriteH * 3 , spriteW, spriteH, startX, startY, spriteW*1.50, spriteH*1.50);
        if(gameFrame % 8 === 0) {
            if(fightFrame <3) {
                fightFrame ++;
            }
            else {
                fightFrame = 0;
                isFighting = false;
            }

            if(fightFrame === 3) {
                ballIsRunning = true;
            }

        }

    }
 
        if(ballIsRunning) {
            // boule de energie  
            c.drawImage(ryuImage, 0 +spriteW*ballFrame,spriteH * 3 , spriteW, spriteH, startX + ballStartX, startY, spriteW*1.50, spriteH*1.50);
            if(gameFrame % 10 === 0) {
                if(ballFrame < 8) {
                    ballFrame ++;
                }
                else {
                    ballFrame = 4;
                }
            }
            if(ballStartX > 500) {
                ballStartX = 150; 
                ballFrame = 4;  
                ballIsRunning = false;
            }
            ballStartX += 10;

            if(startX + ballStartX >= tonneauX) {
               tonneauLife -= 10;
            }
        }



    gameFrame++;
    window.requestAnimationFrame(animate);
}

animate();

window.addEventListener('keyup', (event) => {
    switch(event.key) {
        
        case 'a':
            keys.a.pressed = false;
           
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            isMoving = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            isMoving = false;
            break;
    }

});

window.addEventListener('keydown', (event) => {
    switch(event.key) {
        case 'a':
            keys.a.pressed = true;
            isFighting = true;
            break;
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            isMoving = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            isMoving = true;
            break;
    }

});