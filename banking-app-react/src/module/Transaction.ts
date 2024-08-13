export interface Transaction {
  id: number;
  name: string;
  transactionType: string;
  transactionFrom: string;
  transactionTo: string;
  date: string;
  created_at: string;
  updated_at: string;
  account_id: number;
  amount: number;
}