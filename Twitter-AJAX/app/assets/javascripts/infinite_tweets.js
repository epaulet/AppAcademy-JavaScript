
$.InfiniteTweets = function(el, options) {
  this.$el = $(el);
  this.$feed = this.$el.find('#feed');
  this.maxCreatedAt = null;
  this.eventHandler();
};

$.InfiniteTweets.prototype.eventHandler = function() {
  this.$el.on('click', 'a.fetch-more', this.fetchTweets.bind(this));
};


$.InfiniteTweets.prototype.fetchTweets = function(event) {
  var createdData = {};
  if (this.maxCreatedAt) {
    createdData = {'max_created_at': this.maxCreatedAt};
  }

  $.ajax({
    url: '/feed',
    type: 'GET',
    dataType: 'json',
    data: createdData,
    success: function(response) {
      if (response.length > 0) {
        this.maxCreatedAt = response[response.length - 1].created_at;
        this.insertTweets(response);
      }
      if (response.length < 20) {
        $('a.fetch-more').remove();
        this.$el.append('<div>No More Tweets!</div>');
      }
    }.bind(this)
  });
};

$.InfiniteTweets.prototype.insertTweets = function(response) {
  var $script = this.$el.find('script');
  var tweetFunction = _.template($script.text());
  console.log(response);
  var $tweets = $(tweetFunction({tweets: response}));

  this.$feed.append($tweets);
};

$.fn.infiniteTweets = function(options) {
  this.each(function() {
    return new $.InfiniteTweets(this, options);
  });
};


$(function () {
  $('.infinite-tweets').infiniteTweets();
});
