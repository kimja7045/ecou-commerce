export interface IProduct {
  id: number;
  name: string;
  contents: string;
  category_id: number;
  createdAt: Date;
  image_url?: string;
  price: number;
  isVisible: boolean;
}
