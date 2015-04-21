Journal.Routers.PostsRouter = Backbone.Router.extend({
  routes: {
    "": "postIndex",
    "posts/new": "newPost",
    "posts/:id": "postShow"
  },
  initialize: function (options) {
    this.$main = options.main;
    this.$sidebar = options.sidebar;

    this._posts = new Journal.Collections.Posts();
  },

  postIndex: function () {
    this._posts.fetch();
    var view = new Journal.Views.PostIndex({
      collection: this._posts
    });
    this.$sidebar.html(view.render().$el);
  },

  postShow: function (id) {
    var post = this._posts.getOrFetch(id);
    var view = new Journal.Views.PostShow({
      model: post
    });
    this._swapView(view);
  },

  newPost: function () {
    var post = new Journal.Models.Post();
    var view = new Journal.Views.PostForm({
      model: post,
      collection: this._posts
    });
    this._swapView(view);
  },

  _swapView: function(newView) {
    if (this.currentView) {
      this.currentView.remove();
    }
    this.$main.html(newView.render().$el);

    this.currentView = newView;
  }
});
