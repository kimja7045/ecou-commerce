export interface Product {
  id: number;
  name: string;
  contents: string;
  category_id: number;
  createdAt: Date;
  image_url?: string;
  price: number;
  isVisible: boolean;
}

export interface Cart {
  id: number;
  name: string;
  productId: number;
  price: number;
  quantity: number;
  imageUrl: string;
}
