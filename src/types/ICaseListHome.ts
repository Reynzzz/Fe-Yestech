interface IImage {
  link: string
}

export interface ICaseListHome {
  id: number
  name: string
  image: IImage[]
  location: string
  product: string
  details: string
  createdAt?: string
  updatedAt?: string
}
