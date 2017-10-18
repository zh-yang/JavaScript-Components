function Exposure(target,callback,times) {
  this.target = target
  this.callback = callback
  this.times = times ? times : 0
  this.init()
}

Exposure.prototype.init = function() {
  this.time = 0
  this.timer = null
  this.bind()
  this.check()
}

Exposure.prototype.bind = function() {
  var _this = this
  window.addEventListener('scroll',function() {
    if(_this.timer){
      clearTimeout(_this.timer)
    }
    _this.timer = setTimeout(function(){
      _this.check()
      
    },300)
  })
}

Exposure.prototype.check = function() {

  var _this = this
  if(_this.isVisible()){

     if(_this.times<1){}else if(_this.times>=1){
      _this.time++
      if(_this.time>_this.times){return}
    }else{}

    _this.callback(_this.target)
  }
}

Exposure.prototype.isVisible = function() {

  var windowHight = window.innerHeight,
      scrollTop = window.scrollY,
      offsetTop = this.target.offsetTop,
      nodeHeight = parseInt(getComputedStyle(this.target).height)
  if(offsetTop<windowHight+scrollTop&&scrollTop<offsetTop+nodeHeight){
    return true
  }else{
    return false
  }
}