import { useEffect } from 'react'

export function useMagnet(containerRef) {
  useEffect(() => {
    const container = containerRef?.current ?? document
    const els = container.querySelectorAll('.magnet')
    const handlers = []
    els.forEach(el => {
      const onMove = (ev) => {
        const r = el.getBoundingClientRect()
        const x = ev.clientX - r.left - r.width / 2
        const y = ev.clientY - r.top - r.height / 2
        el.style.transform = `translate(${x * 0.18}px, ${y * 0.28}px)`
      }
      const onLeave = () => { el.style.transform = 'translate(0,0)' }
      el.addEventListener('mousemove', onMove)
      el.addEventListener('mouseleave', onLeave)
      handlers.push({ el, onMove, onLeave })
    })
    return () => {
      handlers.forEach(({ el, onMove, onLeave }) => {
        el.removeEventListener('mousemove', onMove)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [containerRef])
}
