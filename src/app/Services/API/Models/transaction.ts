export interface Transaction {
  id: number;
  date: string;
  amount: number;
  fee: number;
  description: string;
  userId: number;
}