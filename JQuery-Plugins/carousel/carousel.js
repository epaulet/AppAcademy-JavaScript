$.Carousel = function (el) {
  this.$carousel = $(el);
  this.activeIdx = 1;
  this.makeCarousel();
  this.addImages();
  this.$carousel.find('.items img:first-child').addClass('active');
  this.addClickHandler();
};

$.Carousel.prototype.addClickHandler = function () {
  this.$carousel.find('.slide-left').on('click', this.slide.bind(this));
  this.$carousel.find('.slide-right').on('click', this.slide.bind(this));
};

$.Carousel.prototype.slide = function (event) {
  var $slideDir = $(event.target);
  var imgCount = $('img').length;
  var slideDirClass = null;

  if ($slideDir.attr('class') === 'slide-left') {
    this.activeIdx = this.activeIdx === 1 ? imgCount : this.activeIdx - 1;
    slideDirClass = 'right';
  } else if ($slideDir.attr('class') === 'slide-right') {
    this.activeIdx = this.activeIdx === imgCount ? 1 : this.activeIdx + 1;
    slideDirClass = 'left';
  }

  var that = this;
  var $prevImg = this.$carousel.find('img.active');
  // this.$carousel.find('img.active').removeClass('active');
  var $nextImg = this.$carousel.find('.items img:nth-child(' + this.activeIdx + ')');
  $nextImg.addClass('active').addClass(slideDirClass);
  setTimeout(function() {
    $nextImg.removeClass(slideDirClass);
    $prevImg.addClass(that.oppDir(slideDirClass));
  }, 0);

  $nextImg.one('transitionend', function() {
    $prevImg.attr('class', '');
  });
};

$.Carousel.prototype.oppDir = function(dir) {
  return dir === 'left' ? 'right' : 'left';
};

$.Carousel.prototype.makeCarousel = function() {
  this.$carousel.html('<div class="items"></div>');
  this.$carousel.append('<a href="javascript:void(0)" class="slide-left">Prev</a>');
  this.$carousel.append('<a href="javascript:void(0)" class="slide-right">Next</a>');
};

$.Carousel.prototype.addImages = function() {
  this.$carousel.find('.items').append('<img src="img/dog1.jpg">');
  this.$carousel.find('.items').append('<img src="img/dog2.jpg">');
  this.$carousel.find('.items').append('<img src="img/dog3.jpg">');
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
