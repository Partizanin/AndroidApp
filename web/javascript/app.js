App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return data;
  }
});

var data = {"question": "Родова організація суспільства, в якій провідну роль відігравав чоловік, — це:",
"answers":[
  "А Лимарство",
  "Б Конярство",
  "В Вівчарство",
  "Г Скотарствоgit "
  ]};
