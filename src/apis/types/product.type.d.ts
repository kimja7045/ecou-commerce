export interface IProduct {
  id: number
  name: string
  description: string
  categoryId: number
  createdAt: Date
  imageUrl?: string
  price: number
  isVisible: boolean
}
