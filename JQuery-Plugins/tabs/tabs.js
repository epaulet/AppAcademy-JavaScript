$.Tabs = function (el) {
  this.$el = $(el);
  this.breeds = [
    ['lab', "The Labrador Retriever is the most popular dog breed in the United States (and Canada and Australia). He's owned by millions of people! Labs are loving, people-oriented dogs. They are very loyal and loving to their families. Labs are friendly, happy-go-lucky dogs prized for their stable and reliable temperaments. Labs are good-natured and trustworthy. They're dependable and easy-going. Labs are very stable, they aren't easily upset or startled. They're eager to please you; always seeking your approval. Labs are very affectionate with their families and desire plenty of close physical contact: tummy rubs and behind the ears scratches. They thrive on human companionship and attention. They always want to be with you and will follow you around everywhere you go! They'll lie on your feet, sit on your lap, and lean against you! If you don't like being followed around and having a dog in your face all the time, then a Lab probably isn't for you -- because he just wants to be with you!"],
    ['pug', "Pugs are small dogs with big personalities. They live to love and to be loved and were bred for one reason: to be your companion. They will try to live in your lap, eat your food, and sleep on your bed. They are incredibly playful, outgoing, adaptable, happy, lively, and affectionate. They need human companionship to survive, and will not do well at all if left alone for long periods of time. Your Pug will want and need to be part of your family. A Pug will spend his life by your side, every moment of it. They are excellent with children and are usually good with other animals in the household. Pugs are low-activity dogs. They enjoy the daily walk, but don't need hours of exercise each day. They don't like water (most cannot swim) and they don't like Frisbees or balls. They like to lie in your lap instead. You will need to be careful that your Pug doesn't exercise to the point of overheating. You will have to be especially vigilant on hot and humid days."],
    ['corgi', "The Cardigan Welsh Corgi equals big personality in a little dog. These are intelligent, active, alert little guys who will want to be the center of your world. They love to be with their families, and will shower you with loyalty, devotion and affection. They need daily exercise and love to take long walks with you. They are intelligent and eager to please and do great with obedience training. They excel in obedience, agility, flyball, Frisbee, herding, and tracking competitions. They get along very well with respectful children, but parents need to be aware that Corgis might try to herd kids. (They also might try to herd other animals and your houseguests.)"]];

  this.setup();
  this.addContent();
  this.addTabs();

  this.$contentTabs = $(this.$el.data('content-tabs'));
  this.$activeContent = this.$contentTabs.find('.active');

  this.registerClicks();
};

$.Tabs.prototype.registerClicks = function () {
  this.$el.on('click', this.clickTab.bind(this));
};

$.Tabs.prototype.clickTab = function (event) {
  event.preventDefault();
  if(this.transitioning) {
    return;
  }
  this.transitioning = true;
  console.log("transitioning true");


  var $transitionContent = this.$activeContent;
  $transitionContent.removeClass('active');
  $transitionContent.addClass('transitioning');
  this.$el.find('.active').removeClass("active");
  $(event.target).addClass("active");

  $transitionContent.one("transitionend", function () {
    $transitionContent.removeClass('transitioning');
    this.$activeContent = this.$contentTabs.find($(event.target).attr('href'));
    this.$activeContent.addClass('transitioning');

    setTimeout(function() {
      this.$activeContent.removeClass('transitioning');
      this.$activeContent.addClass('active');
      this.transitioning = false;
    }.bind(this), 0);
  }.bind(this));

};

$.Tabs.prototype.setup = function () {
  var $div = $('<div></div>').attr('id', 'content-tabs');
  this.$el.after($div);
  this.$el.attr('data-content-tabs','#content-tabs');

  for (var i = 0; i < 3; i++) {
    var $tabPane = $('<div></div>').attr('class','tab-pane');
    $div.append($tabPane);
  }

  $div.children().first().addClass('active');
};

$.Tabs.prototype.addContent = function () {
  for (var i = 0; i < 3; i++) {
    var $newContent = $('<p>' + this.breeds[i][1] + '</p>');
    $('.tab-pane:nth-child(' + (i + 1) + ')').append($newContent).attr('id', this.breeds[i][0]);
  }
};

$.Tabs.prototype.addTabs = function () {
  var $tabPanes = $(".tab-pane");

  for (var i = 0; i < $tabPanes.length; i++) {
    var tabId = $('.tab-pane:nth-child(' + (i + 1) + ')').attr('id');
    var $li = $("<li><a></a></li>");
    this.$el.append($li);
    $li.children().attr('href', '#' + tabId).html(tabId);
    if (i === 0) {
      $li.children().addClass('active');
    }
  }
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
