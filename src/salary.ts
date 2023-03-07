export type Salary = {
  gross: number;
  pension: number;
  nat_insurance: number;
  income_tax: number;
  student_loan: number;
  net: number;
};

export function createEmptySalary(): Salary {
  return {
    gross: 0,
    pension: 0,
    nat_insurance: 0,
    income_tax: 0,
    student_loan: 0,
    net: 0,
  };
}

export function populateTaxes(salary: Salary): Salary {
  let after_sacrifice = salary.gross - salary.pension;
  salary.income_tax = calculateTax(after_sacrifice, 12570, 20);
  salary.nat_insurance = calculateTax(after_sacrifice, 12570, 12);
  salary.student_loan = calculateStudentLoan(after_sacrifice, 20195, 9);
  salary.net = after_sacrifice - salary.income_tax - salary.nat_insurance - salary.student_loan;
  return salary;
}

function calculateTax(amount: number, threshold: number, percentage: number): number {
  if (amount < threshold) return 0;
  return 0.01 * percentage * (amount - threshold);
}

function calculateStudentLoan(amount: number, threshold: number, percentage: number): number {
  if (amount < threshold) return 0;
  return 12 * Math.floor((0.01 * percentage * (amount - threshold)) / 12);
}
