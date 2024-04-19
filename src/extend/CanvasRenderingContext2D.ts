/**
 * 对canvas 2d环境方法进行扩展
 */

const c = document.createElement('canvas')
const ctx = c.getContext('2d')!

CanvasRenderingContext2D.prototype.clear = function () {
  this.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

CanvasRenderingContext2D.prototype.drawImageByDpr = function (
  ...args: Parameters<CanvasRenderingContext2D['drawImage']>
) {
  this.drawImage(...args)
}
