window.onload = function(){
	waterfall('main','box');
	var dataPic = {"data":[{"src":"0.jpg"},{"src":"1.jpg"},{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},
							{"src":"5.jpg"},{"src":"6.jpg"},{"src":"7.jpg"},{"src":"8.jpg"},{"src":"9.jpg"},
							{"src":"10.jpg"},{"src":"11.jpg"},{"src":"12.jpg"},{"src":"13.jpg"},{"src":"14.jpg"},
							{"src":"15.jpg"},{"src":"16.jpg"},{"src":"17.jpg"},{"src":"18.jpg"},{"src":"19.jpg"},
							{"src":"20.jpg"},{"src":"21.jpg"},{"src":"22.jpg"},{"src":"23.jpg"},{"src":"24.jpg"},
							{"src":"25.jpg"}]};
	window.onscroll = function(){
		if (checkScrollSlide) {
			var oParent = document.getElementById("main");
			var oFragment = document.createDocumentFragment();
			for(var i=0;i<dataPic.data.length;i++){
				
				var aBox = document.createElement('div');
				aBox.className = 'box';
				oFragment.appendChild(aBox);

				var aPic = document.createElement('div');
				aPic.className = 'pic';
				aBox.appendChild(aPic);

				var aImg = document.createElement('img');
				aImg.src = "images/" + dataPic.data[i].src;
				aPic.appendChild(aImg);
			}
			oParent.appendChild(oFragment);
			waterfall('main','box');
		}
	}
}

function waterfall(parent,box){
	// 将main下的所有class为box的元素取出来
	var oParent = document.getElementById(parent);
	var aBox = oParent.getElementsByClassName(box);
	//console.log(aBox);
	
	// 计算整个页面显示的列数（页面宽/box的宽）
	var aBox_width = aBox[0].offsetWidth;
	//console.log(aBox_width);
	var cols = Math.floor(document.documentElement.clientWidth/aBox_width);

	//设置main的宽
	oParent.style.cssText = 'width:' + aBox_width*cols + 'px;margin: 0 auto;';

	//存每一列的现有高度
	var cols_height = [];
	for (var i = 0,l = aBox.length; i < l; i++) {
		if (i < cols) {
			cols_height.push(aBox[i].offsetHeight);
		}else {
			var min_height = Math.min.apply(null,cols_height);
			min_heightIndex = cols_height.indexOf(min_height);
			//console.log(min_heightIndex);

			aBox[i].style.position = 'absolute';
			aBox[i].style.top = min_height + 'px';
			aBox[i].style.left = aBox[min_heightIndex].offsetLeft + 'px';
			cols_height[min_heightIndex] += aBox[i].offsetHeight;
		}
	}

}

function checkScrollSlide(){
	var oParent = document.getElementById(parent);
	var aBox = oParent.getElementsByClassName(box);
	var lastBoxH = aBox[aBox.length-1].offsetTop + Math.floor(aBox[aBox.length-1].offsetHeight/2);
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
	var height = document.body.clientHeight || document.documentElement.clientHeight;
	//console.log(scrollTop);

	return (lastBoxH < scrollTop + height)?true:false;
}