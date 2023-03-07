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
