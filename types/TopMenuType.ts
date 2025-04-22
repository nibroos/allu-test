export type TopMenuPropType = {
  topMenu: TopMenuType[]
  parent_link?: string
}

export type TopMenuType = {
  number: string
  title: string
  icon?: string
  link: string
  parent_link?: string
  link2?: string
  link3?: string
  permissions: string[]
}
