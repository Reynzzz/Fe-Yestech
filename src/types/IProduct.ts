interface IImage {
  link: string
}

export interface IProduct {
  id: number
  name: string
  mainImg: IImage[]
  categoryId: number
  title: string | null
  detailsHome: string
  sections?: ISection[]
  createdAt?: string
  updatedAt?: string
  categoryProduct: ICategory
  typeId: number
  Type: ITypeCategory
}

export interface ISection {
  type: string
  title?: string
  description?: string
  background?: string
  layout: string
  images?: IImagesSection[]
}

export interface ICategory {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface ITypeCategory {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
}

export interface IImagesSection {
  url?: string
  file?: string
}

export interface IItemProduct {
  title?: string
  description?: string
  background?: string
  images?: IImagesSection[]
}
