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
    <a href="#" class="pre arrow"><</a>设置左右切换按钮样式，图标可更改
    <a href="#" class="next arrow">></a>
    <div class="bullets">
      <a class="active" href="#"></a>设值按钮样式及avtive样式，第一个设置active
      <a href="#"></a>
      <a href="#"></a>
      <a href="#"></a>
    </div>
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
  this.preBtn = document.$.call(this.ct,'.pre')
  this.nextBtn = document.$.call(this.ct,'.next')
  this.bullets = document.$$.call(this.ct,'.bullets>a')
  this.imgCount = this.imgs.length
  this.pageIndex = 1
  this.isAnimate = false
  this.timer = this.autoPlay()
  this.isAuto = true

  for(var i=0; i<this.imgCount; i++){
    this.imgs[i].style.display = 'none'
  }
  this.imgs[0].style.display = 'block'

  this.bind()
}
Carousel.prototype.bind = function () {
  var _this = this
  _this.preBtn.onclick = function(){
    _this.closeAuto()
    _this.prePlay()
  }
  _this.nextBtn.onclick = function(){
    _this.closeAuto()
    _this.nextPlay()
  }
  for(var i=0; i<_this.imgCount; i++){
    _this.bullets[i].onclick = function () {
      _this.closeAuto()
      var index
      for(var i=0; i<_this.imgCount; i++){
        if(this === _this.bullets[i]){index = i;break}
      }
      if(index > _this.pageIndex - 1){
        _this.nextPlay(index - _this.pageIndex + 1)
      }else if(index < _this.pageIndex - 1){
        _this.prePlay(_this.pageIndex - index - 1)
      }
    }
  }
}

Carousel.prototype.prePlay = function (len) {
  var _this = this
  if(_this.isAnimate){return}
  _this.isAnimate = true
  if(len===undefined){len=1}
  _this.pageIndex -= len
  for(var i=0; i<_this.imgCount; i++){
    _this.imgs[i].style.display = 'none'
  }
  _this.imgs[((_this.pageIndex - 1)%4 + _this.imgCount)%4].style.opacity = 0
  _this.imgs[((_this.pageIndex - 1)%4 + _this.imgCount)%4].style.display = 'block'
  startMove(_this.imgs[((_this.pageIndex - 1)%4 + _this.imgCount)%4], 'opacity', 100,function(){
    _this.setBullet()
    _this.isAnimate = false
  })
}

Carousel.prototype.nextPlay = function (len) {
  var _this = this
  if(_this.isAnimate){return}
  _this.isAnimate = true
  if(len===undefined){len=1}
  _this.pageIndex += len
  for(var i=0; i<_this.imgCount; i++){
    _this.imgs[i].style.display = 'none'
  }
  _this.imgs[((_this.pageIndex - 1)%4 + _this.imgCount)%4].style.opacity = 0
  _this.imgs[((_this.pageIndex - 1)%4 + _this.imgCount)%4].style.display = 'block'
  startMove(_this.imgs[((_this.pageIndex - 1)%4 + _this.imgCount)%4], 'opacity', 100,function(){
    _this.setBullet()
    _this.isAnimate = false
  }) 
}

Carousel.prototype.setBullet = function () {
  for(var i=0; i<this.imgCount; i++){
    this.bullets[i].classList.remove('active')
  }
  this.bullets[((this.pageIndex - 1)%4 + this.imgCount)%4].classList.add('active')
}

Carousel.prototype.autoPlay = function () {
  var _this = this
  return setInterval(function(){
  _this.nextPlay()},3000)
}

Carousel.prototype.closeAuto = function () {
  var _this =this
  if(_this.isAuto === false){return}
  _this.isAuto = false
  clearInterval(_this.timer)
  setTimeout(function(){
    _this.timer = _this.autoPlay()
    _this.isAuto = true
  },3000)
}
