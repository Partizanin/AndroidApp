/**
 * Created by Partizanin on 06.12.2015.
 */

$(window).load(function () {
    loadData();

});

$("#test").click(function () {
    saveData();

});

function loadData() {
    var data = JSON.parse(localStorage.getItem("answers"));
    var value = data.paragraphs[1].tasks[1].answers;

    $.each(value, function(key, value) {
        console.log(key, value);
    });

    var answer1 = $('#lab1').text();
    var answer2 = $('#lab2').text();
    var answer3 = $('#lab3').text();
    var answer4 = $('#lab4').text();

    $.each(value, function(key, value) {
        if(answer1 == key){
            $('#check1').prop('checked', value);
        }
        if(answer2 == key){
            $('#check2').prop('checked', value);
        }
        if(answer3 == key){
            $('#check3').prop('checked', value);
        }
        if(answer4 == key){
            $('#check4').prop('checked', value);
        }
    });

}


function saveObject(paragraphNumber, taskNumber, data) {

    var storageData = JSON.parse(localStorage.getItem("userAnswers"));

    if (storageData) {
        var tasks = storageData.paragraphs[paragraphNumber].tasks[taskNumber];
        $.each(data, function (key, value) {
            tasks[key] = value;
        });
        storageData.paragraphs[paragraphNumber].tasks[taskNumber] = tasks;
        localStorage.setItem("userAnswers",  JSON.stringify(storageData));
        console.log("test Passed Data");
        var testPassData = JSON.parse(localStorage.getItem("userAnswers"));
        testPassData = testPassData.paragraphs[paragraphNumber].tasks[taskNumber];
        $.each(testPassData,function(key,value){
            console.log(key + " " + value);

        });

    }else{

        var jsonData = {
            paragraphs: {
                1: {
                    tasks: {
                        1:{

                        }
                    }
                }
            }
        };

        $.each(data, function (key,value) {
            jsonData.paragraphs[paragraphNumber].tasks[taskNumber][key] = value;
        });

        localStorage.setItem("userAnswers", JSON.stringify(jsonData));
        testPassData = JSON.parse(localStorage.getItem("userAnswers"));

        testPassData = testPassData.paragraphs[paragraphNumber].tasks[taskNumber];
        console.log("test Passed Data");
        $.each(testPassData,function(key,value){
            console.log(key + " " + value);

        });

    }


}

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

    saveObject(1, 1, data);

}



function getAnswer(paragraphNumber, taskNumber) {
    var answers = {
        paragraphs: {
            1: {
                tasks: {
                    1: {
                        165: false,
                        256: false,
                        365: true,
                        335: false
                    }
                }
            }
        }
    };

    return answers.paragraphs[paragraphNumber].tasks[taskNumber];

}
