TrelloClone.Views.Card = Backbone.View.extend({
  template: JST['cards/show'],
  className: 'card-index-item btn btn-default',

  render: function () {
    this.$el.html(this.template({ card: this.model }));
    return this;
  }
});
