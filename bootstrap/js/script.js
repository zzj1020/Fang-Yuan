var map=new BMap.Map("allmap", {minZoom:15, maxZoom:20});      // 创建Map实例
map.centerAndZoom(new BMap.Point(106.30536,29.599001), 16);    // 初始化地图,设置中心点坐标和地图级别

map.addControl(new BMap.MapTypeControl({                       //添加地图类型控件
	mapTypes:[
        BMAP_NORMAL_MAP,
        BMAP_HYBRID_MAP
]}));	

map.setCurrentCity("重庆");                                    // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);                               //开启鼠标滚轮缩放