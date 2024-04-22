/**
 * 一张红色图像， 使用脚本创建
    canvas.width = 5
    canvas.height = 1
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 1;

    ctx.moveTo(0, 0)
    ctx.lineTo(0, 3)
    ctx.stroke()
 */
const RED_SRC =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAABCAYAAADn9T9+AAAAAXNSR0IArs4c6QAAABRJREFUGFdj/M/A8J+RgYGRgQAAAE1KAgJsz3fXAAAAAElFTkSuQmCC'
export const RED_IMG = new Image()
RED_IMG.src = RED_SRC
