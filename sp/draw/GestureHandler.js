
/*
 TOUCHイベントを取得して、様々なジェスチャーに割り当てる。
 とりあえず
    "single_touchstart":1本指でタッチ開始,
    "single_touchmove":1本指でのタッチ移動,
    "single_touchend":1本指でのタッチ終わり,
    "single_touchcancel":1本指の時のtouchがcancel(manyモードに移行等),
    "many_touchstart":2本指でのタッチ開始,
    "many_touchmove":2本指でのスワイプ,
    "many_touchend":2本指が終わり
  これらを定義

*/



var GestureHandler = function(){
  this.listeners = {
    "single_touchstart":[],
    "single_touchmove":[],
    "single_touchend":[],
    "single_touchcancel":[],
    "many_touchstart":[],
    "many_touchmove":[],
    "many_touchend":[]
  };

  this.modeSingle = "single";
  this.modeTwoFingers = "two";

  this.mode = null;
    
  var that = this;

  window.addEventListener("touchstart",function(e){
    that.touchstart(e);
  },true);
  window.addEventListener("touchmove",function(e){
    that.touchmove(e);
  },true);
  window.addEventListener("touchend",function(e){
    that.touchend(e);
  },true);
  window.addEventListener("touchcancel",function(e){
    that.touchcancel(e);
  },true);
  
  //イベント定義
}
GestureHandler.prototype.touchstart = function(e){
  e.preventDefault();

  if(e.touches.length == 1){
    this.mode = this.modeSingle;
    this.listenerExec("single_touchstart",e);
  }
  else if(e.touches.length >= 2 && !this.moving){
    this.mode = this.modeTwoFingers;
    this.addCenterPos(e,e.touches);
    this.listenerExec("single_touchcancel",e);
    this.listenerExec("many_touchstart",e);
  }

}
GestureHandler.prototype.touchmove = function(e){
  this.moving = true;
  
  switch(this.mode){
    case this.modeSingle:
      this.listenerExec("single_touchmove",e);
      break;
    case this.modeTwoFingers:
      if(e.touches.length != 2){
        this.touchend(e);
        break;
      }
      this.addCenterPos(e,e.touches);
      this.listenerExec("many_touchmove",e);
      break;
  }
  
}
GestureHandler.prototype.touchend = function(e){
  if(e.touches.length == 0){
    switch(this.mode){
      case this.modeSingle:
        this.listenerExec("single_touchend",e);
        break;
      case this.modeTwoFingers:
        this.listenerExec("many_touchend",e);
        break;
    }
    this.init();
  }
}
GestureHandler.prototype.touchcancel = function(e){
  this.init();
  console.log("cancel");
}
GestureHandler.prototype.init = function(){
  this.mode = null;
  this.moving = false;
  this.first = true;
}
GestureHandler.prototype.listenerExec = function(type,e){  
  for(var i = 0; i < this.listeners[type].length; i++){
    this.listeners[type][i](e);
  }
}
GestureHandler.prototype.addCenterPos = function(obj,positions){
  //objにcenterPosを追加する。
  obj.centerPos = this.getCenterPos(positions);
  return obj;
}
GestureHandler.prototype.getCenterPos = function(positions){
  var x = 0,y = 0;
  for(var i = 0; i < positions.length; i++){
    x += positions[i].pageX;
    y += positions[i].pageY;
  }
  x /= positions.length;
  y /= positions.length;

  return [x | 0, y | 0];
}

GestureHandler.prototype.addEventListener = function(type,func){
  this.listeners[type].push(func);  
}

