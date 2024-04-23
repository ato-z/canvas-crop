import './extend/CanvasRenderingContext2D'
import './indexDb'
import { CanvasConsole } from './helper/CanvasConsole'
import { MiddleImage } from './helper/component/MiddleImage'
import sourceSrc from './assets/w.png'
import { CutLine } from './helper/component/CutLine'

const canvasConsole = new CanvasConsole(400, 400)
const withImage = new MiddleImage(canvasConsole, sourceSrc)
const cutLine = new CutLine(
  canvasConsole,
  canvasConsole.rpx * 10,
  canvasConsole.rpx * 10
)

canvasConsole.push(withImage)
canvasConsole.push(cutLine)
canvasConsole.appendTo(document.querySelector('.main .win')!)

/** 演示操作 */
const btns = document.querySelectorAll('.btns button')!
const upLocalBtn = btns.item(0)
const retateBtn = btns.item(1)

async function getTheFile() {
  const pickerOpts = {
    types: [
      {
        description: 'Images',
        accept: {
          'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  }

  // 打开文件选择器并从结果中解构出第一个句柄
  const [fileHandle] = await window.showOpenFilePicker(pickerOpts)

  // 获取文件内容
  const fileData = await fileHandle.getFile()
}

// 上传图片
upLocalBtn.addEventListener('click', function () {
  /*const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/png, image/jpeg, image/jpg'
  input.capture = 'gallery'
  input.onchange = function () {
    const files = input.files!
    const [file] = files
    const url = URL.createObjectURL(file)
    withImage.switchImage(url)
  }
  input.click()*/
  getTheFile()
})

// 旋转
let animeIng = false
let r = 0
retateBtn.addEventListener('click', function () {
  if (animeIng) {
    return void 0
  }

  // 动画开始
  animeIng = true
  withImage
    .anime(600, (scale) => {
      withImage.setAgent(r + 90 * scale)
    })
    .then(() => {
      r += 90
      animeIng = false
    })
})
