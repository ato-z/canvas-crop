import './extend/CanvasRenderingContext2D'
import { CanvasCrop } from './CanvasCrop'
import { MatrixBorderComponent, VerticalImageComponent } from './component'
// import { MiddleImage } from './helper/component/MiddleImage'
import sourceSrc from './assets/w.png'
import { DragBehavior } from './behaviors'
import { BlurEffect, LoadingEffect } from './effects'
// import { CutLine } from './helper/component/CutLine'

const canvasCrop = new CanvasCrop(400, 400)
canvasCrop.draw()

const component1 = new VerticalImageComponent(canvasCrop.canvas, sourceSrc)
const component2 = new MatrixBorderComponent(canvasCrop.canvas, 20)

// 添加拖拽行为
component1.addBehavior(DragBehavior)

// 添加等待效果
component1.addEffect(new LoadingEffect(component1, '努力加载中...'))

canvasCrop.addComponents(component1)
canvasCrop.addComponents(component2)
canvasCrop.appendTo(document.querySelector('.main .win')!)

// 准备就绪时绘制
canvasCrop.beAllSet().then((res) => {
  console.log(res, 'res')
  // 添加毛玻璃效果
  component1.addEffect(
    new BlurEffect(component1, { value: 10, duration: 1000 })
  )
})

/** 演示操作 */
const btns = document.querySelectorAll('.btns button')!
const upLocalBtn = btns.item(0)
const retateBtn = btns.item(1)
