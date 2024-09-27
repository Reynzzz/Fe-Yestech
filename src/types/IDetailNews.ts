interface Image {
  link: string
}

interface Detail {
  index?: number
  text?: string
  image?: string[]
}

export interface IDetailNews {
  id: number
  name: string
  imageNews: Image[]
  details: Detail[]
  createdAt: string
  updatedAt: string
}
