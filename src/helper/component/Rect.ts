/**
 * 创建矩阵信息
 */
export class Rect {
  // 当前视图信息
  view = {
    // 宽度
    w: 0,

    // 高度
    h: 0,

    // x轴偏移量
    x: 0,

    // y轴偏移量
    y: 0,

    // 旋转角度
    a: 0,
  }

  // 父级容器的宽高
  parentRect = {
    w: 0,
    h: 0,
  }
}
