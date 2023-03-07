import { Salary } from "./types/salary";

const grossInput = document.getElementById("gross-input") as HTMLInputElement | null;
const grossOutput = document.getElementById("gross-output") as HTMLParagraphElement | null;

console.log(grossInput);

grossInput?.addEventListener("keyup", (e) => {
  let salary = createNewSalary();
  updateGrossMonhtly(salary);
});

function updateGrossMonhtly(salary: Salary) {
  if (grossOutput == null) return;
  grossOutput.textContent = `£${salary.gross.toFixed(2)}`;
}

function createNewSalary(): Salary {
  let salary = {
    gross: 0,
  };

  if (grossInput != null) {
    salary.gross = Number(grossInput.value) / 12;
    if (isNaN(salary.gross)) {
      salary.gross = 0;
    }
  }

  return salary;
}

export {};
