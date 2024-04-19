import './extend/CanvasRenderingContext2D'
import { CanvasConsole } from './helper/CanvasConsole'
import { MiddleImage } from './helper/component/MiddleImage'

import sourceSrc from './assets/w.png'
import sourceSrc2 from './assets/h.webp'

const canvasConsole = new CanvasConsole(800, 800)

const withImage = new MiddleImage(canvasConsole, sourceSrc2)

canvasConsole.push(withImage)
canvasConsole.appendTo(document.body)
