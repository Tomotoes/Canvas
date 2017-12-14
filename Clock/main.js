/* eslint-disable no-undef */

const WINDOW_HEIGHT = window.innerHeight;
const WINDOW_WIDTH = window.innerWidth;

const MARGIN_LEFT = Math.round(WINDOW_WIDTH / 10);
const MARGIN_TOP = Math.round(WINDOW_HEIGHT / 5);

const RADIUS = Math.round(WINDOW_WIDTH * 4 / 5 / 108) - 1;

const balls = [];

const fontColor = "blue";

const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"];

let curTime = getTime();

let curHour;
let curMenute;
let curSecond;

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
canvas.height = WINDOW_HEIGHT;
canvas.width = WINDOW_WIDTH;

setInterval(() => {
    render();
    update();
}, 50);

function getPos(pos, n) {
    return pos + n * 2 * (RADIUS + 1) + (RADIUS + 1);
}

function getTime() {
    const nowTime = new Date();
    return {
        hour: nowTime.getHours(),
        menute: nowTime.getMinutes(),
        second: nowTime.getSeconds()
    };
}

function render() {

    /* 先清空之前的帧 */
    context.clearRect(0, 0, canvas.width, canvas.height);

    curHour = curTime.hour;

    curMenute = curTime.menute;

    curSecond = curTime.second;

    /* 绘制时间 */
    loopDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(curHour / 10), renderDigit);
    loopDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHour % 10), renderDigit);

    loopDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, renderDigit);

    loopDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMenute / 10), renderDigit);
    loopDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMenute % 10), renderDigit);

    loopDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, renderDigit);

    loopDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSecond / 10), renderDigit);
    loopDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(curSecond % 10), renderDigit);

}

function update() {

    const nextTime = getTime();
    const nextHours = nextTime.hour;
    const nextMinutes = nextTime.menute;
    const nextSecond = nextTime.second;

    if (nextSecond !== curSecond) {

        const fHours = parseInt(nextHours / 10);
        const lHours = parseInt(nextHours % 10);
        const fMinutes = parseInt(nextMinutes / 10);
        const lMinutes = parseInt(nextMinutes % 10);
        const fSecond = parseInt(nextSecond / 10);
        const lSecond = parseInt(nextSecond % 10);

        if (parseInt(curHour / 10) !== fHours) {
            loopDigit(MARGIN_LEFT, MARGIN_TOP, fHours, addBalls);
        }
        if (parseInt(curHour % 10) !== lHours) {
            loopDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, lHours, addBalls);
        }
        if (parseInt(curMenute / 10) !== fMinutes) {
            loopDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, fMinutes, addBalls);
        }
        if (parseInt(curMenute % 10) !== lMinutes) {
            loopDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, lMinutes, addBalls);
        }
        if (parseInt(curSecond / 10) !== fSecond) {
            loopDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, fSecond, addBalls);
        }
        if (parseInt(curSecond % 10) !== lSecond) {

            loopDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, lSecond, addBalls);
        }

        curTime = nextTime;
    }

    updateBalls();
}

function updateBalls() {

    let cnt = 0;

    for (let i = 0; i < balls.length; ++i) {

        context.beginPath();
        context.arc(balls[i].x, balls[i].y, RADIUS, 0, Math.PI * 2);
        context.closePath();
        context.fillStyle = balls[i].color;
        context.fill();

        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;

        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }

        if (balls[i].x + RADIUS > 0 || balls[i] - RADIUS < canvas.width) {
            balls[cnt++] = balls[i];
        }
    }

    while (balls.length > cnt) {
        balls.pop();
    }
}

function loopDigit(x, y, num, op) {

    let posX, posY;

    for (let i = 0; i < digit[num].length; ++i) {

        posY = getPos(y, i);

        for (let j = 0; j < digit[num][i].length; ++j) {

            if (digit[num][i][j] === 1) {

                posX = getPos(x, j);

                op(posX, posY);
            }
        }
    }
}

function addBalls(posX, posY) {

    balls.push({
        x: posX,
        y: posY,
        g: 1.5 + Math.random(),
        vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
        vy: -5,
        color: colors[Math.floor(Math.random() * colors.length)]
    });
}

function renderDigit(posX, posY) {

    context.beginPath();
    context.arc(posX, posY, RADIUS, 0, Math.PI * 2);
    context.closePath();
    context.fillStyle = fontColor;
    context.fill();
}