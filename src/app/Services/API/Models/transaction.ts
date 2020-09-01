export interface Transaction {
  id: number;
  date: Date;
  amount: number;
  fee?: number;
  description?: string;
  userId?: number;
}
