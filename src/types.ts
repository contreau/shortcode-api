export type DatabaseResponse = {
  id: number;
  url: string;
  shortCode: string;
  createdAt: string;
  updatedAt: string;
  accessCount?: number;
  [key: string]: string | number | undefined;
};
