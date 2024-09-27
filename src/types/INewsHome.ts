interface IImage {
  link: string
}

interface IDetail {
  text: string
}

export interface INewsHome {
  id: number
  name: string
  details: IDetail[]
  imageNews: IImage[]
  createdAt?: string
  updatedAt?: string
}
