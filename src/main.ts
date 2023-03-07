import { Salary, createEmptySalary } from "./salary.js";

const grossInput = document.getElementById("gross-input") as HTMLInputElement | null;
const grossOutput = document.getElementById("gross-output") as HTMLParagraphElement | null;
const pensionInput = document.getElementById("pension-input") as HTMLInputElement | null;
const pensionOutput = document.getElementById("pension-output") as HTMLParagraphElement | null;
const netOutput = document.getElementById("net-output") as HTMLParagraphElement | null;

grossInput?.addEventListener("keyup", (e) => {
  let salary = getSalary();
  updateOutputFields(salary);
});

pensionInput?.addEventListener("keyup", (e) => {
  let salary = getSalary();
  updateOutputFields(salary);
});

function updateOutputFields(salary: Salary) {
  updateOutputField(grossOutput, salary.gross);
  updateOutputField(pensionOutput, salary.pension);
  updateOutputField(netOutput, salary.net);
}

function updateOutputField(element: HTMLParagraphElement | null, amount: Number) {
  if (element == null) return;
  element.textContent = `£${amount.toFixed(2)}`;
}

function getSalary(): Salary {
  let salary = createEmptySalary();

  salary.gross = getInputAmount(grossInput) / 12;
  salary.pension = salary.gross * 0.01 * getInputAmount(pensionInput);
  salary.net = salary.gross - salary.pension;

  return salary;
}

function getInputAmount(element: HTMLInputElement | null) {
  if (element == null) return 0;
  let amount = Number(element.value);
  if (isNaN(amount)) return 0;
  return amount;
}

export {};
