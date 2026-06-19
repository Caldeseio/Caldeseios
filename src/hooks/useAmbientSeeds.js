import { useEffect } from 'react'
import * as THREE from 'three'

export function useAmbientSeeds(canvasRef, bookRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false })
    } catch (e) {
      console.warn('WebGL unavailable', e)
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 300)
    camera.position.z = 60

    // Star sprite: sharp bright center + very soft halo (classic star diffraction look)
    function makeStarTex(size = 64) {
      const c = document.createElement('canvas')
      c.width = size; c.height = size
      const ctx = c.getContext('2d')
      const cx = size / 2, cy = size / 2, r = size / 2

      // Outer soft glow
      const outerGrd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
      outerGrd.addColorStop(0,    'rgba(255,255,255,0.9)')
      outerGrd.addColorStop(0.08, 'rgba(255,255,255,0.7)')
      outerGrd.addColorStop(0.25, 'rgba(255,255,255,0.15)')
      outerGrd.addColorStop(0.55, 'rgba(255,255,255,0.03)')
      outerGrd.addColorStop(1,    'rgba(255,255,255,0)')
      ctx.fillStyle = outerGrd
      ctx.fillRect(0, 0, size, size)
      return new THREE.CanvasTexture(c)
    }

    const starTex = makeStarTex(64)

    // ─── Tier 1: BRIGHT twinkling stars (35) ─────────────────────────────────
    const COUNT_BRIGHT = 35
    const posBright  = new Float32Array(COUNT_BRIGHT * 3)
    const colBright  = new Float32Array(COUNT_BRIGHT * 3)
    const twPhase    = new Float32Array(COUNT_BRIGHT)
    const twFreq     = new Float32Array(COUNT_BRIGHT)
    const baseColB   = new Float32Array(COUNT_BRIGHT * 3) // base RGB [0-1]

    for (let i = 0; i < COUNT_BRIGHT; i++) {
      posBright[i*3]   = (Math.random() - 0.5) * 110
      posBright[i*3+1] = (Math.random() - 0.5) * 80
      posBright[i*3+2] = (Math.random() - 0.5) * 80

      // Mix of cream-white and very soft green-tinted
      const isGreen = Math.random() < 0.25
      baseColB[i*3]   = isGreen ? 0.69  : 0.945  // R  #6FB877 vs #F1EDE3
      baseColB[i*3+1] = isGreen ? 0.722 : 0.929  // G
      baseColB[i*3+2] = isGreen ? 0.467 : 0.890  // B

      colBright[i*3]   = baseColB[i*3]
      colBright[i*3+1] = baseColB[i*3+1]
      colBright[i*3+2] = baseColB[i*3+2]

      twPhase[i] = Math.random() * Math.PI * 2
      twFreq[i]  = Math.random() * 0.5 + 0.2  // 0.2–0.7 Hz twinkle
    }

    const geoBright = new THREE.BufferGeometry()
    geoBright.setAttribute('position', new THREE.Float32BufferAttribute(posBright, 3))
    geoBright.setAttribute('color',    new THREE.Float32BufferAttribute(colBright, 3))
    const matBright = new THREE.PointsMaterial({
      size: 3.2,
      map: starTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(geoBright, matBright))

    // ─── Tier 2: MID stars — gentle slow drift (110) ─────────────────────────
    const COUNT_MID = 110
    const posMid  = new Float32Array(COUNT_MID * 3)
    const colMid  = new Float32Array(COUNT_MID * 3)
    const velMid  = new Float32Array(COUNT_MID * 2) // vx, vy per star
    const phMid   = new Float32Array(COUNT_MID)
    const frMid   = new Float32Array(COUNT_MID)

    for (let i = 0; i < COUNT_MID; i++) {
      posMid[i*3]   = (Math.random() - 0.5) * 120
      posMid[i*3+1] = (Math.random() - 0.5) * 90
      posMid[i*3+2] = (Math.random() - 0.5) * 60

      const bright = Math.random() * 0.35 + 0.45  // 0.45–0.80
      colMid[i*3]   = 0.945 * bright
      colMid[i*3+1] = 0.929 * bright
      colMid[i*3+2] = 0.890 * bright

      const angle = Math.random() * Math.PI * 2
      const speed = Math.random() * 0.004 + 0.001
      velMid[i*2]   = Math.cos(angle) * speed
      velMid[i*2+1] = Math.sin(angle) * speed

      phMid[i] = Math.random() * Math.PI * 2
      frMid[i] = Math.random() * 0.15 + 0.05
    }

    const geoMid = new THREE.BufferGeometry()
    geoMid.setAttribute('position', new THREE.Float32BufferAttribute(posMid, 3))
    geoMid.setAttribute('color',    new THREE.Float32BufferAttribute(colMid, 3))
    const matMid = new THREE.PointsMaterial({
      size: 1.8,
      map: starTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(geoMid, matMid))

    // ─── Tier 3: DIM background stars — static (180) ─────────────────────────
    const COUNT_DIM = 180
    const posDim = new Float32Array(COUNT_DIM * 3)
    const colDim = new Float32Array(COUNT_DIM * 3)

    for (let i = 0; i < COUNT_DIM; i++) {
      posDim[i*3]   = (Math.random() - 0.5) * 130
      posDim[i*3+1] = (Math.random() - 0.5) * 100
      posDim[i*3+2] = (Math.random() - 0.5) * 80

      const bright = Math.random() * 0.18 + 0.08  // very dim 0.08–0.26
      colDim[i*3]   = 0.945 * bright
      colDim[i*3+1] = 0.929 * bright
      colDim[i*3+2] = 0.890 * bright
    }

    const geoDim = new THREE.BufferGeometry()
    geoDim.setAttribute('position', new THREE.Float32BufferAttribute(posDim, 3))
    geoDim.setAttribute('color',    new THREE.Float32BufferAttribute(colDim, 3))
    const matDim = new THREE.PointsMaterial({
      size: 0.9,
      map: starTex,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })
    scene.add(new THREE.Points(geoDim, matDim))

    // ─── Mouse tracking (very subtle camera tilt) ─────────────────────────────
    const mouse = { tx: 0, ty: 0, cx: 0, cy: 0 }
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 0.06
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 0.04
    }
    window.addEventListener('mousemove', onMove)

    // ─── Resize ───────────────────────────────────────────────────────────────
    function resize() {
      const w = canvas.clientWidth, h = canvas.clientHeight
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }
    window.addEventListener('resize', resize)
    resize()

    // ─── Scroll → canvas opacity ──────────────────────────────────────────────
    const book = bookRef?.current
    const onScroll = () => {
      if (!book) return
      const ratio = book.scrollTop / window.innerHeight
      canvas.style.opacity = Math.max(0.15, 1 - ratio * 0.18)
    }
    if (book) book.addEventListener('scroll', onScroll, { passive: true })

    // ─── Animation loop ───────────────────────────────────────────────────────
    let t = 0
    let stop = false

    function animate() {
      if (stop) return
      t += 0.008

      // Bright stars: twinkle (animate vertex colors)
      const bc = geoBright.attributes.color.array
      for (let i = 0; i < COUNT_BRIGHT; i++) {
        const tw = 0.65 + 0.35 * Math.sin(t * twFreq[i] * Math.PI * 2 + twPhase[i])
        bc[i*3]   = baseColB[i*3]   * tw
        bc[i*3+1] = baseColB[i*3+1] * tw
        bc[i*3+2] = baseColB[i*3+2] * tw
      }
      geoBright.attributes.color.needsUpdate = true

      // Mid stars: very slow drift + gentle twinkle
      const mp = geoMid.attributes.position.array
      const mc = geoMid.attributes.color.array
      for (let i = 0; i < COUNT_MID; i++) {
        mp[i*3]   += velMid[i*2]
        mp[i*3+1] += velMid[i*2+1]

        // Soft wrap
        if (mp[i*3]   >  60) mp[i*3]   = -60
        if (mp[i*3]   < -60) mp[i*3]   =  60
        if (mp[i*3+1] >  45) mp[i*3+1] = -45
        if (mp[i*3+1] < -45) mp[i*3+1] =  45

        const tw = 0.75 + 0.25 * Math.sin(t * frMid[i] * Math.PI * 2 + phMid[i])
        const base = (0.45 + (i / COUNT_MID) * 0.35) * tw
        mc[i*3]   = 0.945 * base
        mc[i*3+1] = 0.929 * base
        mc[i*3+2] = 0.890 * base
      }
      geoMid.attributes.position.needsUpdate = true
      geoMid.attributes.color.needsUpdate = true

      // Subtle camera tilt on mouse (stars don't parallax much — they're far)
      mouse.cx += (mouse.tx - mouse.cx) * 0.025
      mouse.cy += (mouse.ty - mouse.cy) * 0.025
      camera.rotation.y = mouse.cx
      camera.rotation.x = -mouse.cy

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      stop = true
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', resize)
      if (book) book.removeEventListener('scroll', onScroll)
      geoBright.dispose(); matBright.dispose()
      geoMid.dispose(); matMid.dispose()
      geoDim.dispose(); matDim.dispose()
      starTex.dispose()
      renderer.dispose()
    }
  }, [canvasRef, bookRef])
}
