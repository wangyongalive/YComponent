export interface TableOptions {
  // 表头
  label: string
  // 字段名称
  prop?: string
  // 对齐方式
  align: "left" | 'center' | 'right',
  // 自定义列模板的插槽名
  slot?: string
}