Journal.Collections.Posts = Backbone.Collection.extend({
  model: Journal.Models.Post,
  url: "/posts",

  getOrFetch: function (id) {
    var model = this.get(id);
    if (!model) {
      model = new Journal.Models.Post({id: id});
      model.fetch({
        success: function () { this.add(model); }.bind(this)
      });
    } else {
      model.fetch();
    }
    return model;
  }
});
