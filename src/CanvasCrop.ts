import type { BaseComponent } from './component/BaseComponent'

export class CanvasCrop {
  readonly components: Array<BaseComponent> = []

  canvas
  context
  protected width: number
  protected height: number

  constructor(width: number, height: number) {
    const canvas = document.createElement('canvas')
    canvas.width = width * devicePixelRatio
    canvas.height = height * devicePixelRatio

    this.width = canvas.width
    this.height = canvas.height

    const context = canvas.getContext('2d')!
    this.canvas = canvas
    this.context = context
  }

  /**
   * 安装组件
   * @param c
   */
  addComponents(c: BaseComponent) {
    this.components.push(c)
  }

  /**
   * 删除组件
   */
  removeComponents(c: BaseComponent) {
    const index = this.components.findIndex((i) => i === c)
    if (index > -1) {
      this.components.splice(index, 1)
    }
  }

  /**
   * 重绘画布
   */
  draw() {
    const { context } = this
    context.clear()

    this.components.forEach((c) => {
      try {
        context.beginPath()
        context.save()
        c.draw(context)
        context.restore()
      } catch (err) {
        console.error('重绘时发生异常', err)
      }
    })

    requestAnimationFrame(() => this.draw())
  }

  /**
   * 当所有组件准备完成时绘制一帧
   */
  async beAllSet() {
    const promises = this.components.map((c) => c.readyPromise)
    await Promise.all(promises)
  }

  /**
   * 插入到文档节点指定位置
   * @param el
   */
  appendTo(el: HTMLElement) {
    el.appendChild(this.canvas)
  }
}
