TrelloClone.Views.BoardIndexItem = Backbone.View.extend({
  template: JST['boards/index_item'],
  className: 'col-md-3',

  render: function () {
    var content = this.template({ board: this.model });
    this.$el.html(content);

    return this;
  }
});
