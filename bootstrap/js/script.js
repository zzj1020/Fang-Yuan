var map=new BMap.Map("allmap", {minZoom:15, maxZoom:20});       //创建Map实例
map.centerAndZoom(new BMap.Point(106.306061,29.596147), 16);    //初始化地图,设置中心点坐标和地图级别

// map.addControl(new BMap.MapTypeControl({                     //添加地图类型控件（平面/卫星）
// 	mapTypes:[
//         BMAP_NORMAL_MAP,
//         BMAP_HYBRID_MAP
// ]}));	

map.setCurrentCity("重庆");                                     //设置地图显示的城市
map.enableScrollWheelZoom(true);                                //开启鼠标滚轮缩放

//设置地图边界
var b=new BMap.Bounds(new BMap.Point(106.27683,29.579596),      
	  new BMap.Point(106.338562,29.624691));                   
try {	
	BMapLib.AreaRestriction.setBounds(map, b);
} catch(e) {
	alert(e);
}

//右下角，设置缩放按钮
var bottom_right_navigation=new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT,   
							type: BMAP_NAVIGATION_CONTROL_ZOOM});             
map.addControl(bottom_right_navigation);

// var geolocationControl=new BMap.GeolocationControl();                         //添加定位控件
// geolocationControl.addEventListener("locationSuccess", function(e){           //定位成功事件
// 	// var address='';
// 	// address+=e.addressComponent.province;
// 	// address+=e.addressComponent.city;
// 	// address+=e.addressComponent.district;
// 	// address+=e.addressComponent.street;
// 	// address+=e.addressComponent.streetNumber;
// });
// geolocationControl.addEventListener("locationError", function(e){              //定位失败事件
// 	alert(e.message);
// });
// map.addControl(geolocationControl);

//左上角“重庆大学虎溪校区”控件
function ZoomControl(){                                  //定义一个控件类,即function
	this.defaultAnchor=BMAP_ANCHOR_TOP_LEFT;             //默认停靠位置和偏移量
	this.defaultOffset=new BMap.Size(10, 10);
}
ZoomControl.prototype=new BMap.Control();                //通过JavaScript的prototype属性继承于BMap.Control
//自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
//在本方法中创建一个div元素作为控件的容器,并将其添加到地图容器中
ZoomControl.prototype.initialize=function(map){
	var div=document.createElement("div");                             //创建一个DOM元素
	div.appendChild(document.createTextNode("重庆大学虎溪校区"));       //添加文字说明
	div.style.cursor="pointer";                                        //设置样式
	div.style.margin="15px";
	div.style.color="blue";

	div.onclick=function(e){                                           //绑定事件,点击后放大为17级
		map.centerAndZoom(new BMap.Point(106.305972,29.59973), 17);
	}
	map.getContainer().appendChild(div);                               //添加DOM元素到地图中
	return div;                                                        //将DOM元素返回
}
var myZoomCtrl=new ZoomControl();                                      //创建控件
map.addControl(myZoomCtrl);                                            //添加到地图当中

//校徽图案
var myIcon=new BMap.Icon("images/CQU.png", new BMap.Size(100, 100));
var cqu=new BMap.Marker(new BMap.Point(106.30536,29.599001), {icon:myIcon});     
// cqu.addEventListener("click", getAttr);                                         
// function getAttr() {
// 	var p=cqu.getPosition();                                                      
// 	alert("CQU的位置是"+p.lng+","+p.lat);   
// }                       
map.addOverlay(cqu);
  

