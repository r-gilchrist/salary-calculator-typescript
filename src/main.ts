import { Salary, createEmptySalary } from "./salary.js";

const grossInput = document.getElementById("gross-input") as HTMLInputElement | null;
const grossOutput = document.getElementById("gross-output") as HTMLParagraphElement | null;
const pensionInput = document.getElementById("pension-input") as HTMLInputElement | null;
const pensionOutput = document.getElementById("pension-output") as HTMLParagraphElement | null;
const netOutput = document.getElementById("net-output") as HTMLParagraphElement | null;

grossInput?.addEventListener("keyup", (e) => {
  let salary = createNewSalary();
  updateOutputFields(salary);
});

pensionInput?.addEventListener("keyup", (e) => {
  let salary = createNewSalary();
  updateOutputFields(salary);
});

function updateOutputFields(salary: Salary) {
  if (grossOutput != null) {
    grossOutput.textContent = `£${salary.gross.toFixed(2)}`;
  }
  if (pensionOutput != null) {
    pensionOutput.textContent = `£${salary.pension.toFixed(2)}`;
  }
  if (netOutput != null) {
    netOutput.textContent = `£${salary.net.toFixed(2)}`;
  }
}

function createNewSalary(): Salary {
  let salary = createEmptySalary();

  if (grossInput != null) {
    salary.gross = Number(grossInput.value) / 12;
    if (isNaN(salary.gross)) {
      salary.gross = 0;
    }
  }
  if (pensionInput != null) {
    salary.pension = salary.gross * 0.01 * Number(pensionInput.value);
    if (isNaN(salary.pension)) {
      salary.pension = 0;
    }
  }

  salary.net = salary.gross - salary.pension;

  return salary;
}

export {};
