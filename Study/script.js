function Draw(){
    const Canvas = document.getElementById("canvas");
    Canvas.width = 500;
    Canvas.height = 500;

    const Context = Canvas.getContext("2d");

    /* 填充颜色 */
    Context.fillStyle = "red";
    /* 填充矩形，默认就是一张图片 */
    Context.fillRect(0,0,200,200);

    /* 画线 */

    /* 先移动到 0，0 坐标 */
    Context.moveTo(0,0);

    /* 设置终点坐标 */
    Context.lineTo(200,200);

    /* 调用画图 API */
    Context.stroke();

    /* 画圆 */
    Context.beginPath();
    Context.arc(100,100,50,0,360,true);
}
window.addEventListener("load",()=>{
    Draw();

},false);