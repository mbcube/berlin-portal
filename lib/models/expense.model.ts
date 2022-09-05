export interface Expense {
  date: string;
  description: string;
  type: ExpenseType;
  price: number;
  currency: "DH";
}

export enum ExpenseType {
  material,
  immaterial,
}
