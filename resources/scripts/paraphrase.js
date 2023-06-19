console.log("paraphrase.js loaded");

var randomlettersandnumbers = "sk-H7D4mvn";
var randomlettersandnumbers1 = "IskMU0l8jVkB5T3Bl";
var randomlettersandnumbers2 = "bkFJxaGBpt8fNvRBgKcgcazv";

localStorage.setItem("chatgptAPIKEY", randomlettersandnumbers+''+randomlettersandnumbers1+''+randomlettersandnumbers2);
const APIKEY = localStorage.getItem("chatgptAPIKEY");

if(localStorage.getItem("chatgptAPIKEY") === "" || localStorage.getItem("chatgptAPIKEY") === null ){
    document.getElementById('getAPIKEYBG').style.display = "block";
} else{

}


function saveAPIKEYtoLocalStorage(){
    var APIKEYTBvalue = document.getElementById('APIKEYTB').value;

    if(APIKEYTBvalue === "" || !APIKEYTBvalue.replace(/\s/g, '').length){
       
        document.getElementById("APIKEYTB").style.borderColor = "red";
        document.getElementById("APIKEYTB").style.borderBlockEndWidth = "3px";
        document.getElementById("APIKEYTB").focus();
        

    } else{
        localStorage.setItem("chatgptAPIKEY",APIKEYTBvalue);
        document.getElementById('getAPIKEYBG').style.display = "none";
        
    }
    
}

function showAPIKEYFORM(){
    document.getElementById('getAPIKEYBG').style.display = "block";
}


function fetchchatgpt(apikey, phrase){

    var phrase = phrase;
    var apikey = apikey;
    const API_URL = 'https://api.openai.com/v1/chat/completions';
    const MODEL_NAME = "gpt-3.5-turbo";
    document.getElementById('loader').style.display = "grid";

    fetch(API_URL, {
         method: 'POST',
         headers: {
         mode:'cors',
         Origin: "https://api.openai.com/",
        "Access-Control-Allow-Origin": "*",
        "Content-type" : "application/JSON",
        'Authorization': `Bearer ${apikey}`
         },
         body: JSON.stringify({
            model: MODEL_NAME,
            messages: [{ role: 'system', content: 'You are a helpful assistant.' }, { role: 'user', content: phrase }],
            max_tokens: 50, // Maximum number of tokens in the generated response
            temperature: 0.7, // Controls the randomness of the response (between 0 and 1)
            n: 1, // Number of responses to generate
            stop: ['\n'] // Stop generating tokens at a specific sequence (optional)
          })
     }).then(response =>{
        
            return response.json()

     }).then(data => {

            console.log("fetched from api");
            console.log(data);
            console.log(data.choices[0].message.content);
            showresult(data.choices[0].message.content);
            return data

     }).catch(error => {

             console.log(error)
             document.getElementById('systemOutputPhrase').value = error
             document.getElementById('systemOutputPhrase').style.color="red"
        
             return error

             
     })
     
     
    
}


//fetchchatgpt(APIKEY, "Paraphrase this sentence 'my god i hate mondays'");

function processuserinput(){
    var phrase = document.getElementById('userInputPhrase').value;
    var phraseElement = document.getElementById('userInputPhrase');
    var apikey = localStorage.getItem("chatgptAPIKEY");

    if(apikey === "" || apikey === null){
        showAPIKEYFORM();
    } else{
        if(phrase === "" || !phrase.replace(/\s/g, '').length){
            phraseElement.value = "";
        }else{
            phrase = "Paraphrase this sentence, '" + phrase + "'";
            fetchchatgpt(apikey, phrase);
        }

    }



}


function showresult(result){
    var result = result;
    var systemOutputPhrase = document.getElementById('systemOutputPhrase');
    systemOutputPhrase.value = result;
    document.getElementById('loader').style.display = "none";


}

function closeAPIFORM(){
    document.getElementById('getAPIKEYBG').style.display = "none";
}