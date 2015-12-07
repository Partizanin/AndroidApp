App = Ember.Application.create();

App.Router.map(function () {
    // put your routes here
});

App.IndexRoute = Ember.Route.extend({
    model: function () {
        return getReturnData();
    },

    actions: {
        save: function () {
            Ember.Logger.log('Reoad Button');
            saveData();
        },
        next: function () {
            Ember.Logger.log('Next Button');

            loadNextContent();
        },
        prev: function () {
            Ember.Logger.log('Next Button');

            loadPreviousContent();
        }

    }

});

function getReturnData() {

    var paragraphsData = getContentData(userObj.currentPage.paragraph,userObj.currentPage.task);

    var question = paragraphsData.Qwestion;
    var answers = paragraphsData.Ansers;

    var result = {};
    result.question = question;
    result.answers = answers;

    return result;
}

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
    var currentPage = userObj.currentPage;

    saveToStorage(currentPage.paragraph, currentPage.task, data);

    function saveToStorage(paragraphNumber, taskNumber, data) {

        var storageData = JSON.parse(localStorage.getItem("userAnswers"));

        if (storageData) {

            var tasks = storageData.paragraphs[paragraphNumber].tasks[taskNumber];

           if(tasks) {
               $.each(data, function (key, value) {
                   tasks[key] = value;
               });
           }else{
               tasks = {};
               $.each(data, function (key, value) {
                   tasks[key] = value;
               });
           }

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

    if (storageData) {
        var currentPage = userObj.currentPage;
        var data = storageData.paragraphs[currentPage.paragraph].tasks[currentPage.task];

        pastDataToThePage(data);
    }

}

function loadNextContent() {

    var userTask = userObj.currentPage.task;
    var userParagraph = userObj.currentPage.paragraph;
    var contentExist = function(){
        var content = getContentData(userParagraph, userTask + 1);
        return content != undefined || content != null;
    };

    if(contentExist()){
        userObj.currentPage.task = userTask + 1;

        localStorage.setItem("UserData", JSON.stringify(userObj));

        location.reload();
    }else{
        window.alert("this is last task");
    }

}

function loadPreviousContent() {
    var userTask = userObj.currentPage.task;
    if (userTask != 1) {
        userObj.currentPage.task = userTask - 1;
        localStorage.setItem("UserData", JSON.stringify(userObj));
        location.reload();
    } else {

        window.alert("this is first task!!")

    }



}

var userObj = getUserObj();

function getUserObj() {
    var result = JSON.parse(localStorage.getItem("UserData"));
    if (result) {

    } else {

        var data = {
            "currentPage": {
                "paragraph": 1,
                "task": 1
            }
        };

        result = data;

        localStorage.setItem("UserData", JSON.stringify(data));
    }

    return result;

}

function getContentData(paragrapgNumber,taskNumber) {

    var data = {
        "paragraphs": {
            "1": {
                "tasks": {
                    "1": {
                        "Qwestion": "Родова організація суспільства, в якій провідну роль відігравав чоловік, — це:",
                        "Ansers": [
                            "А Лимарство",
                            "Б Конярство",
                            "В Вівчарство",
                            "Г Скотарство"
                        ]
                    },
                    "2": {
                        "Qwestion": "Утворення князем Романом Мстиславовичем Галицько-Волинської держави відбулося наприкінці",
                        "Ansers": [
                            "Х ст.",
                            "ХІ ст",
                            "ХІІ ст.",
                            "ХІІІ ст."
                        ]
                    },
                    "3": {
                        "Qwestion": "У «Слові о полку Ігоревім» ідеться про",
                        "Ansers": [
                            "один із походів руських князів на половців.",
                            "монгольську навалу на руські князівства.",
                            "розгром Хозарського каганату.",
                            "набіги печенігів на руські землі."
                        ]
                    }
                }
            }
        }
    };

    return data.paragraphs[paragrapgNumber].tasks[taskNumber];


}