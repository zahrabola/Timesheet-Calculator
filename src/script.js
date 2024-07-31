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
        <input  class="purple wordkedhours" value="00:00" disabled />
      </td>
      <td>
        <button class="btn" type="submit" 
        ">add</button>
      </td>
      `;

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


forms.forEach((form) => 
    
    form.addEventListener("submit", function(e) {
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
  validateSubmission( day, startWork, endWork, submitBtn )

})
)


//create validation function 
function validateSubmission ( day, startWork, endWork, submitBtn ){
    if (day === "" || startWork === "" || endWork === "") {
        alert("Complete the start & end work hours");
      } else {
        submitBtn.classList.add("btn-green");
        submitBtn.innerHTML = "✔";
        return true;
      }
}




///https://volerelife.wordpress.com/2022/10/31/build-a-employee-timesheet-web-app/