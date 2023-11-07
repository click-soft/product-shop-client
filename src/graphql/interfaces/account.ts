export interface Account {
  id: number;
  userId: string;
  password: string;
  email: string;
  ykiho?: string;
  saupkiho?: string;
  token?: string | null;
  expiryDate?: Date | null;
  admin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
