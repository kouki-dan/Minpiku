
//Size:640x480
window.onload = function(){
  console.log("Oh yeah!!!!!!");
  //Canvas作成
  var canvas = new Canvas();
  canvas.fitToDeviceSize();
  
  //イベントを設定する
  //即時実行関数で変数達を閉じ込める。
  (function(){
    var that = {};

    document.body.addEventListener("mousedown",function(e){
      that.drag = true;
      e.touches = [];
      e.touches[0] = {};
      e.touches[0].x = e.pageX;
      e.touches[0].y = e.pageY;
      single_touchstart(e);
    },true);
    document.body.addEventListener("mousemove",function(e){
      if(!that.drag){
        return ;
      }
      e.touches = [];
      e.touches[0] = {};
      e.touches[0].x = e.pageX;
      e.touches[0].y = e.pageY;
      single_touchmove(e);
    },true);
    document.body.addEventListener("mouseup",function(e){
      that.drag = false;
      e.touches = [];
      e.touches[0] = {};
      e.touches[0].x = e.pageX;
      e.touches[0].y = e.pageY;
      single_touchend(e);
    },true);
    /*
    document.body.addEventListener("touchstart",touchstart,true);
    document.body.addEventListener("touchmove",touchmove,true);
    document.body.addEventListener("touchend",touchend,true);
    */
    function single_touchstart(e){
      that.path = new Path();
      that.path.addPath(e.touches[0].pageX,e.touches[0].pageY);
    }
    function single_touchmove(e){
      that.path.addPath(e.touches[0].pageX,e.touches[0].pageY);
      canvas.drawPath(that.path.lastTwoPath());
    }
    function single_touchend(e){
      //undo機能をつけるなら、that.pathを保存する
      canvas.drawPoint(that.path);
      
      that.path = undefined;
    }
    function single_touchcancel(e){
      that.path = undefined;
    }

    function many_touchstart(e){
      that.prevCenterPos = e.centerPos;
    }
    function many_touchmove(e){
      var difCenterPos = [
          e.centerPos[0] - that.prevCenterPos[0],
          e.centerPos[1] - that.prevCenterPos[1]
        ];
//      console.log(difCenterPos[0] + "," + difCenterPos[1]);
//      console.log(canvas.dx);
      canvas.moveCanvas(-difCenterPos[0],
                        -difCenterPos[1]);
      canvas.render();

      that.prevCenterPos = e.centerPos;

    }
    function many_touchend(e){

    }
    

    var gestureHandler = new GestureHandler();
    gestureHandler.addEventListener("single_touchstart",function(e){
      single_touchstart(e);
    });
    gestureHandler.addEventListener("single_touchmove",function(e){
      single_touchmove(e);
    });
    gestureHandler.addEventListener("single_touchend",function(e){
      single_touchend(e);
    });
    gestureHandler.addEventListener("single_touchcancel",function(e){
      single_touchcancel(e);
    });
    gestureHandler.addEventListener("many_touchstart",function(e){
      many_touchstart(e);
    });
    gestureHandler.addEventListener("many_touchmove",function(e){
      many_touchmove(e);
    });
    gestureHandler.addEventListener("many_touchend",function(e){
      
    });
    


  })();


  window.onresize = function(){
    canvas.fitToDeviceSize();
  }
}




