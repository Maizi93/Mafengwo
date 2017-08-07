// JavaScript Document for login

window.onload = function(){
	mv.app.toInput();
	mv.app.toSwitch();
}



var mv = {};          // 命名空间

mv.tools = {};        // 一些基本的方法

mv.tools.getStyle = function(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
};

mv.app = {};          // 具体应用

// 文本输入框
// 1.显示光标聚焦，边框变色并发光效果 (css解决)
// 2.光标离开，若文本框为空，显示提示文字
mv.app.toInput = function(){
	// 登录界面
	var oLg_box = document.getElementById('lg_box');
	var oInput_lg= oLg_box.getElementsByTagName('input');
	var oP_lg = oLg_box.getElementsByTagName('P');

	// 给每个文本输入框添加失去焦点事件
	for(var i = 0; i < oInput_lg.length; i ++){
		oInput_lg[i].index = i;
		oInput_lg[i].onblur = function(){
			if(this.value == ""){
				// 先让所有的提示信息不显示
				for(var j = 0; j < oP_lg.length; j ++){
					oP_lg[j].style.visibility = "hidden";
				}
				// 再让当前的提示信息显示
				oP_lg[this.index].style.visibility = "visible";
			}
		}
	}


	// 注册界面
	var oRg_box = document.getElementById('rg_box');
	var oInput_rg = oRg_box.getElementsByTagName('input')[0];
	var oP_rg = oRg_box.getElementsByClassName('phone')[0];

	// 给文本输入框添加失去焦点事件
	oInput_rg.onblur = function(){
		if(this.value == ""){
			oP_rg.style.visibility = "visible";
		}

		// 当文本内容不为空时
		// 手机号码格式不正确
		// 正确：不显示任何提示内容
	}
}

// 登录和注册界面的跳转
mv.app.toSwitch = function(){
	var oRg = document.getElementById('rg');
	var oLg = document.getElementById('lg');
	var oW_1 = document.getElementById('wrap_1');
	var oW_2 = document.getElementById('wrap_2');

	// 给“马上注册”添加点击事件
	oRg.onclick = function(){
		// 首先让两个界面都不显示
		oW_1.style.display = "none";
		oW_2.style.display = "none";
		// 再让当前的界面显示
		oW_2.style.display = "block";
	}

	// 给“马上登录”添加点击事件
	oLg.onclick = function(){
		// 首先让两个界面都不显示
		oW_1.style.display = "none";
		oW_2.style.display = "none";
		// 再让当前的界面显示
		oW_1.style.display = "block";
	}
}