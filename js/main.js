// JavaScript Document

window.onload = function(){
	mv.app.toSubmenu();
	mv.app.toChange(); 
	mv.app.toBanner();
	mv.app.toScroll();
	// mv.app.toTextup();
	mv.app.toSelect();
	mv.app.toSwitch();
	mv.app.toBling();
};

var mv = {};          // 命名空间

mv.tools = {};        // 一些基本的方法

mv.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
};

mv.ui = {};           // 一些通用的组件方法

// 淡入
mv.ui.fadeIn = function(obj){
	// 获取当前透明度
	var iCur = mv.tools.getStyle(obj, 'opacity');
	if(iCur == 1){
		return false;     // 如果当前透明度为1，则不执行
	}

	var value = 0;
	clearInterval(obj.timer); 
	obj.timer = setInterval(function(){
		var iSpeed = 3;
		if(value == 100){
			clearInterval(obj.timer);
		}else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity = '+value+')';
		}
	}, 30);
};

// 淡出
mv.ui.fadeOut = function(obj){
	var iCur = mv.tools.getStyle(obj, 'opacity');
	if(iCur == 0){
		return false;      // 如果当前透明度为0，则不执行
	}

	var value = 100;
	clearInterval(obj.timer);
	obj.timer = setInterval(function(){
		var iSpeed = -3;
		if(value == 0){
			clearInterval(obj.timer);
		}else{
			value += iSpeed;
			obj.style.opacity = value/100;
			obj.style.filter = 'alpha(opacity)' + value + ')';
		}
	}, 30);
};

// 鼠标移入对象，标题改变颜色


mv.app = {};          // 具体应用


// 顶部导航栏显示子菜单
mv.app.toSubmenu = function(){
	var oHwrap = document.getElementById('header_wrap');
	var oTnav = oHwrap.getElementsByClassName('top_nav')[0];
	var oDown = oTnav.getElementsByClassName('down_menu');

	for(var i = 0; i < oDown.length; i ++){
		// 鼠标移入事件
		oDown[i].onmouseover = function(){
			var oDl = this.getElementsByTagName('dl')[0];
			var oImg = this.getElementsByTagName('img')[0];
			oDl.style.display = 'block';
			oImg.src = 'images/down_yellow.png';
		}

		// 鼠标移出事件
		oDown[i].onmouseout = function(){
			var oDl = this.getElementsByTagName('dl')[0];
			var oImg = this.getElementsByTagName('img')[0];
			oDl.style.display = 'none';
			oImg.src = 'images/down_black.png';
		}
	}
};

// 顶部登录图标鼠标移入效果
mv.app.toChange = function(){
	var oHwrap = document.getElementById('header_wrap');
	var oLogin = oHwrap.getElementsByClassName('top_login')[0];
	var oUl = oLogin.getElementsByTagName('ul')[0];
	var oLi = oUl.getElementsByTagName('li');
	// 微博登录
	oLi[0].onmouseover = function(){
		var oImg = this.getElementsByTagName('img')[0];
		oImg.src = 'images/weibo_on.png';
	}
	oLi[0].onmouseout = function(){
		var oImg = this.getElementsByTagName('img')[0];
		oImg.src = 'images/weibo_off.png';
	}
	// QQ登录
	oLi[1].onmouseover = function(){
		var oImg = this.getElementsByTagName('img')[0];
		oImg.src = 'images/qq_on.png';
	}
	oLi[1].onmouseout = function(){
		var oImg = this.getElementsByTagName('img')[0];
		oImg.src = 'images/qq_off.png';
	}
	// 微信登录
	oLi[2].onmouseover = function(){
		var oImg = this.getElementsByTagName('img')[0];
		oImg.src = 'images/weixin_on.png';
	}
	oLi[2].onmouseout = function(){
		var oImg = this.getElementsByTagName('img')[0];
		oImg.src = 'images/weixin_off.png';
	}
};


// 图片显示区：图片轮换效果
mv.app.toBanner = function(){
	var oPhoto = document.getElementById('photo_show');
	var oLower = oPhoto.getElementsByTagName('ul')[0];
	var oLli = oLower.getElementsByTagName('li');

	var oBorder = oPhoto.getElementsByTagName('ul')[2];
	var oBli = oBorder.getElementsByTagName('li'); 

	var iNow = 0;

	var timer = setInterval(auto, 5000);

	// 自动播放(顺序)
	function auto(){
		if(iNow == oLli.length - 1){
			iNow = 0;
		}else{
			iNow ++;
		}
		// 所有的li淡出
		for(var i = 0; i < oLli.length; i ++){
			mv.ui.fadeOut(oLli[i]);
			mv.ui.fadeOut(oBli[i]);
		}
		// 当前li淡入
		mv.ui.fadeIn(oLli[iNow]);
		mv.ui.fadeIn(oBli[iNow]);
	}

    // 鼠标移入停止播放，鼠标移出继续播放
    oPhoto.onmouseover = function(){
    	clearInterval(timer);
    }
    oPhoto.onmouseout = function(){
    	timer = setInterval(auto, 5000);
    }


    // 鼠标点击指定跳转到哪一张图片(不能从当前点击的后一张图片开始播放？)
    for(var i = 0; i < oBli.length; i ++){
    	oBli[i].index = i;
    	oBli[i].onclick = function(){
    		// 全部淡出
    		for(var j = 0; j < oBli.length; j ++){
    			mv.ui.fadeOut(oLli[j]);
    			mv.ui.fadeOut(oBli[j]);
    		}
    		// 当前淡入
    		mv.ui.fadeIn(oLli[this.index]);
    		mv.ui.fadeIn(this);
      	}
    }
};


