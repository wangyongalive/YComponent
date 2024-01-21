export interface City {
  id: number,
  // 拼音
  spell: string,
  // 名字
  name: string
}

export interface Provice {
  name: string,
  id?: string,
  data: string[]
}
