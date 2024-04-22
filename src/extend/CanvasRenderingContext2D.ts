/**
 * 对canvas 2d环境方法进行扩展
 */

CanvasRenderingContext2D.prototype.clear = function () {
  this.clearRect(0, 0, this.canvas.width, this.canvas.height)
}

CanvasRenderingContext2D.prototype.drawImageByDpr = function (
  ...args: Parameters<CanvasRenderingContext2D['drawImage']>
) {
  this.drawImage(...args)
}

CanvasRenderingContext2D.prototype.drawDashedRect = function (
  x: number,
  y: number,
  width: number,
  height: number,
  dashLength: number,
  cornerRadius = 0
) {
  // console.log(x, y, width, height, dashLength, cornerRadius)
  this.setLineDash([dashLength, dashLength])
  this.beginPath()
  this.moveTo(x + cornerRadius, y)
  this.lineTo(x + width - cornerRadius, y)
  this.arcTo(x + width, y, x + width, y + cornerRadius, cornerRadius)
  this.lineTo(x + width, y + height - cornerRadius)
  this.arcTo(
    x + width,
    y + height,
    x + width - cornerRadius,
    y + height,
    cornerRadius
  )
  this.lineTo(x + cornerRadius, y + height)
  this.arcTo(x, y + height, x, y + height - cornerRadius, cornerRadius)
  this.lineTo(x, y + cornerRadius)
  this.arcTo(x, y, x + cornerRadius, y, cornerRadius)
  this.closePath()
  this.stroke()
}
