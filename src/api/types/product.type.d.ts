export interface IProduct {
  id: number
  name: string
  description: string
  categoryId: number
  createdAt: Date
  image?: string
  price: number
  isVisible: boolean
}
