import type { BaseComponent } from '../component/BaseComponent'
import { BaseEffect } from './BaseEffect'

/**
 * 加载效果
 */
export class LoadingEffect extends BaseEffect {
  protected componentDraw?: (context: CanvasRenderingContext2D) => any
  constructor(
    protected component: BaseComponent,
    protected message = 'Loading...'
  ) {
    super(component)
  }

  install(): void {
    this.componentDraw = this.component.draw
    this.component.readyPromise.then(() => {
      if (this.componentDraw) {
        this.removeSelf()
        this.component.draw = this.componentDraw
      }
    })

    this.component.draw = (context: CanvasRenderingContext2D) => {
      this.beforeUpdate(context)
      this.update(context)
      this.afterUpdate(context)
    }
  }

  update(context: CanvasRenderingContext2D): void {
    const text = this.message
    const fontSize = (14 * devicePixelRatio).toFixed(2)

    context.beginPath()
    context.font = `${fontSize}px system-ui`

    const measureText = context.measureText(text)
    context.fillStyle = 'grey'

    const dx = (this.component.parentRect.w - measureText.width) / 2
    const dy =
      (this.component.parentRect.h - measureText.fontBoundingBoxAscent) / 2
    context.fillText(text, dx, dy)
  }
}
