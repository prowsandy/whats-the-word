// This application is still under development.
// By Sandy Boy Rosas.
// October 12, 2021

// press 2 to move to next level

let words_phrase = [];

const box_limit = 15;
const page_stage = ['setup', 'getting_started', 'playing'];

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

function parseSetup(data){
    return data.split("\n");
}

var app = new Vue({
    el: '#app',
    data: {
        word_phrase_text : '',
        word_phrase_arr : [],
        page_stage: page_stage[0],
        level_position: 0,
        inputs : [],
        phrase: phraseParser('', []),
    },
    methods:{
        onGetStarted: function(){
            this.page_stage = 'playing';
        },
        onSetup: function(){
            this.page_stage = 'getting_started';
            this.word_phrase_arr = parseSetup(this.word_phrase_text);
            let initText = this.word_phrase_arr[this.level_position];
            this.phrase = phraseParser(initText, []);
            this.word_phrase_text = initText;
        }
    }
  });

  document.onkeypress = function (e) {
    e = e || window.event;
    var k = e.key.toUpperCase();
    var is_in_input = (app.inputs.find(element => element == k) != undefined) ? true : false;
    if(k == "ENTER"){
        app.phrase = phraseParser(app.word_phrase_text, app.inputs, true);
    }else if(k == "2"){
        console.log(app.level_position);
        app.level_position = app.level_position + 1;
        app.word_phrase_text = app.word_phrase_arr[app.level_position];
        app.inputs = [];
        app.phrase = phraseParser(app.word_phrase_text, app.inputs, false);
    }
    else{
        if(!is_in_input){
            app.inputs.push(k);
            app.phrase = phraseParser(app.word_phrase_text, app.inputs, false);
        }
    }
};