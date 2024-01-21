// 把驼峰转换成横杠连接
export const toLine = (value: string) => {
  return value.replace(/([A-Z])/g, "-$1").toLocaleLowerCase();
};

export const eventProxy = (e: any, query: string) => {
  let target = e.target;
  while (!target.matches(query)) {
    target = target.parentNode;
    if (e.currentTarget === target) return;
  }
  return target;
};
