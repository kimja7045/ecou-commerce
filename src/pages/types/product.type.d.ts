export interface IProduct {
  id: number
  name: string
  contents?: string
  categoryId: number
  createdAt: Date
  imageUrl: string
  price: number
}
