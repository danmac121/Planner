let timeEl = document.querySelector("#currentDay")
let mainDiv = document.getElementById('mainDiv')
let hourDivs = mainDiv.querySelectorAll("div")
let currentHour = dayjs().format("HH");







$(function () {

    // event listener is set to the main div so we can listen for a click on the children we select (event target)
   document.getElementById('mainDiv').addEventListener("click", function(event){
    // target is set to button so we can listen for a button click
    if(event.target.matches("button")){
        // parent div is the parent element of the event target (button clicked)
        let parentDiv = event.target.parentElement
        // dataTime is the value of the data-time of the parent element in the html
        let dataTime = parentDiv.dataset.time
        // userInput is the value of the event target's (button clicked) previous sibling. previous sibling because the text area comes immediately before the buttons in our html
        let userInput = event.target.previousElementSibling.value;
        
        // we add to local storage the dataTime and userInput for the event target
        localStorage.setItem("hour " + dataTime, userInput)
    }





   })
    function retrieve(){
        // loops through hourDivs, the div children of main div 
        for (let i = 0; i < hourDivs.length; i++) {
            // hour div is set it equal to hourDivs where we are in the index
           let hourDiv = hourDivs[i];

        //dataTime set to the dataset time value at the hourDiv where we currently are in the loop
           let dataTime = hourDiv.dataset.time;

        //sets savedText to what is stored in local storage  
           let savedText = localStorage.getItem("hour " + dataTime)

            // if there is text saved at the selected dataTime value, we set the text area value to the text saved in local storage
           if (savedText){
            let textArea = hourDiv.querySelector("textarea")
            textArea.value = savedText;
           }
        }
        
    }
    retrieve();
    
    function checkTime(){
            // loops through hourDivs, the div children of the main div
        for (let i = 0; i < hourDivs.length; i++) {
            // hour div is set it equal to hourDivs where we are in the index
            let hourDiv = hourDivs[i]
            // currentHour is a globally scoped variable which is equal to dayjs hour in 24 hour clock format, if hourDivs data time at the current index is less than current hour, make the class past and remove present/future class 
            if(parseInt(hourDivs[i].dataset.time) < parseInt(currentHour)){
                hourDiv.classList.remove("present", "future");
                hourDiv.classList.add("past");
            }
            // if the previous statement did not apply to the hourDivs at the current index, we check if it is equal to currentHour and apply/remove classes accordingly
            else if(parseInt(hourDivs[i].dataset.time) === parseInt(currentHour)){
                hourDiv.classList.remove("past", "future");
                hourDiv.classList.add("present");
                
              }
            //   if neither of the previous statements apply to hourDivs at current index, we know it must be the future and apply/remove classes accordingly
            else {
                hourDiv.classList.remove("past", "present");
                hourDiv.classList.add("future");
              }
        }
    }
    checkTime()
   
    // timeEl is a globally scoped value tied to the p tag in the html doc. this sets the text content of that p tag to now ( dayjs() ) and the format we want is short month (MMM), 2 digit day (DD), 4 digit year(YYYY)
        timeEl.textContent = dayjs().format("MMM, DD YYYY")
  });
  
  




 