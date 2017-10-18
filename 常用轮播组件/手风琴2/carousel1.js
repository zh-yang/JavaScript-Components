/*
  1.使用时传入：焦点图容器 container
  2.自行设置container宽高，设置container的position属性不为默认值、 overflow:hidden
  3.设置ul,li list-style:none
  4.焦点图容器按以下结构：（容器名可随意设置）
    设置li-position:absolute;快高为100%;设置img宽高为100%,display:block
  <div class="window"> 容器名可随意设置并传入
    <ul class="ct">
      <li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/16.jpg" alt=""></a></li>
      <li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/14.jpg" alt=""></a></li>
      <li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/6.jpg" alt=""></a></li>
      <li><a href="#"><img src="http://cdn.jirengu.com/book.jirengu.com/img/7.jpg" alt=""></a></li>
    </ul>
  </div>

*/

document.$ = function (ele) {
  return this.querySelector(ele)
}
document.$$ = function (ele) {
  return this.querySelectorAll(ele)
}

function Carousel (container) {
  this.ct = container
  this.init()
}
Carousel.prototype.init = function () {
  this.imgs = document.$$.call(this.ct,'.ct>li')
  this.imgCount = this.imgs.length
  this.imgWidth = parseInt(getComputedStyle(this.imgs[0]).width)
  this.gapWidth = Math.floor(this.imgWidth/12)

  for(var i=0; i<this.imgCount; i++){
    this.imgs[i].style.left = i*(this.imgWidth)/this.imgCount + 'px'
  }

  this.bind()
}
Carousel.prototype.bind = function () {
  var _this = this
  for(var i=0; i<_this.imgCount; i++){
  	_this.imgs[i].index = i
    _this.imgs[i].onmouseenter = function () {
    	for(var i=0; i<_this.imgCount; i++){
				if(i<=this.index){
					startMove(_this.imgs[i],'left',i*_this.gapWidth);
				}
				else if(i>this.index){
					startMove(_this.imgs[i],'left',_this.imgWidth - _this.imgCount*_this.gapWidth+i*_this.gapWidth);
				}
			}
    }
    _this.imgs[i].onmouseleave = function () {
      for(var i=0; i<_this.imgCount; i++){
          startMove(_this.imgs[i],'left',i*parseInt((_this.imgWidth)/_this.imgCount))
      }
    }
  }
}