// 滚动条
mv.app.toScroll = function(){
	var oAct = document.getElementById('activity');
	var oUl = oAct.getElementsByTagName('ul')[0];
	// 鼠标移入显示滚动条
	oUl.onmouseover = function(){
		this.style.overflow = 'auto';
	}
	// 鼠标移出隐藏滚动条
	oUl.onmouseout = function(){
		this.style.overflow = 'hidden';
	}
}

// // 爆款热卖：鼠标移入，文字上移
// mv.app.toTextup = function(){
// 	var oSale = document.getElementById('sale');
// 	var oUl = oSale.getElementsByTagName('ul')[0];
// 	var oLi = oUl.getElementsByTagName('li');
// 	var oP = oUl.getElementsByTagName('p');

// 	for(var i = 0; i < oLi.length; i ++){
// 		oLi[i].index = i;
// 		oLi[i].onmouseover = function(){
// 			oP[this.index].style.color = '#ff9d00';
// 			oP[this.index].style.background = '#f8f8f8';

// 		}
// 		oLi[i].onmouseout = function(){
// 			oP[this.index].style.color = '#333';
// 			oP[this.index].style.background = 'none';
// 		}
// 	}
// }


// 筛选框
mv.app.toSelect = function(){
	var oPaper = document.getElementById('papers');
	var oMenu = oPaper.getElementsByClassName('menu')[0];
	var oSelect = oMenu.getElementsByClassName('select')[0];
	var oIcon = oSelect.getElementsByTagName('img')[0];

	var oFilter = oPaper.getElementsByClassName('filter_box')[0];

	oSelect.onmouseover = function(){
		oIcon.src = 'images/main/list_white.png';
	}
	oSelect.onmouseout = function(){
		oIcon.src = 'images/main/list_grey.png';
	}
	oSelect.onclick = function(event){
		var event = event || window.event;
		//阻止事件冒泡
        if(event.stopPropagation){
            event.stopPropagation();
        }else{
            event.cancleBubble = true;
        }
		oFilter.style.display = 'block';
	}
	document.onclick = function(){
		oFilter.style.display = 'none';
	}
};


// 文章板块切换
mv.app.toSwitch = function(){
	var oPaper = document.getElementById('papers');
	var oMenu = oPaper.getElementsByClassName('menu')[0];
	var oHot_btn = oMenu.getElementsByTagName('span')[0];    // 热门游记
	var oNew_btn = oMenu.getElementsByTagName('span')[2];    // 最新发表
	var oUl = oMenu.getElementsByTagName('ul')[0];
	var oLi = oUl.getElementsByTagName('li');

	var oHot = document.getElementById('hot_paper');
	var oNew = document.getElementById('new_paper');

	oHot_btn.onclick = function(){
		this.style.color = '#ff9d00';
		oNew_btn.style.color = '#333';

		oNew.style.display = 'none';
		oHot.style.display = 'block';
        
        // 全部不显示
		for(var i = 0; i < oLi.length; i ++){
			oLi[i].style.opacity = 0;
		}
		// 显示当前边框
		oLi[0].style.opacity = 1;
	}

	oNew_btn.onclick = function(){
		this.style.color = '#ff9d00';
		oHot_btn.style.color = '#333';
		
		oHot.style.display = 'none';
		oNew.style.display = 'block';

		// 全部不显示
		for(var i = 0; i < oLi.length; i ++){
			oLi[i].style.opacity = 0;
		}
		// 显示当前边框
		oLi[1].style.opacity = 1;
	}
		
}

// 鼠标移入文章，标题改变颜色
mv.app.toBling = function(){
	var oHot = document.getElementById('hot_paper');
	var oNew = document.getElementById('new_paper');

	var oHdl = oHot.getElementsByTagName('dl');
	var oNdl = oNew.getElementsByTagName('dl');

	for(var i = 0; i < oHdl.length; i ++){
		oHdl[i].onmouseover = function(){
			var oTitle = this.getElementsByClassName('title')[0];
			oTitle.style.color = '#ff9d00';
		}

		oHdl[i].onmouseout = function(){
			var oTitle = this.getElementsByClassName('title')[0];
			oTitle.style.color = '#333';
		}
	}

	for(var i = 0; i < oHdl.length; i ++){
		oNdl[i].onmouseover = function(){
			var oTitle = this.getElementsByClassName('title')[0];
			oTitle.style.color = '#ff9d00';
		}

		oNdl[i].onmouseout = function(){
			var oTitle = this.getElementsByClassName('title')[0];
			oTitle.style.color = '#333';
		}
	}
}
