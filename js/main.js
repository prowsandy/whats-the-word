// This application is still under development.
// By Sandy Boy Rosas.
// October 12, 2021

let phrase2 = "For God so loved the world that he gave his one and only Son";

const box_limit = 15;

function rowParser(data, inputs, reveal_all){
    let main_data = []
    let phrse = data.split("");
    for(var i = 0; i < phrse.length; i++){
        var empty = (phrse[i] == ' ') ? true : false;
        var is_in_input = (inputs.find(element => element == phrse[i]) != undefined) ? true : false;
        let payload = {
            letter :  phrse[i],
            is_empty : empty,
            is_shown : (reveal_all) ? reveal_all : is_in_input
        }
        main_data.push(payload);
    }
    return main_data;
}

function phraseParser(data, inputs, reveal_all){
    let main_data = [];
    let word_group = data.split(" ");
    var loop_iter = 0;
    var tempText = "";
    var tempDisplay = []
    while(true){
      
        tempText += word_group[loop_iter] + " ";
        
        if(tempText.length <= box_limit){
            tempDisplay.push(tempText);
        }else{
            var last_word = word_group[loop_iter];
            p = {
                key: rowParser(tempDisplay[tempDisplay.length - 1].trim().toUpperCase(), inputs , reveal_all)
            }
            main_data.push(p);
            tempDisplay = [];
            tempText = last_word + " ";
            tempDisplay.push(tempText);
        }
        if(loop_iter >= word_group.length){
            break;
        }
        loop_iter++;
    }
    return main_data;
}

var app = new Vue({
    el: '#app',
    data: {
        inputs : [],
        phrase: phraseParser(phrase2, []),
    },
    methods:{

    }
  });

  document.onkeypress = function (e) {
    e = e || window.event;
    var k = e.key.toUpperCase();
    var is_in_input = (app.inputs.find(element => element == k) != undefined) ? true : false;
    if(k == "ENTER"){
        app.phrase = phraseParser(phrase2, app.inputs, true);
    }else{
        if(!is_in_input){
            app.inputs.push(k);
            app.phrase = phraseParser(phrase2, app.inputs, false);
        }
    }
};