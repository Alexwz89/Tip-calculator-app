const inputBill_obj = document.getElementById("bill");

let bill = 0;
let tip_percent = 0;
let num_people = 0;

let tip_amount_person = 0;
let total_amount_person = 0;

function calculate_tip_person() {
  tip_amount_person = (bill * tip_percent) / num_people;
}
function calculate_amount_person() {
  total_amount_person = (bill * (1 + tip_percent)) / num_people;
}

function update_output() {
  document.getElementById("tip-amount").innerHTML =
    tip_amount_person.toFixed(2);
  document.getElementById("total-amount").innerHTML =
    total_amount_person.toFixed(2);
}

const reset_btn_obj = document.getElementById("reset_btn");

function update() {
  if (num_people !== 0) {
    calculate_tip_person();
    calculate_amount_person();
    update_output();
    reset_btn_obj.classList.remove("btn-grey");
    reset_btn_obj.classList.add("btn-active");
  } else return;
}

inputBill_obj.addEventListener("input", (e) => {
  console.log(e.target.value);
  bill = parseFloat(e.target.value);
  update();
});

const inputButton_objs = document.querySelectorAll(".tip-container button");
console.log("132432", inputButton_objs);
inputButton_objs.forEach((button) => {
  button.addEventListener("click", (e) => {
    inputButton_objs.forEach((button) => {
      button.classList.remove("active");
    });
    inputCustom_obj.value = "";
    e.target.classList.add("active");
    tip_percent = parseFloat(e.target.innerHTML) / 100;
    console.log("tip_percent", tip_percent);
    update();
  });
});

const inputCustom_obj = document.getElementById("custom_percent");
inputCustom_obj.addEventListener("input", (e) => {
  inputButton_objs.forEach((button) => {
    button.classList.remove("active");
  });
  tip_percent = parseFloat(e.target.value) / 100;
  update();
});

const inputPeople_obj = document.getElementById("people");
const error_label_obj = document.getElementById("error_label");

inputPeople_obj.addEventListener("input", (e) => {
  num_people = Number(e.target.value);
  if (num_people === 0) {
    console.log("can't be zero");
    error_label_obj.classList.add("active");
    inputPeople_obj.classList.add("input_erorr");
  } else {
    error_label_obj.classList.remove("active");
    inputPeople_obj.classList.remove("input_erorr");
    update();
  }
});

reset_btn_obj.addEventListener("click", () => {
  reset_btn_obj.classList.remove("btn-active");
  reset_btn_obj.classList.add("btn-grey");
  inputBill_obj.value = "";
  inputPeople_obj.value = "";
  inputCustom_obj.value = "";
  inputButton_objs.forEach((button) => {
    button.classList.remove("active");
  });
  document.getElementById("tip-amount").innerHTML = "$0.00";
  document.getElementById("total-amount").innerHTML = "$0.00";
  error_label_obj.classList.remove("active");
  inputPeople_obj.classList.remove("input_erorr");
});
