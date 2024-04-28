import { Rect } from './Rect'

const tryCall = <F extends () => unknown>(fn: F) => {
  try {
    fn()
  } catch (e) {
    console.error(e)
  }
}

/**
 * 基础canvas绘图组件
 */
export class BaseComponent extends Rect {
  // 排序, 用于渲染顺序, 数字越大, 越后渲染
  order = 0

  // 一些额外行为, 如拖拽, 缩放等
  readonly behaviors: Array<BEHAVIOR> = []

  // 效果
  readonly effects: Array<any> = []

  // 组件的渲染状态
  public readyPromise!: Promise<void>

  // 准备状态, 如果为false, 则不进行渲染
  protected readyState: boolean = false

  // 设置等待状态
  protected setWait() {
    this.readyState = false
    this.waitEnd = () => {
      this.readyPromise = new Promise((resolve) => {
        this.readyState = true
        resolve()
      })
      this.waitEnd = () => {}
    }
  }

  // 等待结束
  protected waitEnd(): void
  protected waitEnd() {}

  constructor(protected canvas: HTMLCanvasElement) {
    super(canvas)
    this.setWait()
  }

  /**
   * 更新排序
   * @param order
   */
  setOrder(order: number) {
    this.order = order
  }

  /**
   * 添加额外用户行为
   * @param B 构造函数
   */
  addBehavior(B: BEHAVIOR) {
    // 不允许重复添加
    if (this.behaviors.find((b) => b === B || b instanceof B)) return void 0

    const b = new B(this.canvas, this)
    b.install()
    this.behaviors.push(b)
  }

  /**
   * 删除额外用户行为
   * @param B 实例或者构造函数
   */
  removeBehavior(B: BEHAVIOR) {
    const findIndex = this.behaviors.findIndex((b) => b === B || b instanceof B)
    if (findIndex !== -1) {
      const b = this.behaviors[findIndex]
      b.uninstall()
      this.behaviors.splice(findIndex, 1)
    }
  }

  /**
   * 添加效果，如毛玻璃, 模糊, 阴影等
   * @param Effect
   */
  addEffect(Effect: EFFECT) {
    const e = new Effect(this)
    this.effects.push(e)
  }

  /**
   * 删除效果
   * @param Effect 实例或者构造函数
   */
  removeEffect(Effect: EFFECT) {
    const findIndex = this.effects.findIndex(
      (e) => e === Effect || e instanceof Effect
    )
    if (findIndex !== -1) {
      this.effects.splice(findIndex, 1)
    }
  }

  /**
   * 更新前触发
   */
  beforeUpdate(context: CanvasRenderingContext2D) {}

  /**
   * 更新
   */
  update(context: CanvasRenderingContext2D) {}

  /**
   * 更新后触发
   */
  afterUpdate(context: CanvasRenderingContext2D) {}

  /**
   * 绘制一帧
   */
  draw(context: CanvasRenderingContext2D) {
    context.beginPath()
    context.save()

    tryCall(() => this.beforeUpdate(context))
    this.effects.forEach((e) => {
      tryCall(() => e.beforeUpdate(context))
    })

    tryCall(() => this.update(context))
    this.effects.forEach((e) => {
      tryCall(() => e.update(context))
    })

    tryCall(() => this.afterUpdate(context))
    this.effects.forEach((e) => {
      tryCall(() => e.afterUpdate(context))
    })

    context.restore()
  }
}
