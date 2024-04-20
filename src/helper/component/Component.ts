export class Component {
  /**
   * 加速度动画曲线
   * @param duration 动画持续时间
   * @param callback 动画生命周期的回调
   */
  anime(duration: number, callback: (scale: number, interval: number) => void) {
    return new Promise((r) => {
      // 动画开始
      const start = Date.now()
      // 动画进行时
      const runtime = () => {
        const current = Date.now()
        const interval = (current - start) / duration
        const scale = Math.min(1, interval * interval)

        callback(scale, interval)
        if (scale === 1) {
          r(void 0)
        } else {
          requestAnimationFrame(runtime)
        }
      }

      // 下一帧准备好动画开始
      requestAnimationFrame(runtime)
    })
  }
}