//一教
var yiJiao=new BMap.Polygon([                                        //一教地图
		   new BMap.Point(106.307395,29.601839),
		   new BMap.Point(106.308141,29.601659),
		   new BMap.Point(106.308168,29.601573),
		   new BMap.Point(106.3085,29.601584),
		   new BMap.Point(106.308514,29.60149),
		   new BMap.Point(106.308783,29.601494),
		   new BMap.Point(106.308783,29.60158),
		   new BMap.Point(106.309102,29.601588),
		   new BMap.Point(106.309138,29.60162),
		   new BMap.Point(106.309533,29.601635),
		   new BMap.Point(106.309524,29.601474),
		   new BMap.Point(106.309138,29.601471),
		   new BMap.Point(106.309102,29.601431),
		   new BMap.Point(106.308788,29.601427),
		   new BMap.Point(106.308743,29.601251),
		   new BMap.Point(106.309578,29.601243),
		   new BMap.Point(106.309587,29.601133),
		   new BMap.Point(106.309668,29.601129),
		   new BMap.Point(106.309682,29.601031),
		   new BMap.Point(106.309381,29.601031),
		   new BMap.Point(106.309372,29.601109),
		   new BMap.Point(106.30921,29.601109),
		   new BMap.Point(106.309196,29.601141),
		   new BMap.Point(106.308734,29.601129),
		   new BMap.Point(106.308536,29.601117),
		   new BMap.Point(106.308168,29.601125),
		   new BMap.Point(106.30815,29.601094),
		   new BMap.Point(106.307916,29.601086),
		   new BMap.Point(106.307916,29.601003),
		   new BMap.Point(106.307629,29.600999),
		   new BMap.Point(106.30762,29.601098),
		   new BMap.Point(106.307701,29.601102),
		   new BMap.Point(106.307701,29.601211),
		   new BMap.Point(106.308545,29.601251),
		   new BMap.Point(106.308514,29.601439),
		   new BMap.Point(106.308186,29.601431),
		   new BMap.Point(106.3081,29.601533),
		   new BMap.Point(106.30735,29.60173),
		   ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});   
map.addOverlay(yiJiao);    

var yiJiaoInfo="<div>"+"<h3>第一教学楼</h3>"+                        //一教信息窗口
			   '<img id="yiJiao" src="images/maps/yiJiao.png" width="390" height="240" title="第一教学楼"'+
			   'style="float:left; margin:10px 0 10px 8px">'+
			   '<button type="button" class="btn btn-primary" style="margin:2px">教室分布图</button>'+
			   '<button type="button" class="btn btn-success" style="margin:2px">查看空教室</button>'+
			   '<button type="button" class="btn btn-warning" style="margin:2px">发布活动</button>'+
			   '<button type="button" class="btn btn-warning" style="margin:2px">查看活动</button>'+
			   "</div>";
var yiJiaoWin=new BMap.InfoWindow(yiJiaoInfo);
yiJiao.addEventListener("click", function(){      
	map.openInfoWindow(yiJiaoWin, new BMap.Point(106.308626,29.601371));
	document.getElementById('yiJiao').onload=function(){
	   yiJiaoWin.redraw();   
	}
});


var zongHeLou=new BMap.Polygon([                                      //综合楼地图
			  new BMap.Point(106.305397,29.602346),
			  new BMap.Point(106.305477,29.602342),
			  new BMap.Point(106.305477,29.602279),
			  new BMap.Point(106.305612,29.602279),
			  new BMap.Point(106.305612,29.602338),
			  new BMap.Point(106.306151,29.602338),
			  new BMap.Point(106.306142,29.601679),
			  new BMap.Point(106.306061,29.601671),
			  new BMap.Point(106.306052,29.601435),
			  new BMap.Point(106.305837,29.601431),
			  new BMap.Point(106.305837,29.601734),
			  new BMap.Point(106.305383,29.601741),
			  new BMap.Point(106.305379,29.601938),
			  new BMap.Point(106.305325,29.601945),
			  new BMap.Point(106.305329,29.602087),
			  new BMap.Point(106.305379,29.602095)
			  ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7}); 
map.addOverlay(zongHeLou);    

var wangXinZhongXin=new BMap.Polygon([                                   //网络信息中心地图
					new BMap.Point(106.306475,29.602008),
					new BMap.Point(106.306856,29.602008),
					new BMap.Point(106.306852,29.601573),
					new BMap.Point(106.306475,29.601569),
					], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});  
map.addOverlay(wangXinZhongXin);

