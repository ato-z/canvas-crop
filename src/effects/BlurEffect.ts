import type { BaseComponent } from '../component/BaseComponent'
import { BaseEffect } from './BaseEffect'

/**
 * 毛玻璃效果
 */
export class BlurEffect extends BaseEffect {
  // 毛玻璃效果
  protected startTime: number = Date.now()

  constructor(
    protected component: BaseComponent,
    protected option: { value: number; duration: number } = {
      // 模糊像素
      value: 15,
      // 动画持续时间
      duration: 1000,
    }
  ) {
    super(component)
  }

  install() {
    this.startTime = Date.now()
  }

  /** 在图片绘制前设置效果 */
  beforeUpdate(context: CanvasRenderingContext2D): void {
    const { startTime, option } = this
    const { duration, value } = option

    // 毛玻璃绘制
    const interval = Math.min(Date.now() - startTime, duration!)
    const filter =
      value! - (interval / duration!) * (interval / duration!) * value!

    if (filter !== 0) {
      context.filter = `blur(${filter}px)`
    } else {
      this.removeSelf()
    }
  }
}
