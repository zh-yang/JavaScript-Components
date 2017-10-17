/*
  1.使用时传入：焦点图容器 container、焦点图数据数组 imgsSrcArr
  2.自行设置container宽高，设置container的position属性不为默认值、 overflow:hidden
  3.设置ul,li list-style:none
*/

function Carousel (container,imgsSrcArr) {
      this.ct = container
      this.imgData = imgsSrcArr
      this.init()
    }
    Carousel.prototype.init = function () {
      var _this = this
          _this.imgWidth = parseInt(getComputedStyle(_this.ct).width)
          _this.imgHeight = parseInt(getComputedStyle(_this.ct).height)
          _this.imgCount = _this.imgData.length
          _this.pageIndex = 1
          _this.isAnimate = false
          _this.timer = _this.autoPlay()
          _this.isAuto = true
          _this.wrap = document.createElement('ul')
          _this.bullets = document.createElement('div')
      var li = document.createElement('li')
          li.innerHTML = '<a href="#"><img src=' + _this.imgData[_this.imgCount-1] + '></a>' 
      _this.wrap.appendChild(li)
      _this.imgData.forEach(function(src){
        var li =  document.createElement('li')
            li.innerHTML = '<a href="#"><img src=' + src + '></a>'
        _this.wrap.appendChild(li)
      })
      var li = document.createElement('li')
          li.innerHTML = '<a href="#"><img src=' + _this.imgData[0] + '></a>'
      _this.wrap.appendChild(li)
      for(var i=0; i<_this.imgCount; i++){
        _this.bullets.innerHTML += '<a href="#"></a>'
      }
      _this.pre = document.createElement('a')
      _this.pre.setAttribute('href','#')
      _this.pre.innerText = '<'
      _this.next = document.createElement('a')
      _this.next.setAttribute('href','#')
      _this.next.innerText = '>'
      _this.lis = _this.wrap.getElementsByTagName('li')
      _this.createEle()
      _this.bind()
    }
    Carousel.prototype.createEle = function () {
      var _this = this,
          fragment = document.createDocumentFragment()
      _this.wrap.style.position = 'absolute'
      _this.wrap.style.width = _this.imgWidth*_this.lis.length + 'px'
      _this.wrap.style.height = _this.imgHeight + 'px'
      _this.wrap.style.left = _this.imgWidth*(-1) + 'px'
      _this.wrap.style.top = 0

      for(var i=0; i<_this.lis.length; i++){
        _this.lis[i].style.float = 'left'
        _this.lis[i].getElementsByTagName('img')[0].style.width = _this.imgWidth + 'px'
        _this.lis[i].getElementsByTagName('img')[0].style.height = _this.imgHeight + 'px'
        _this.lis[i].getElementsByTagName('img')[0].style.display = 'block'

        if(!_this.bullets.getElementsByTagName('a')[i]){continue}
        _this.bullets.getElementsByTagName('a')[i].style.display = 'inline-block'
        _this.bullets.getElementsByTagName('a')[i].style.width = '50px'
        _this.bullets.getElementsByTagName('a')[i].style.height = '10px'
        _this.bullets.getElementsByTagName('a')[i].style.borderRadius = '2px'
        _this.bullets.getElementsByTagName('a')[i].style.background = 'rgba(200,200,200,0.85)'
      }
      _this.bullets.getElementsByTagName('a')[0].style.background = '#333'

      _this.pre.style.display = 'block'
      _this.pre.style.position = 'absolute'
      _this.pre.style.top = '50%'
      _this.pre.style.transform = 'translateY(-50%)'
      _this.pre.style.width = '30px'
      _this.pre.style.width = '30px'
      _this.pre.style.borderRadius = '50%'
      _this.pre.style.background = 'rgba(200,200,200,0.85)'
      _this.pre.style.textAlign = 'center'
      _this.pre.style.lineHeight = '30px'
      _this.pre.style.color = 'white'
      _this.pre.style.zIndex = 2
      _this.pre.style.left = '20px'

      _this.next.style.display = 'block'
      _this.next.style.position = 'absolute'
      _this.next.style.top = '50%'
      _this.next.style.transform = 'translateY(-50%)'
      _this.next.style.width = '30px'
      _this.next.style.width = '30px'
      _this.next.style.borderRadius = '50%'
      _this.next.style.background = 'rgba(200,200,200,0.85)'
      _this.next.style.textAlign = 'center'
      _this.next.style.lineHeight = '30px'
      _this.next.style.color = 'white'
      _this.next.style.zIndex = 2
      _this.next.style.right = '20px'

      _this.bullets.style.position = 'absolute'
      _this.bullets.style.width = '100%'
      _this.bullets.style.bottom = '50px'
      _this.bullets.style.textAlign = 'center'
  
      fragment.appendChild(_this.wrap)
      fragment.appendChild(_this.pre)
      fragment.appendChild(_this.next)
      fragment.appendChild(_this.bullets)
      _this.ct.appendChild(fragment)
    }
    Carousel.prototype.bind = function () {
      var _this = this
      _this.next.onclick = function(){
        _this.closeAuto()
        _this.nextPlay()
      }
      _this.pre.onclick = function(){
        _this.closeAuto()
        _this.prePlay()
      }
      var bulls =  _this.bullets.getElementsByTagName('a')
      for(var i=0; i<_this.imgCount; i++){
        bulls[i].onclick = function(){
          _this.closeAuto()
          var index
          for(var i=0; i<_this.imgCount; i++){
            if(this === bulls[i]){index = i;break}
          }
          if(index > _this.pageIndex-1){
            _this.nextPlay(index - _this.pageIndex+1)
          }else{
            _this.prePlay(_this.pageIndex - index-1)
          }
        }
      }
    }
    Carousel.prototype.nextPlay = function (step) {
      var _this = this
      if(_this.isAnimate){return}
      _this.isAnimate = true
      if(step===undefined){step=1}
      _this.pageIndex += step
      startMove(_this.wrap, 'left', parseInt(_this.wrap.style.left) - step*_this.imgWidth,function(){
          if(_this.pageIndex > _this.imgCount){
            _this.wrap.style.left = _this.imgWidth*(-1) + 'px'
            _this.pageIndex = 1
          }
        _this.setBullet()
        _this.isAnimate = false
      })    
    }
    Carousel.prototype.prePlay = function (step) {
      var _this = this
      if(_this.isAnimate){return}
      _this.isAnimate = true
      if(step===undefined){step=1}
      _this.pageIndex -= step
      startMove(_this.wrap, 'left', parseInt(_this.wrap.style.left) + step*_this.imgWidth, function(){
          if(_this.pageIndex < 1){
            _this.wrap.style.left = _this.imgWidth*_this.imgCount*(-1) + 'px'
            _this.pageIndex = _this.imgCount
          }
        _this.setBullet()
        _this.isAnimate = false
      })
    }
    Carousel.prototype.setBullet = function () {
      var bulls = this.bullets.querySelectorAll('a')
      for(var i=0; i<this.imgCount; i++){
        bulls[i].style.background = 'rgba(200,200,200,0.85)'
      }
      bulls[this.pageIndex-1].style.background = '#333'
    }
    Carousel.prototype.autoPlay = function () {
      var _this = this
      return setInterval(function(){
        _this.nextPlay()},1300)
    }
    Carousel.prototype.closeAuto = function () {
      var _this = this
      if(_this.isAuto === false){return}
      _this.isAuto = false
      clearInterval(_this.timer)
      setTimeout(function(){
        _this.timer = _this.autoPlay()
        _this.isAuto = true
      },3000)
    }