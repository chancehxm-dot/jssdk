1.只可新增模块，不可修改原有代码
2.做中文注释
需求：
在这个js中新增一个模式：
新增一个rb模式， 该模式规则如下：
1、将rc广告广告自动居中弹窗显示， 保证能够在页面中层级最高
2、扩大调整广告版面范围，让广告能够width：100%，广告宽度100%，一整屏幕。

上报：
1、统计实际成功点击率
增加一个上报统计gif， 当点击广告时， 触发gif上报
格式如下：
pv上报
img.src = "https://pweapons.com/p.gif?s=rb&a=" + ad + "m&t=p&_=" + Date.now() + pros
使用ifrema脱离焦点方式监听是否点击adsense广告
点击广告上报格式
img.src = "https://pweapons.com/p.gif?s=rb&a=" + ad + "m&t=c&_=" + Date.now() + pros
