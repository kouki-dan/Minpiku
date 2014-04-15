window.addEventListener('DOMContentLoaded',function(){
	if(HTMLCanvasElement){
		var o_x = 0, o_y = 0, flag = false;
		var cv = document.querySelector('#cv');
		var c = cv.getContext('2d');

		var coords = function(e){
			var r = e.target.getBoundingClientRect();
			return { x: e.clientX - r.left, y: e.clientY - r.top};
		};

		cv.addEventListener('mousedown', function(e){
			e.preventDefault();
			flag = true;
			var cd = coords(e);
			o_x = cd.x;
			o_y = cd.y;
		}, false);

		cv.addEventListener('mouseup', function(e) {
			flag = false;
		}, false);

		cv.addEventListener('mouseout', function(e) {
			if (flag) {
				var cd = coords(e);
				x = cd.x;
				y = cd.y;
				c.beginPath();
				c.moveTo(o_x, o_y);
				c.lineTo(x, y);
				c.stroke();
				o_x = x;
				o_y = y;
			}
			flag = false;
		}, false);

		cv.addEventListener('mousemove', function(e) {

			if (flag) {
				var cd = coords(e);
				var cd = coords(e);
				x = cd.x;
				y = cd.y;
				c.beginPath();
				c.moveTo(o_x, o_y);
				c.lineTo(x, y);
				c.stroke();
				o_x = x;
				o_y = y;
			}
		}, false);
	}
});
