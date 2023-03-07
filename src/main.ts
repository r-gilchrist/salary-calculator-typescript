import { Salary, createEmptySalary } from "./salary.js";

const grossInput = document.getElementById("gross-input") as HTMLInputElement | null;
const pensionInput = document.getElementById("pension-input") as HTMLInputElement | null;

const grossOutput = document.getElementById("gross-output") as HTMLParagraphElement | null;
const incomeTaxOutput = document.getElementById("tax-output") as HTMLParagraphElement | null;
const niOutput = document.getElementById("NI-output") as HTMLParagraphElement | null;
const studentOutput = document.getElementById("student-output") as HTMLParagraphElement | null;
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
  updateOutputField(incomeTaxOutput, salary.income_tax);
  updateOutputField(niOutput, salary.nat_insurance);
  updateOutputField(studentOutput, salary.student_loan);
  updateOutputField(pensionOutput, salary.pension);
  updateOutputField(netOutput, salary.net);
}

function updateOutputField(element: HTMLParagraphElement | null, amount: number) {
  if (element == null) return;
  element.textContent = `£${(amount / 12).toFixed(2)}`;
}

function getSalary(): Salary {
  let salary = createEmptySalary();

  salary.gross = getInputAmount(grossInput);
  salary.pension = salary.gross * 0.01 * getInputAmount(pensionInput);

  let adjusted_gross = salary.gross - salary.pension;

  salary.income_tax = (adjusted_gross - 12500) * 0.2;
  salary.nat_insurance = (adjusted_gross - 12500) * 0.12;
  salary.student_loan = (adjusted_gross - 20195) * 0.09;

  salary.net =
    salary.gross - salary.income_tax - salary.nat_insurance - salary.student_loan - salary.pension;

  return salary;
}

function getInputAmount(element: HTMLInputElement | null) {
  if (element == null) return 0;
  let amount = Number(element.value);
  if (isNaN(amount)) return 0;
  return amount;
}

export {};
