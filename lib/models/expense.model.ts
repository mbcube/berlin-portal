export interface Expense {
  date: string;
  description: string;
  type: ExpenseType;
  price: number;
  currency: "DH";
  timestamp: number;
}

export enum ExpenseType {
  material = "material",
  immaterial = "immaterial",
}
