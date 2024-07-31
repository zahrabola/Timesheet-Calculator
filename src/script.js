const tableBodyTrs = document.querySelector(".tablebody")
.querySelectorAll(".tr")
console.log(tableBodyTrs)
function createForm() {
    let form = document.createElement("form");
  
    form.innerHTML = `
      <th>  <input type="text" class="orange"  placeholder="Enter day" /></th>
      <td>
        <input type="time" id="start-work" class="blue"/>
      </td>
      <td>
        <input type="time" id="start-break" class="green" />
      </td>
      <td>
        <input type="time" id="end-break" class="green"/>
      </td>
      <td>
        <input type="time" id="end-work" class="blue"/>
      </td>
     
      <td>
        <input  class="purple wordkedHours" value="00:00" disabled />
      </td>
      <td>
        <button class="btn" type="submit" 
        ">add</button>
      </td>
      `;
      form.onsubmit = (e) => handleFormSubmission(e);
    return form;
  }


  //  Add all form elements to the DOM using async and IIFE (Immediately Invoked Function Expression)
  (async () => {
    tableBodyTrs.forEach((tr) => {
      tr.appendChild(createForm());
    });
  })();
  


//Get all forms elements from the DOM
const forms = document.querySelectorAll("form")
//console.log(forms)

function handleFormSubmission(e)  {
    e.preventDefault();

    const day = e.target.children[0].value;
    //console.log(day)

    const startWork = e.target.children[1].value;
    const startBreak = e.target.children[2].value;
    const endBreak = e.target.children[3].value;
    const endWork = e.target.children[4].value;
    let worked = e.target.children[5];
    let submitBtn = e.target.children[6];
    //console.log(submitBtn);
    // console.log(worked.value);

  //validation
  ///console.log(startWork)


  if (validateSubmission(day, startWork, endWork, submitBtn)) {
    //TODO: [ ] 5. Calculate the daily hours worked

    //? Elements for overtime?

    worked.value = calcDailyWorkedHours(
      startWork,
      endWork,
      startBreak,
      endBreak,

      e
    );

    // todo: [ ] 6.Calculate total amount of worked hours
    calculateTotalWorkedHours();
  } else {
    return;
  }

}


//create validation function 
function validateSubmission ( day, startWork, endWork, submitBtn ){
    if (day === "" || startWork === "" || endWork === "") {
        console.log(day);
        alert("Enter the work day, start & end work hours");
      } else {
        submitBtn.classList.add("btn-green");
        submitBtn.innerHTML = "&#10004;";
        return true;
      }
}



// a function that calculates the amount of hours worked
function calcDailyWorkedHours(startWork, endWork, startBreak, endBreak) {
    //Covert string to time
    startWork = startWork.split(":");
    endWork = endWork.split(":");
    startBreak = startBreak.split(":");
    endBreak = endBreak.split(":");
  
    // Get Dates and calculates work time
  
    const startWorkDate = new Date(0, 0, 0, startWork[0], startWork[1], 0);
      //console.log(startWork)
    const endWorkDate = new Date(0, 0, 0, endWork[0], endWork[1], 0);
    const diffWork = endWorkDate.getTime() - startWorkDate.getTime();
  
    // Calculate break time
    const startBreakDate = new Date(0, 0, 0, startBreak[0], startBreak[1], 0);
    const endBreakDate = new Date(0, 0, 0, endBreak[0], endBreak[1], 0);
    const diffBreak = endBreakDate.getTime() - startBreakDate.getTime();
  
    // Calculate the final difference work - break time
    let diffFinal =
      (isNaN(diffWork) ? 0 : diffWork) - (isNaN(diffBreak) ? 0 : diffBreak);
  
    // covert back to time
    let hours = Math.floor(diffFinal / 1000 / 60 / 60);
    // substraction assigment
    diffFinal -= hours * 1000 * 60 * 60;
    const minutes = Math.floor(diffFinal / 1000 / 60);
  
    return (
      (hours < 9 ? "0" : "") + hours + ":" + (minutes < 9 ? "0" : "") + minutes
    );
  }




  //  function calculates total amount of worked hours
  function calculateTotalWorkedHours() {
    const allWorkedHours = document.querySelectorAll(".workedHours");
  //console.log(allWorkedHours)

    // Convert NodeList to array
  
    let arrayOfWorkedHours = Array.from(allWorkedHours);
  //console.log(arrayOfWorkedHours)
    let newWorkHours = arrayOfWorkedHours.map((workedHour) => {
      return workedHour.value;
    });
  
    // Create a empty array and add elements to it.
    let arr = [];
    arr.push(newWorkHours);
   /// console.log(arr)
  
    // Covert time strings to minutes
    let subArr = arr[0].map((el) => {
      const [hours, minutes] = el.split(":");
      console.log(hours * 60 + minutes);
      return parseInt(hours) * 60 + parseInt(minutes);
    });
  
    console.log(subArr);
  
    // Return only work hours that exist
  
    let calculateTotalHoursWorked = subArr.reduce(
      (partialSum, a) => parseInt(partialSum + a),
      0
    );
  
    // Output for Total Worked Hours
    let outputWorkedHours = document.getElementById("totalWorkedHours");
    outputWorkedHours.value = minutesToHoursAndMinutes(calculateTotalHoursWorked);
  }
  





//Create a function that converts minutes to minutes and hours
function minutesToHoursAndMinutes(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return (hours + "").padStart(2, "0") + ":" + (mins + "").padStart(2, "0");
  }



