export interface User {
  email?: string;
  mobile?: string;
}

export interface RequestData {
  amount: number;
  description: string;
  user: User;
}