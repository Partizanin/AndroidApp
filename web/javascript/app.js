App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return data;
  },

  actions: {
    save: function() {
      Ember.Logger.log('Rload Button');
      saveData();
    },
    reload: function() {
      Ember.Logger.log('Reload Button');
      location.reload();
    },

    contract: function() {
      this.set('isExpanded', false);
    }
  }

});


var data = {"question": "Родова організація суспільства, в якій провідну роль відігравав чоловік, — це:",
"answers":[
  "А Лимарство",
  "Б Конярство",
  "В Вівчарство",
  "Г Скотарство"
  ]};

    $(window).load(function () {

      loadData();
    });

function saveData() {
  var answer1 = $('#lab1').text();
  var answer2 = $('#lab2').text();
  var answer3 = $('#lab3').text();
  var answer4 = $('#lab4').text();

  var checkbox1 = $('#check1').is(':checked');
  var checkbox2 = $('#check2').is(':checked');
  var checkbox3 = $('#check3').is(':checked');
  var checkbox4 = $('#check4').is(':checked');

  var data = {};
  data[answer1] = checkbox1;
  data[answer2] = checkbox2;
  data[answer3] = checkbox3;
  data[answer4] = checkbox4;
  {{debugger}}
  saveToStorage(1, 1, data);

  function saveToStorage(paragraphNumber, taskNumber, data) {

    var storageData = JSON.parse(localStorage.getItem("userAnswers"));

    if (storageData) {

      var tasks = storageData.paragraphs[paragraphNumber].tasks[taskNumber];

      $.each(data, function (key, value) {
        tasks[key] = value;
      });

      storageData.paragraphs[paragraphNumber].tasks[taskNumber] = tasks;
    } else {
      storageData = {
        paragraphs: {
          1: {
            tasks: {
              1: {}
            }
          }
        }
      };

      $.each(data, function (key, value) {
        storageData.paragraphs[paragraphNumber].tasks[taskNumber][key] = value;
      });


    }

    localStorage.setItem("userAnswers", JSON.stringify(storageData));
  }
}

function pastDataToThePage(data) {
  var answer1 = $('#lab1').text();
  var answer2 = $('#lab2').text();
  var answer3 = $('#lab3').text();
  var answer4 = $('#lab4').text();

  $.each(data, function (key, value) {
    if (answer1 == key) {
      $('#check1').prop('checked', value);
    }
    if (answer2 == key) {
      $('#check2').prop('checked', value);
    }
    if (answer3 == key) {
      $('#check3').prop('checked', value);
    }
    if (answer4 == key) {
      $('#check4').prop('checked', value);
    }
  });
}

function loadData() {
  var storageData = JSON.parse(localStorage.getItem("userAnswers"));
  Ember.Logger.log('loadData Method' + storageData);
  if (storageData) {
    var data = storageData.paragraphs[1].tasks[1];

    pastDataToThePage(data);
  }

}

