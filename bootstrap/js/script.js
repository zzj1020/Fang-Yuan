var map=new BMap.Map("allmap", {minZoom:15, maxZoom:20});      // 创建Map实例
map.centerAndZoom(new BMap.Point(106.306061,29.596147), 16);    // 初始化地图,设置中心点坐标和地图级别

map.addControl(new BMap.MapTypeControl({                       //添加地图类型控件
	mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
]}));	

map.setCurrentCity("重庆");                                    // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);                               //开启鼠标滚轮缩放

var b=new BMap.Bounds(new BMap.Point(106.27683,29.579596), 
	  new BMap.Point(106.338562,29.624691));                   //设置边界
try {	
	BMapLib.AreaRestriction.setBounds(map, b);
} catch(e) {
	alert(e);
}

var bottom_right_navigation=new BMap.NavigationControl({anchor: BMAP_ANCHOR_BOTTOM_RIGHT, 
							type: BMAP_NAVIGATION_CONTROL_SMALL});       //右下角，设置平移和缩放按钮
map.addControl(bottom_right_navigation);

var geolocationControl=new BMap.GeolocationControl();                       // 添加定位控件
geolocationControl.addEventListener("locationSuccess", function(e){           // 定位成功事件
	// var address = '';
	// address += e.addressComponent.province;
	// address += e.addressComponent.city;
	// address += e.addressComponent.district;
	// address += e.addressComponent.street;
	// address += e.addressComponent.streetNumber;
});
geolocationControl.addEventListener("locationError", function(e){              // 定位失败事件
	alert(e.message);
});
map.addControl(geolocationControl);

function ZoomControl(){                                         // 定义一个控件类,即function
	this.defaultAnchor=BMAP_ANCHOR_TOP_LEFT;                    // 默认停靠位置和偏移量
	this.defaultOffset=new BMap.Size(10, 10);
}

ZoomControl.prototype=new BMap.Control();                     // 通过JavaScript的prototype属性继承于BMap.Control

// 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
// 在本方法中创建一个div元素作为控件的容器,并将其添加到地图容器中
ZoomControl.prototype.initialize = function(map){
	var div=document.createElement("div");                             // 创建一个DOM元素
	div.appendChild(document.createTextNode("重庆大学虎溪校区"));       // 添加文字说明
	div.style.cursor="pointer";                                        // 设置样式
	div.style.margin="15px";
	div.style.color="blue";

	div.onclick=function(e){                                           // 绑定事件,点击后放大为17级
		map.centerAndZoom(new BMap.Point(106.306061,29.596147), 17);
	}
	map.getContainer().appendChild(div);                               // 添加DOM元素到地图中
	return div;                                                        // 将DOM元素返回
}

var myZoomCtrl=new ZoomControl();                                      // 创建控件
map.addControl(myZoomCtrl);                                            // 添加到地图当中

// var marker=new BMap.Marker(new BMap.Point(106.30536,29.599001));         // 创建点
var myIcon=new BMap.Icon("images/CQU.png", new BMap.Size(45, 45));
var marker=new BMap.Marker(new BMap.Point(106.30536,29.599001), {icon:myIcon});      // 创建标注
// var label=new BMap.Label("CQU", {offset : new BMap.Size(0, 0)});                  //创建文字标注
// marker.setLabel(label);
marker.setAnimation(BMAP_ANIMATION_BOUNCE);                                          //跳动的动画
marker.addEventListener("click", getAttr);                                            //获取标注信息
function getAttr() {
	var p=marker.getPosition();                                                      //获取marker的位置
	alert("CQU的位置是"+p.lng+","+p.lat);   
}
var circle=new BMap.Circle(new BMap.Point(106.302962,29.603995),                      //创建圆
		   10, {strokeColor:"blue", strokeWeight:2});                        
map.addOverlay(marker);
map.addOverlay(circle);  

// var opts={                                                         //无法去除边框和底色？？？ 
// 	  position : new BMap.Point(106.30536,29.599001),                 // 指定文本标注所在的地理位置
// 	  offset   : new BMap.Size(0, 0)                                  //设置文本偏移量
// }
// var label=new BMap.Label("CQU", opts);                                // 创建文本标注对象
// label.setStyle({
// 	 color : "blue",
// 	 fontSize : "12px",
// 	 height : "20px",
// 	 lineHeight : "20px",
// 	 fontFamily : "微软雅黑",
//  });
// map.addOverlay(label);                             