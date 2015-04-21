TrelloClone.Routers.Router = Backbone.Router.extend({
  routes: {
    '': 'boardIndex',
    'boards/:id': 'boardShow'
  },

  initialize: function (options) {
    this.$rootEl = options.$rootEl;
    this._boardsCollection = new TrelloClone.Collections.Boards();
  },

  boardIndex: function () {
    this.$rootEl.removeClass('board-wrapper');
    var boardIndexView = new TrelloClone.Views.BoardIndex({
      collection: this._boardsCollection
    });
    this._swapView(boardIndexView);
  },

  boardShow: function (id) {
    this.$rootEl.addClass('board-wrapper');
    var board = this._boardsCollection.getOrFetch(id);
    var boardView = new TrelloClone.Views.Board({
      model: board
    });
    this._swapView(boardView);
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._boardsCollection.fetch();
    this.$rootEl.html(newView.render().$el);

    this._currentView = newView;
  }
});
