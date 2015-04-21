TrelloClone.Views.List = Backbone.CompositeView.extend({
  template: JST['lists/show'],
  tagName: 'div',
  className: 'col-sm-3 list-index-item',

  events: {
    'click .new-card-link': 'makeCard',
    'click .list-delete': 'deleteList'
  },

  initialize: function (options) {
    this.parentBoardView = options.parentBoardView;
    var list = this;
    if (this.model.get('cards')) {
      this.model.get('cards').forEach(function (card) {
        list.makeCard(card);
      });
    }
  },

  makeCard: function (card) {
    var cardModel = new TrelloClone.Models.Card(card);
    var cardView = new TrelloClone.Views.Card({ model: cardModel });
    this.addSubview('.card-index', cardView);
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.attachSubviews();
    return this;
  },

  deleteList: function (event) {
    this.parentBoardView.removeSubview('#list-index', this);
    this.model.destroy();
  }
});
