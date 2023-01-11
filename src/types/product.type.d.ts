export interface IProduct {
  id: number
  name: string
  description: string
  category_id: string
  createdAt: Date
  image_url?: string
  price: number
  isVisible: boolean
}
