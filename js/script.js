window.onload = function(){
	waterfall('main','box');
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