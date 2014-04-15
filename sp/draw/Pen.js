/*


*/
var Pen = function(){

}
Pen.prototype.drawPoint = function(ctx,path){
  //pathの点が1個の時、点を書き込む
  if(path.points.length != 1){
    return;
  }

  this.initCtx(ctx,path);

  ctx.beginPath();
  ctx.arc(path.points[0][0],
          path.points[0][1],
          ctx.lineWidth/2 ,0 ,2*Math.PI ,true);
  ctx.fill();
}
Pen.prototype.drawPath = function(ctx,path){
  //ctxにpathを書き込む。
  this.initCtx(ctx,path);

  ctx.beginPath();
  ctx.moveTo(path.points[0][0],path.points[0][1]);
  for(var i = 1; i < path.points.length; i++){
    ctx.lineTo(path.points[i][0],path.points[i][1]);
  }
  ctx.stroke();
}

Pen.prototype.initCtx = function(ctx,path){
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = path.lineWidth;
  ctx.strokeStyle = path.color;
  ctx.fillStyle = path.color;
}

