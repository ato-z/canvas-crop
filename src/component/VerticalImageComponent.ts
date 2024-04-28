import { BaseComponent } from './BaseComponent'

// 1度代表的数值
const degree = Math.PI / 180

/**
 * 绘制一张垂直居中的图像
 */
export class VerticalImageComponent extends BaseComponent {
  // 需要绘制的图像信息
  protected image
  protected width = 0
  protected height = 0

  // 图片加载状态, 如果为true表示图像加载结束
  protected loadState: boolean = false

  // 图像加载失败提示
  protected errMsg?: string

  // 图片当前的缩放状态
  protected scaleX = 1
  protected scaleY = 1

  constructor(
    protected canvas: HTMLCanvasElement,
    source?: string
  ) {
    super(canvas)

    const image = new Image()
    image.crossOrigin = 'anonymous'
    this.image = image
    this.bindImageEvent()

    source && this.switchImage(source)
  }

  /**
   * 绑定图像加载事件
   */
  private bindImageEvent() {
    const { image } = this

    // 图片加载结束
    image.onload = () => {
      this.loadState = true
      this.width = image.naturalWidth
      this.height = image.naturalHeight
      this.errMsg = undefined
      this.encodeRect()
      this.waitEnd()
    }

    image.onerror = (err) => {
      this.loadState = false
      if (typeof err === 'string') {
        this.errMsg = err
      } else {
        this.errMsg = '图像加载失败'
      }
    }
  }

  /**
   * 计算当前图片与显示画布等比例缩放
   */
  private encodeRect() {
    const { width, height, canvas } = this

    // 图像的宽高
    const sw = width
    const sh = height

    // 画布的宽高
    const dw = canvas.width
    const dh = canvas.height

    // 宽度百分百
    const byW = dw / sw // 以宽度为准
    const byH = dh / sh // 以高度为准

    // 初始状态值
    const state = { w: 0, h: 0, x: 0, y: 0, a: 0 }
    const parentRect = { w: dw, h: dh }

    /** 高度不超过, 以高度为准 */
    if (sh * byW < dh) {
      state.h = dh
      state.w = sw * byH
    } else {
      /** 宽度不超过, 以宽度为准 */
      state.w = dw
      state.h = sh * byW
    }

    state.x = (dw - state.w) / 2
    state.y = (dh - state.h) / 2

    this.view = state
    this.parentRect = parentRect

    this.scaleX = state.w / parentRect.w
    this.scaleY = state.h / parentRect.h
  }

  /**
   * 切换图像显示
   * @param source
   */
  switchImage(source: string) {
    if (this.image.src !== source) {
      this.loadState = false
      this.image.src = source
    }
  }

  /**
   * 自定义缩放画布到指定位置
   */
  private transformByRect(context: CanvasRenderingContext2D) {
    const { scaleX, scaleY, view, parentRect } = this

    // 旋转
    context.translate(parentRect.w / 2, parentRect.h / 2)
    context.rotate(degree * view.a)
    context.translate(-parentRect.w / 2, -parentRect.h / 2)
    // 平移缩放效果
    context.translate(view.x, view.y)
    context.scale(scaleX, scaleY)
  }

  /**
   * 绘制图像到画布
   */
  update(context: CanvasRenderingContext2D) {
    context.save()
    this.transformByRect(context)
    // 最基准的绘制不变
    context.drawImage(
      this.image,
      0,
      0,
      this.image.naturalWidth,
      this.image.naturalHeight,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    )
    context.restore()
  }
}
