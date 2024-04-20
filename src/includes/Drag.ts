import { Base } from './Base'

/**
 * 实现组件的拖动行为
 */
export class Drag extends Base {
  constructor(
    protected el: HTMLCanvasElement,
    protected rect: RECT
  ) {
    super(el)
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
      this.rect.offset(offset.x, offset.y)
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
      e.preventDefault()
      const point = this.getPointByTouch(e)
      const offset = this.pointToCanvas({
        x: point.x - prevPoint.x,
        y: point.y - prevPoint.y,
      })
      this.rect.offset(offset.x, offset.y)
      prevPoint = point
    })
  }
}
