
var Path = function(){
  this.points = [];
  this.color = "RGBA(0,0,0,1)";
  this.lineWidth = 10;
}
Path.prototype.setColor = function(color){
  this.color = color;
}
Path.prototype.setLineWidth = function(lineWidth){
  this.lineWidth = lineWidth;
}
Path.prototype.addPath = function(x,y){
  this.points.push([x,y]);
}
Path.prototype.lastTwoPath = function(){
  var ret = new Path();
  ret.color = this.color;
  ret.lineWidth = this.lineWidth;
  ret.points = this.points.slice(this.points.length-2,
                           this.points.length);
  return ret;
}

