export {};

declare global {
  type PostResponse = {
    id: number;
    url: string;
    shortCode: string;
    createdAt: string;
    updatedAt: string;
    [key: string]: string | number;
  };
}
