(function (lib, img, cjs, ss) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1200,
	height: 500,
	fps: 30,
	color: "#FFFFFF",
	opacity: 0.00,
	manifest: [
		{src:"images/1200x500_atlas_.png?1513590018229", id:"1200x500_atlas_"}
	]
};



lib.ssMetadata = [
		{name:"1200x500_atlas_", frames: [[0,472,76,39],[156,472,76,37],[78,472,76,39],[234,472,64,39],[0,0,1180,470]]}
];


// symbols:



(lib.Group = function() {
	this.spriteSheet = ss["1200x500_atlas_"];
	this.gotoAndStop(0);
}).prototype = p = new cjs.Sprite();



(lib.Group_1 = function() {
	this.spriteSheet = ss["1200x500_atlas_"];
	this.gotoAndStop(1);
}).prototype = p = new cjs.Sprite();



(lib.Group_1_1 = function() {
	this.spriteSheet = ss["1200x500_atlas_"];
	this.gotoAndStop(2);
}).prototype = p = new cjs.Sprite();



(lib.Mesh = function() {
	this.spriteSheet = ss["1200x500_atlas_"];
	this.gotoAndStop(3);
}).prototype = p = new cjs.Sprite();



(lib.airplan = function() {
	this.spriteSheet = ss["1200x500_atlas_"];
	this.gotoAndStop(4);
}).prototype = p = new cjs.Sprite();



(lib.Path = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;


(lib.cloudy3 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層 1
	this.instance = new lib.Group_1();
	this.instance.parent = this;
	this.instance.setTransform(-175,-85.2,4.605,4.605);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-175,-85.2,350,170.4);


(lib.cloudy1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層 1
	this.instance = new lib.Mesh();
	this.instance.parent = this;
	this.instance.setTransform(-141.9,-86.5,4.436,4.436);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-141.9,-86.5,283.9,173);


(lib.airplan_1 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層 1
	this.instance = new lib.airplan();
	this.instance.parent = this;
	this.instance.setTransform(-644.7,10.2,1,1,-23);

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-644.7,-450.8,1269.8,893.7);


(lib.cloudy2 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// 圖層 1
	this.instance = new lib.Path();
	this.instance.parent = this;
	this.instance.setTransform(3.1,15.1,4.283,4.283,0,0,0,18.2,18.2);
	this.instance.alpha = 0.602;

	this.instance_1 = new lib.Group();
	this.instance_1.parent = this;
	this.instance_1.setTransform(-162.7,-83.5,4.283,4.283);

	this.instance_2 = new lib.Group_1_1();
	this.instance_2.parent = this;
	this.instance_2.setTransform(-162.7,-83.5,4.283,4.283);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.instance_2},{t:this.instance_1},{t:this.instance}]}).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(-162.7,-83.5,325.5,167);


// stage content:
(lib._1200x500 = function(mode,startPosition,loop) {
	this.initialize(mode,startPosition,loop,{});

	// timeline functions:
	this.frame_299 = function() {
		/* 在此影格停止
		時間軸會在插入此程式碼的影格停止/暫停。
		亦可用來停止/暫停影片片段的時間軸。
		*/

		this.stop();
		CRAZY_call('crazy_done');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).wait(299).call(this.frame_299).wait(1));

	// Cloudy1
	this.instance = new lib.cloudy1("synched",0);
	this.instance.parent = this;
	this.instance.setTransform(783.9,321.2);
	this.instance.filters = [new cjs.ColorFilter(0.7, 0.7, 0.7, 1, 76.5, 76.5, 76.5, 0)];
	this.instance.cache(-144,-88,288,177);

	this.timeline.addTween(cjs.Tween.get(this.instance).to({x:693.9,alpha:0.828},115).to({_off:true},1).wait(184));

	// Cloudy2
	this.instance_1 = new lib.cloudy2("synched",0);
	this.instance_1.parent = this;
	this.instance_1.setTransform(175.1,222.5);
	this.instance_1.alpha = 0.5;
	this.instance_1._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(5).to({_off:false},0).to({x:235.1,alpha:1},33).to({x:255.1,alpha:0},77).to({_off:true},1).wait(184));

	// airplan
	this.instance_2 = new lib.airplan_1("synched",0);
	this.instance_2.parent = this;
	this.instance_2.setTransform(680.9,192,0.1,0.1,11.5,0,0,0.6,0.4);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(5).to({_off:false},0).to({regX:0.3,regY:0.2,scaleX:0.8,scaleY:0.8,x:620.9,y:272},102).to({alpha:0},12).to({_off:true},1).wait(180));

	// Cloudy3
	this.instance_3 = new lib.cloudy3("synched",0);
	this.instance_3.parent = this;
	this.instance_3.setTransform(754,142.2);
	this.instance_3._off = true;
	this.instance_3.filters = [new cjs.ColorFilter(0.41, 0.41, 0.41, 1, 150.45, 150.45, 150.45, 0)];
	this.instance_3.cache(-177,-87,354,174);

	this.timeline.addTween(cjs.Tween.get(this.instance_3).wait(19).to({_off:false},0).to({x:734},100).to({_off:true},1).wait(180));

	// cloudy
	this.instance_4 = new lib.cloudy1("synched",0);
	this.instance_4.parent = this;
	this.instance_4.setTransform(184,431,0.699,0.699);
	this.instance_4._off = true;
	this.instance_4.filters = [new cjs.ColorFilter(0.23, 0.23, 0.23, 1, 196.35, 196.35, 196.35, 0)];
	this.instance_4.cache(-144,-88,288,177);

	this.timeline.addTween(cjs.Tween.get(this.instance_4).wait(18).to({_off:false},0).to({x:224},97).to({_off:true},1).wait(184));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(1242,484.7,283.9,173);

})(lib = lib||{}, images = images||{}, createjs = createjs||{}, ss = ss||{});
var lib, images, createjs, ss;
