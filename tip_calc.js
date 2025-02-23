/* main App */

/* define the global const DOM element for input part */
const bill_input_obj = document.getElementById("bill");
const tip_btn_objs = document.querySelectorAll(".tip-container button");
const custom_input_obj = document.getElementById("custom_percent");
const num_people_input_obj = document.getElementById("people");
const reset_btn_obj = document.getElementById("reset_btn");
/* define the global const DOM element for output part */
const tip_amount_obj = document.getElementById("tip-amount");
const total_amount_obj = document.getElementById("total-amount");

/* define the global varables */

let tip_percent = 0;
let bill = 0;
let num_people = 0;

function calc_app() {
  initialize();
  update_output();
  reset();
}

/* initialize the default value of app */
function initialize() {
  console.log("=== initialize the Page ====");
  bill_input_obj.value = "";
  custom_input_obj.value = "";
  num_people_input_obj.value = "";
  tip_amount_obj.innerHTML = "$0.00";
  total_amount_obj.innerHTML = "$0.00";
}

function local_calculate() {
  if (num_people === 0) {
    console.log("return [0, 0]");
    return [0, 0];
  }
  const tip_amount_person = (bill * tip_percent) / num_people;
  const total_amount_person = (bill * (1 + tip_percent)) / num_people;
  tip_amount_obj.innerHTML = `$${tip_amount_person.toFixed(2)}`;
  total_amount_obj.innerHTML = `$${total_amount_person.toFixed(2)}`;

  reset_btn_obj.classList.add("btn-active");
}

function removeActivebutton() {
  tip_btn_objs.forEach((button) => {
    button.classList.remove("active");
  });
}
function update_output() {
  /* geting update of bill input */
  bill_input_obj.addEventListener("input", () => {
    const value = bill_input_obj.value;
    if (isNaN(value) || value < 0) {
      bill_input_obj.value = "";
      bill = 0;
    } else {
      bill = parseFloat(value);
    }

    local_calculate();
  });

  /* getting update from custom input box typing*/
  custom_input_obj.addEventListener("input", () => {
    removeActivebutton();
    tip_percent = parseFloat(custom_input_obj.value) / 100;
    local_calculate();
  });

  /* getting update from tip button clicking */
  tip_btn_objs.forEach((button) => {
    button.addEventListener("click", (e) => {
      removeActivebutton();
      custom_input_obj.value = "";
      e.target.classList.add("active");

      tip_percent = parseFloat(e.target.innerHTML) / 100;
      console.log("tip_percent:", tip_percent);
      local_calculate();
    });
  });

  /* getting update from num of people input */
  num_people_input_obj.addEventListener("input", () => {
    num_people = parseInt(num_people_input_obj.value);
    if (num_people === 0) {
      console.log("can't be zero");
      document.getElementById("error_label").classList.add("active");
      num_people_input_obj.classList.add("input_erorr");
      return;
    }
    document.getElementById("error_label").classList.remove("active");
    num_people_input_obj.classList.remove("input_erorr");
    local_calculate();
  });
}

function reset() {
  if (!reset_btn_obj) {
    console.error("reset_btn_obj is not initialized");
    return;
  }
  reset_btn_obj.addEventListener("click", () => {
    reset_btn_obj.classList.remove("btn-active");
    initialize();
  });
}

calc_app();
