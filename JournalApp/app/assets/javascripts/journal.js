window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Journal.Routers.PostsRouter({
      main: $("main"),
      sidebar: $("aside")
    });
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Journal.initialize();
});
