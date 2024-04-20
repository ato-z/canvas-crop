import { Drag } from '../../includes/Drag'
import { Rect } from './Rect'

/**
 * 在canvas画布中绘制垂直居中的图像
 */
export class MiddleImage extends Rect implements CANVAS_COMPONENT {
  includes = [new Drag(this.canvasConsole.canvas, this)]

  // 需要绘制的图像信息
  protected image = new Image()
  protected width = 0
  protected height = 0

  // 加载状态，如果为true表示加载结束
  protected loadState: boolean = false

  // 图像加载失败提示
  protected errMsg?: string

  // 图片当前的缩放状态
  protected scaleX = 1
  protected scaleY = 1

  // 毛玻璃效果
  protected blur = {
    value: 15, // 模糊像素
    duration: 1000, // 动画持续时间

    /** 程序自动计算得出 */
    start: 0,
  }

  constructor(
    protected canvasConsole: CANVAS_CONSOLE,
    source?: string
  ) {
    super()
    this.bindImageEvent()
    if (source) {
      this.switchImage(source)
    }
  }

  /**
   * 绑定图像事件
   */
  private bindImageEvent() {
    const { image } = this

    // 图片加载结束
    image.onload = () => {
      this.loadState = true
      this.width = image.naturalWidth
      this.height = image.naturalHeight
      this.errMsg = undefined
      this.blur.start = Date.now()
      this.encodeRect()
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
    const { width, height, canvasConsole } = this
    const { canvas } = canvasConsole

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
   * 当图像未加载完毕时绘制
   */
  private drawByWait() {
    const { canvasConsole, image, errMsg } = this
    if (!image.src) {
      return void 0
    }

    const { context, canvas } = canvasConsole
    const text = errMsg ?? '图像加载中...'
    const fontSize = (14 * canvasConsole.rpx).toFixed(2)

    context.beginPath()
    context.font = `${fontSize}px system-ui`

    const measureText = context.measureText(text)
    context.fillStyle = 'grey'

    const dx = (canvas.width - measureText.width) / 2
    const dy = (canvas.height - measureText.fontBoundingBoxAscent) / 2
    context.fillText(text, dx, dy)
  }

  /**
   * 当图像加载成功时绘制
   */
  private drawImage() {
    const { canvasConsole } = this
    const { context, canvas } = canvasConsole

    context.save()
    this.transformByRect()
    // 最基准的绘制不变
    context.drawImage(
      this.image,
      0,
      0,
      this.image.naturalWidth,
      this.image.naturalHeight,
      0,
      0,
      canvas.width,
      canvas.height
    )
    context.restore()
  }

  /**
   * 缩放平移画布到指定位置
   */
  private transformByRect() {
    const { scaleX, scaleY, view, blur, canvasConsole } = this

    const { context } = canvasConsole

    // 毛玻璃绘制
    const interval = Math.min(Date.now() - blur.start, blur.duration)
    const filter =
      blur.value -
      (interval / blur.duration) * (interval / blur.duration) * blur.value

    if (filter !== 0) {
      context.filter = `blur(${filter}px)`
    }

    // 平移缩放效果
    context.translate(view.x, view.y)
    context.scale(scaleX, scaleY)
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
   * 绘制句柄
   */
  handle(): void {
    if (this.loadState) {
      this.drawImage()
    } else {
      this.drawByWait()
    }
  }
}
