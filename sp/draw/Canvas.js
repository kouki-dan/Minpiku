
var Canvas = function(){
  this.mainCanvas = document.getElementById("mainCanvas");
  this.mainCanvas.style.backgroundColor = "#eee";
  this.ctx = this.mainCanvas.getContext("2d");
  document.body.appendChild(this.mainCanvas);

  this.insideCanvas = document.createElement("canvas");
  this.insideCtx = this.insideCanvas.getContext("2d");
  this.insideCanvas.width = 640;
  this.insideCanvas.height = 480;
  this.insideWidth = 640;
  this.insideHeight = 480;

  //dxとdyは、mainCanvasに表示する左上の座標
  this.dx = 0;
  this.dy = 0;

}
Canvas.prototype.drawPath = function(path){
  //ctxにpathを書き込む。
  this.initCtx(path);

  this.insideCtx.beginPath();
  this.insideCtx.moveTo(path.points[0][0],path.points[0][1]);
  for(var i = 1; i < path.points.length; i++){
    this.insideCtx.lineTo(path.points[i][0],path.points[i][1]);
  }
  this.insideCtx.stroke();
  
  this.render();
}
Canvas.prototype.drawPoint = function(path){
  //pathの点が1個の時、点を書き込む
  if(path.points.length != 1){
    return;
  }

  this.initCtx(path);

  this.insideCtx.beginPath();
  this.insideCtx.arc(path.points[0][0],
          path.points[0][1],
          path.lineWidth/2 ,0 ,2*Math.PI ,true);
  this.insideCtx.fill();

  this.render();
}
Canvas.prototype.render = function(){
  //今の倍率、場所等から、insideCanvas(もともとの絵)
  //から普通のcanvasへとぶーんってぶーんって感じでレンダリング
/*
  this.ctx.drawImage(this.insideCanvas,
    0,0,
    this.innerWidth,this.innerHeight,
    0,0,
    this.innerWidth,this.innerHeight
  );
  */

  var w = Math.min(this.innerWidth ,640-this.dx);
  var h = Math.min(this.innerHeight,480-this.dy);
  var outOfLeft;
  if(this.dx > 0){
    outOfLeft = this.dx;
  }
  else{
    outOfLeft = 0;
  }
  var outOfTop;
  if(this.dy > 0){
    outOfTop = this.dy;
  }
  else{
    outOfTop = 0;
  }

  var outOfRight = (this.dx + this.innerWidth <= this.insideWidth) ?
                      this.innerWidth - this.insideWidth + this.dx : 0;
  outOfRight = Math.abs(outOfRight);
  var outOfBottom = (this.dy + this.innerHeight <= this.insideHeight) ?
                      this.innerHeight - this.insideHeight + this.dy : 0;
  outOfBottom = Math.abs(outOfBottom);

  console.log("outOfLeft="+outOfLeft + 
              ",outOfRight="+outOfRight +
              ",outOfTop="+outOfTop + 
              ",outOfBottom=" + outOfBottom);

  this.ctx.clearRect(0,0,this.innerWidth,this.innerHeight);
  this.ctx.fillStyle = "#fff";

  var width = this.insideWidth - outOfLeft - outOfRight;
  var height = this.insideHeight - outOfTop - outOfBottom;




  this.ctx.fillRect(-this.dx,-this.dy,
      width,height);

  return ;

  this.ctx.fillRect(outOfLeft,outOfTop,
      this.insideWidth-outOfRight-this.dx,this.insideHeight-outOfBottom-this.dy);
  this.ctx.drawImage(this.insideCanvas,
    outOfLeft,outOfTop,
    this.insideWidth-outOfRight-this.dx, this.insideHeight-outOfBottom-this.dy,
    0,0,
    this.insideWidth-outOfRight-this.dx, this.insideHeight-outOfBottom-this.dy
  );
}
Canvas.prototype.moveCanvas = function(dx,dy){
  this.dx += dx;
  this.dy += dy;
}
Canvas.prototype.initCtx = function(path){
  this.lineCap = "round";
  this.lineJoin = "round";
  this.lineWidth = path.lineWidth;
  this.strokeStyle = path.color;
  this.fillStyle = path.color;
}
Canvas.prototype.fitToDeviceSize = function(){
  this.mainCanvas.width = screen.width;
  this.mainCanvas.height = screen.height;
  window.scroll(0,screen.height);
  this.innerWidth = window.innerWidth;
  this.innerHeight = window.innerHeight;
  this.mainCanvas.width = this.innerWidth;
  this.mainCanvas.height = this.innerHeight;

  this.render();
}
