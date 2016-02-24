// JavaScript Document
var cvs=document.getElementById("cvs"),
     ct=cvs.getContext("2d"),
	 FONT_HEIGHT=15,
	 MARGIN=35,
	 HAND_TRUNCATION=cvs.width/25,
	 HOUR_HAND_TRUNCATION=cvs.width/10,
	 NUMERAL_SPACING=20,
	 RADIUS=cvs.width/2-MARGIN,
	 HAND_RADIUS=RADIUS+NUMERAL_SPACING;
//Functions::::::::::::::::::::::::::::::::
function drawCircle(){
	ct.beginPath();
	ct.arc(cvs.width/2,cvs.height/2,RADIUS,0,Math.PI*2,true);
	ct.stroke();
}
function drawNumerals(){
	var numerals=[1,2,3,4,5,6,7,8,9,10,11,12],
		angle=0,
		numeralWidth=0;
	numerals.forEach(function(numeral){
		angle=Math.PI/6*(numeral-3);
		numeralWidth=ct.measureText(numeral).width;
		ct.fillText(numeral,
					cvs.width/2+Math.cos(angle)*(HAND_RADIUS)-numeralWidth/2,
					cvs.height/2+Math.sin(angle)*(HAND_RADIUS)+FONT_HEIGHT/3
					);
	});
}
function drawCenter(){
	ct.beginPath();
	ct.arc(cvs.width/2,cvs.height/2,5,0,Math.PI*2,true);
	ct.fill();
}
function drawHand(loc,isHour){
	var angle=(Math.PI*2)*(loc/60)-Math.PI/2,
		handRadius=isHour?RADIUS-HAND_TRUNCATION-HOUR_HAND_TRUNCATION:RADIUS-HAND_TRUNCATION;
	ct.moveTo(cvs.width/2,cvs.height/2);
	ct.lineTo(cvs.width/2+Math.cos(angle)*handRadius,cvs.height/2+Math.sin(angle)*handRadius);
	ct.stroke();
}
function drawHands(){
	var date=new Date,
		hour=date.getHours();
	hour=hour>12?hour-12:hour;
	drawHand(hour*5+(date.getMinutes()/60)*5,true,0.5);
	drawHand(date.getMinutes(),false,0.5);
	drawHand(date.getSeconds(),false,0.2);
}
function drawClock(){
	ct.clearRect(0,0,cvs.width,cvs.height);
	drawCircle();
	drawCenter();
	drawHands();
	drawNumerals();
}
//Initialization::::::::::::::::::::::::::::::::::::
ct.font=FONT_HEIGHT+"px Arial";
loop=setInterval(drawClock,1000);