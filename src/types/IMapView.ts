export interface ICategoryOwner {
  id: number
  name: string
  createdAt?: string
  updatedAt?: string
  top: {
    md: number
    xs: number
  }
  left: {
    md: number
    xs: number
  }
}

export interface IOwner {
  id: number
  name: string
  details: string
  noHp: string
  image: string
  email: string
  alamat: string
  linkWeb: string
  instagram: string
  facebook: string
  tiktok: string
  youtube: string
  categoryYestechOwnerId: number
  createdAt?: string
  updatedAt?: string
  categoryYestechOwner: {
    id: number
    name: string
    createdAt?: string
    updatedAt?: string
  }
}

export interface ILocations {
  name: string
  isHovered: boolean
  currentData: IOwner[]
  handleMouseEnter: (location: string) => void
}
