'use strict';

window.onload = draw;

function draw() {
    let canvas = document.querySelector('#mainCanvas');
    let ctx = canvas.getContext('2d');
    let cvsWidth = canvas.width;
    let cvsHeight = canvas.height;
    canvas.style.backgroundColor = '#eaeaea';

    let bird = new Image(),
        bg = new Image(),
        fg = new Image(),
        pipeUp = new Image(),
        pipeBottom = new Image();

    let gap = 90;

    let xPos = 10;
    let yPos = 150;

    let grav = 1.5;
    let score = 0;

    let fly = new Audio();
    let score_audio = new Audio();

    fly.scr = "audio/fly.mp3";
    score_audio.scr = "audio/score.mp3";

    document.addEventListener("keydown", moveUp);

    function moveUp() {
        yPos -= 25;
        fly.play();
    }

    let pipe = [];

    pipe[0] = {
        x: cvsWidth,
        y: 0
    }

    bird.src = "img/flappy_bird_bird.png";
    bg.src = "img/flappy_bird_bg.png";
    fg.src = "img/flappy_bird_fg.png";
    pipeUp.src = "img/flappy_bird_pipeUp.png";
    pipeBottom.src = "img/flappy_bird_PipeBottom.png";

    function render() {
        ctx.drawImage(bg, 0, 0);

        for (let i = 0; i < pipe.length; i++) {
            ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y)
            ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap)

            pipe[i].x--;

            if (pipe[i].x == 125) {
                pipe.push({
                    x: cvsWidth,
                    y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height
                })
            }

            if (
                xPos + bird.width >= pipe[i].x
                && xPos <= pipe[i].x + pipeUp.width
                && (
                    yPos <= pipe[i].y + pipeUp.height ||
                    yPos + bird.height >= pipe[i].y + pipeUp.height + gap

                )
                || yPos + bird.height >= cvsHeight - fg.height
            ) {
                location.reload()
            }

            if(pipe[i].x == 5) {
                score++;
                score_audio.play()
            }
        }

        ctx.drawImage(fg, 0, cvsHeight - fg.height)
        ctx.drawImage(bird, xPos, yPos);

        yPos += grav;

        ctx.fillStyle = "#000";
        ctx.font = "20px Arial";
        ctx.fillText("Счет: " + score, 10, cvsHeight - 20)

        requestAnimationFrame(render);
    }

    pipeBottom.onload = render;
}