var tuShuGuan=new BMap.Polygon([                                        //图书馆地图
			  new BMap.Point(106.307871,29.59875),
			  new BMap.Point(106.308788,29.598762),
			  new BMap.Point(106.308806,29.598063),
			  new BMap.Point(106.30868,29.598012),
			  new BMap.Point(106.307786,29.597996),
			  new BMap.Point(106.307782,29.598142),
			  new BMap.Point(106.307853,29.598197)
			  ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(tuShuGuan);     

var yiShuLouA=new BMap.Polygon([                                          //艺术楼地图
			 new BMap.Point(106.310237,29.600036),
			 new BMap.Point(106.310493,29.600028),
			 new BMap.Point(106.310484,29.599227),
			 new BMap.Point(106.310232,29.59922)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(yiShuLouA);
var yiShuLouB=new BMap.Polygon([                                         
			 new BMap.Point(106.30928,29.599502),
			 new BMap.Point(106.309693,29.599526),
			 new BMap.Point(106.309693,29.599726),
			 new BMap.Point(106.310079,29.59973),
			 new BMap.Point(106.310075,29.599557),
			 new BMap.Point(106.309873,29.59951),
			 new BMap.Point(106.309859,29.59929),
			 new BMap.Point(106.30928,29.59929)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(yiShuLouB); 
var yiShuLouC=new BMap.Polygon([                                          
			 new BMap.Point(106.309262,29.599082),
			 new BMap.Point(106.310052,29.599094),
			 new BMap.Point(106.310075,29.598843),
			 new BMap.Point(106.309262,29.598835)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(yiShuLouC);
			       

var yiShiYan=new BMap.Polygon([                                        //第一实验楼地图
		   new BMap.Point(106.310113,29.601587),
		   new BMap.Point(106.310149,29.601591),
		   new BMap.Point(106.310158,29.601661),
		   new BMap.Point(106.310499,29.601669),
		   new BMap.Point(106.310494,29.601716),
		   new BMap.Point(106.310984,29.601724),
		   new BMap.Point(106.310984,29.601143),
		   new BMap.Point(106.310328,29.601127),
		   new BMap.Point(106.310319,29.600947),
		   new BMap.Point(106.31075,29.600963),
		   new BMap.Point(106.310746,29.601088),
		   new BMap.Point(106.310948,29.601088),
		   new BMap.Point(106.310948,29.600931),
		   new BMap.Point(106.310993,29.600939),
		   new BMap.Point(106.310998,29.600813),
		   new BMap.Point(106.310926,29.600821),
		   new BMap.Point(106.310921,29.600719),
		   new BMap.Point(106.310185,29.600707),
		   new BMap.Point(106.310185,29.601277),
		   new BMap.Point(106.310328,29.601277),
		   new BMap.Point(106.310328,29.601237),
		   new BMap.Point(106.310724,29.601241),
		   new BMap.Point(106.310724,29.601178),
		   new BMap.Point(106.310804,29.601182),
		   new BMap.Point(106.310804,29.601492),
		   new BMap.Point(106.310113,29.601481)
		   ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});   
map.addOverlay(yiShiYan);

var waiGuoYu_yiShu=new BMap.Polygon([                                          //外国语、艺术学院地图
			 new BMap.Point(106.30462,29.60223),
			 new BMap.Point(106.304934,29.601626),
			 new BMap.Point(106.304368,29.601394),
			 new BMap.Point(106.304287,29.60154),
			 new BMap.Point(106.304323,29.601555),
			 new BMap.Point(106.304283,29.601626),
			 new BMap.Point(106.304215,29.601598),
			 new BMap.Point(106.304134,29.601744),
			 new BMap.Point(106.304206,29.601783),
			 new BMap.Point(106.304081,29.602018),
			 new BMap.Point(106.304233,29.602081),
			 new BMap.Point(106.304462,29.601618),
			 new BMap.Point(106.304714,29.601712),
			 new BMap.Point(106.304682,29.601767),
			 new BMap.Point(106.304629,29.601744),
			 new BMap.Point(106.304552,29.601893),
			 new BMap.Point(106.304593,29.601928),
			 new BMap.Point(106.304485,29.602176)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(waiGuoYu_yiShu); 

var shuTong_ruanJian_xinWen=new BMap.Polygon([                               //数统、软件、新闻学院地图
		   new BMap.Point(106.303555,29.601779),
		   new BMap.Point(106.30386,29.601171),
		   new BMap.Point(106.30289,29.600817),
		   new BMap.Point(106.302818,29.600943),
		   new BMap.Point(106.302854,29.600951),
		   new BMap.Point(106.302818,29.601014),
		   new BMap.Point(106.302756,29.60099),
		   new BMap.Point(106.302675,29.601147),
		   new BMap.Point(106.302747,29.601171),
		   new BMap.Point(106.302612,29.601414),
		   new BMap.Point(106.302765,29.601477),
		   new BMap.Point(106.302998,29.601014),
		   new BMap.Point(106.30325,29.601108),
		   new BMap.Point(106.303232,29.601163),
		   new BMap.Point(106.303146,29.601131),
		   new BMap.Point(106.303061,29.601296),
		   new BMap.Point(106.303142,29.601335),
		   new BMap.Point(106.303034,29.601555),
		   new BMap.Point(106.303178,29.60161),
		   new BMap.Point(106.303178,29.60161),
		   new BMap.Point(106.303407,29.601171),
		   new BMap.Point(106.30364,29.601253),
		   new BMap.Point(106.303613,29.601312),
		   new BMap.Point(106.303546,29.601288),
		   new BMap.Point(106.30347,29.601445),
		   new BMap.Point(106.303528,29.601477),
		   new BMap.Point(106.303407,29.601724)
		   ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});   
map.addOverlay(shuTong_ruanJian_xinWen);

var erShiYan=new BMap.Polygon([                                          //第二实验楼地图
			 new BMap.Point(106.306401,29.598741),
			 new BMap.Point(106.30654,29.598741),
			 new BMap.Point(106.306558,29.598607),
			 new BMap.Point(106.306913,29.598603),
			 new BMap.Point(106.306913,29.598238),
			 new BMap.Point(106.306558,29.598226),
			 new BMap.Point(106.306509,29.598262),
			 new BMap.Point(106.306086,29.598246),
			 new BMap.Point(106.306077,29.598356),
			 new BMap.Point(106.306518,29.598364),
			 new BMap.Point(106.306562,29.59834),
			 new BMap.Point(106.306863,29.598356),
			 new BMap.Point(106.306868,29.598497),
			 new BMap.Point(106.306562,29.598482),
			 new BMap.Point(106.306554,29.598435),
			 new BMap.Point(106.306401,29.598427)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(erShiYan); 

var faXue=new BMap.Polygon([                                          //法学院模拟法庭地图
			 new BMap.Point(106.306899,29.598026),
			 new BMap.Point(106.306908,29.597928),
			 new BMap.Point(106.306549,29.597924),
			 new BMap.Point(106.306504,29.597893),
			 new BMap.Point(106.306073,29.597893),
			 new BMap.Point(106.306073,29.598003),
			 new BMap.Point(106.306513,29.598007),
			 new BMap.Point(106.306554,29.598026)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(faXue); 

var yaoXue=new BMap.Polygon([                                          //药学院地图
			 new BMap.Point(106.306904,29.597763),
			 new BMap.Point(106.306908,29.597661),
			 new BMap.Point(106.306679,29.597657),
			 new BMap.Point(106.30667,29.597516),
			 new BMap.Point(106.306077,29.597512),
			 new BMap.Point(106.306068,29.597614),
			 new BMap.Point(106.306545,29.597622),
			 new BMap.Point(106.306554,29.597755)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(yaoXue); 

function ellipse(centre, x, y)                                        //学生活动中心地图
{
	var assemble=new Array();
	var angle;
	var dot;
	var tangent=x/y;
	for(i=0;i<36;i++)
	{
		angle=(2*Math.PI/36)*i;
		dot=new BMap.Point(centre.lng+Math.sin(angle)*y*tangent, centre.lat+Math.cos(angle)*y);
		assemble.push(dot);
	}
	return assemble;
}
point1=new BMap.Point(106.30561,29.596919);
point2=new BMap.Point(106.304802,29.596228);
var xueShengHuoDong1=new BMap.Polygon(ellipse(point1, 0.0004, 0.00015),
					 {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
var xueShengHuoDong2=new BMap.Polygon(ellipse(point2, 0.00027, 0.00035),
					 {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(xueShengHuoDong1);
map.addOverlay(xueShengHuoDong2);

var liKe1=new BMap.Polygon([                                          //理科大楼地图
			 new BMap.Point(106.30305,29.597485),
			 new BMap.Point(106.303665,29.597492),
			 new BMap.Point(106.303683,29.597296),
			 new BMap.Point(106.303899,29.597292),
			 new BMap.Point(106.303895,29.59688),
			 new BMap.Point(106.303567,29.59668),
			 new BMap.Point(106.303409,29.596817),
			 new BMap.Point(106.303647,29.596974),
			 new BMap.Point(106.303647,29.5971),
			 new BMap.Point(106.30314,29.597092),
			 new BMap.Point(106.303126,29.597375),
			 new BMap.Point(106.303046,29.597382)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(liKe1); 
var liKe2=new BMap.Polygon([                                          
			 new BMap.Point(106.302879,29.5971),
			 new BMap.Point(106.303077,29.597006),
			 new BMap.Point(106.302879,29.596715),
			 new BMap.Point(106.302992,29.596554),
			 new BMap.Point(106.303266,29.596715),
			 new BMap.Point(106.303391,29.596566),
			 new BMap.Point(106.303122,29.59637),
			 new BMap.Point(106.303239,29.596221),
			 new BMap.Point(106.303625,29.596287),
			 new BMap.Point(106.303742,29.596146),
			 new BMap.Point(106.303149,29.596016),
			 new BMap.Point(106.302826,29.596429),
			 new BMap.Point(106.302844,29.596448),
			 new BMap.Point(106.302619,29.596743)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(liKe2); 
var liKe3=new BMap.Polygon([                                          
			 new BMap.Point(106.304038,29.596558),
			 new BMap.Point(106.30416,29.596413),
			 new BMap.Point(106.303921,29.59626),
			 new BMap.Point(106.303805,29.596401)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(liKe3);

var xiaoYiYuan=new BMap.Polygon([                                          //校医院地图
			 new BMap.Point(106.306967,29.60455),
			 new BMap.Point(106.306976,29.604354),
			 new BMap.Point(106.306392,29.604342),
			 new BMap.Point(106.306378,29.604299),
			 new BMap.Point(106.30552,29.60428),
			 new BMap.Point(106.30552,29.604448),
			 new BMap.Point(106.306347,29.604464),
			 new BMap.Point(106.306347,29.604527)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(xiaoYiYuan); 

var yiShiTang1=new BMap.Polygon([                                         //一食堂地图            
			 new BMap.Point(106.30469,29.60384),
			 new BMap.Point(106.305112,29.60384),
			 new BMap.Point(106.305121,29.603463),
			 new BMap.Point(106.304681,29.603455)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(yiShiTang1);
var yiShiTang2=new BMap.Polygon([                                                  
			 new BMap.Point(106.303962,29.603463),
			 new BMap.Point(106.304546,29.603475),
			 new BMap.Point(106.304555,29.603086),
			 new BMap.Point(106.303962,29.603078)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(yiShiTang2);

var erShiTang=new BMap.Polygon([                                       //二食堂地图                           
			 new BMap.Point(106.301096,29.602403),
			 new BMap.Point(106.301658,29.602419),
			 new BMap.Point(106.301658,29.60172),
			 new BMap.Point(106.301096,29.601712)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(erShiTang);

var sanShiTang=new BMap.Polygon([                                       //三食堂地图                           
			 new BMap.Point(106.306199,29.596546),
			 new BMap.Point(106.306446,29.596338),
			 new BMap.Point(106.306365,29.596264),
			 new BMap.Point(106.306428,29.596201),
			 new BMap.Point(106.306172,29.595973),
			 new BMap.Point(106.305781,29.596307),
			 new BMap.Point(106.306037,29.596531),
			 new BMap.Point(106.306109,29.596468)
			 ], {strokeColor:"blue", strokeWeight:2, strokeOpacity:0.7});
map.addOverlay(sanShiTang);