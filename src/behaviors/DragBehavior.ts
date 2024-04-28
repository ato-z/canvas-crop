import type { BaseComponent } from '../component/BaseComponent'
import { BaseBehavior } from './BaseBehavior'

/**
 * 拖拽行为
 */
export class DragBehavior extends BaseBehavior {
  constructor(
    protected el: HTMLCanvasElement,
    protected component: BaseComponent
  ) {
    super(el, component)
    this.listenerMouseEvent()
    this.listenerTouchEvent()
  }

  /**
   * 点击拖动鼠标进行拖拽
   */
  private listenerMouseEvent() {
    const { el } = this
    let state = false
    let prevPoint = { x: 0, y: 0 }
    el.addEventListener('mousedown', (e) => {
      e.preventDefault()
      state = true
      prevPoint = this.getPointByMouse(e)
    })
    el.addEventListener('mousemove', (e) => {
      if (!state) return void 0
      e.preventDefault()

      const point = this.getPointByMouse(e)
      const offset = this.pointToCanvas({
        x: point.x - prevPoint.x,
        y: point.y - prevPoint.y,
      })
      this.component.offset(offset.x, offset.y)
      prevPoint = point
    })

    el.addEventListener('mouseout', () => (state = false))
    el.addEventListener('mouseup', () => (state = false))
    el.addEventListener('mouseleave', () => (state = false))
  }

  /**
   * 手指拖拽
   */
  private listenerTouchEvent() {
    const { el } = this
    let prevPoint = { x: 0, y: 0 }
    el.addEventListener('touchstart', (e) => {
      e.preventDefault()
      prevPoint = this.getPointByTouch(e)
    })
    el.addEventListener('touchmove', (e) => {
      // 如果有多个手指则取消拖动行为
      if (e.touches.length !== 1) return void 0

      e.preventDefault()
      const point = this.getPointByTouch(e)
      const offset = this.pointToCanvas({
        x: point.x - prevPoint.x,
        y: point.y - prevPoint.y,
      })
      this.component.offset(offset.x, offset.y)
      prevPoint = point
    })
  }
}
