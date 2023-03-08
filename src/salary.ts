export type Salary = {
  gross: number;
  pension: number;
  nat_insurance: number;
  income_tax: number;
  student_loan: number;
  net: number;
  student_loan_type: string;
};

type Tax = {
  basic_rate: number;
  basic_threshold: number;
  higher_rate: number;
  higher_threshold: number;
};

export function createEmptySalary(): Salary {
  return {
    gross: 0,
    pension: 0,
    nat_insurance: 0,
    income_tax: 0,
    student_loan: 0,
    net: 0,
    student_loan_type: "no_loan",
  };
}

export function populateTaxes(salary: Salary): Salary {
  let after_sacrifice = salary.gross - salary.pension;

  salary.income_tax = calculateTax(after_sacrifice, {
    basic_rate: 20,
    basic_threshold: 12570,
    higher_rate: 40,
    higher_threshold: 50270,
  });

  salary.nat_insurance = calculateTax(after_sacrifice, {
    basic_rate: 12,
    basic_threshold: 12570,
    higher_rate: 2,
    higher_threshold: 50270,
  });

  salary.student_loan = calculateStudentLoan(after_sacrifice, salary.student_loan_type);

  salary.net = after_sacrifice - salary.income_tax - salary.nat_insurance - salary.student_loan;

  return salary;
}

function calculateTax(amount: number, tax: Tax): number {
  let total: number = 0;

  if (amount < tax.basic_threshold) return total;
  total += (amount - tax.basic_threshold) * 0.01 * tax.basic_rate;

  if (amount < tax.higher_threshold) return total;
  total += 0.01 * (amount - tax.higher_threshold) * (tax.higher_rate - tax.basic_rate);

  return total;
}

function calculateStudentLoan(amount: number, loan_type: string): number {
  let threshold = 20195;
  let rate = 9;

  switch (loan_type) {
    case "no_loan":
      rate = 0;
    case "plan_2":
      threshold = 27295;
  }

  if (amount < threshold) return 0;

  return 12 * Math.floor((0.01 * (amount - threshold) * rate) / 12);
}
