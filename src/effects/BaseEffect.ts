import type { BaseComponent } from '../component/BaseComponent'

/**
 * 组件效果实现
 */
export class BaseEffect {
  constructor(protected component: BaseComponent) {}

  /**
   * 安装动作
   */
  install() {}

  /**
   * 更新前
   */
  beforeUpdate(context: CanvasRenderingContext2D) {}

  /**
   * 更新中
   */
  update(context: CanvasRenderingContext2D) {}

  /**
   * 更新后
   */
  afterUpdate(context: CanvasRenderingContext2D) {}

  /**
   * 删除自身
   */
  removeSelf() {
    this.component.removeEffect(this)
  }
}
