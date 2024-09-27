interface IImage {
  link: string
}
export interface IWarehouse {
  id: number
  name: string
  alamat: string
  image: IImage[]
  createdAt?: string
  updatedAt?: string
}

export interface IParamsProduct {
  category: string
  search: string
  page: number
  limit: number
  type: string
}

export interface IParameters {
  tHead: string
  tBody: string[]
}
