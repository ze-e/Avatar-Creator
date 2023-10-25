
export function drawLine (from, to, line, scrollX) {
  if (!from || !to || !line) return
  const fT = from.offsetTop + from.offsetHeight / 2
  const tT = to.offsetTop + to.offsetHeight / 2
  const fL = from.offsetLeft + from.offsetWidth / 2 - scrollX
  const tL = to.offsetLeft + to.offsetWidth / 2 - scrollX

  const CA = Math.abs(tT - fT)
  const CO = Math.abs(tL - fL)
  const H = Math.sqrt(CA * CA + CO * CO)
  let ANG = (180 / Math.PI) * Math.acos(CA / H)
  let top
  let left

  if (tT > fT) {
    top = (tT - fT) / 2 + fT
  } else {
    top = (fT - tT) / 2 + tT
  }
  if (tL > fL) {
    left = (tL - fL) / 2 + fL
  } else {
    left = (fL - tL) / 2 + tL
  }

  if (
    (fT < tT && fL < tL) ||
    (tT < fT && tL < fL) ||
    (fT > tT && fL > tL) ||
    (tT > fT && tL > fL)
  ) {
    ANG *= -1
  }
  top -= H / 2

  line.style['-webkit-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-moz-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-ms-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-o-transform'] = 'rotate(' + ANG + 'deg)'
  line.style['-transform'] = 'rotate(' + ANG + 'deg)'
  line.style.top = top - '45' + 'px'
  line.style.left = left + 'px'
  line.style.height = H + 'px'
}

export function drawAvatarBody ({ body, head, hand, foot, gear }) {
  if (gear !== null) {
    Object.keys(gear).forEach((k) => gear[k] == null && delete gear[k])
  }

  // load
  const bodyImg = new Image()
  bodyImg.src = body.src

  const headImg = new Image()
  headImg.src = head.src

  const handImg = new Image()
  handImg.src = hand.src

  const footImg = new Image()
  footImg.src = foot.src

  // build
  bodyImg.onload = () => {
    buildImage()
  }

  headImg.onload = () => {
    buildImage()
  }

  handImg.onload = () => {
    buildImage()
  }

  footImg.onload = () => {
    buildImage()
  }

  const gearImg = []

  if (gear !== null) {
    gear.forEach((item) => {
      const itemImg = new Image()
      itemImg.src = item.src
      gearImg.push(itemImg)
      itemImg.onload = () => {
        buildImage()
      }
    })
  }

  function buildImage () {
    const canvas = document.getElementById('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 400
    canvas.height = 400

    ctx.drawImage(bodyImg, 0, 0, 400, 400)
    ctx.drawImage(headImg, 0, 0, 400, 400)
    ctx.drawImage(handImg, 0, 0, 400, 400)
    ctx.drawImage(footImg, 0, 0, 400, 400)
    if (gear !== null) {
      gearImg.forEach((img) => {
        ctx.drawImage(img, 0, 0, 400, 400)
      })
    }
  }
}

export function drawAvatarFull ({ canvas, avatar, gear, title, subtitle, level }) {
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  canvas.width = 400
  canvas.height = 400

  if (gear !== null) {
    Object.keys(gear).forEach((k) => gear[k] == null && delete gear[k])
  }

  // show loading screen
  const loading = showLoading(canvas, ctx)

  // load
  const avatarImg = new Image()
  avatarImg.src = avatar.src

  avatarImg.onload = () => {
    buildImage(canvas, ctx)
  }

  const gearImg = []

  if (gear !== null) {
    gear.forEach((item) => {
      const itemImg = new Image()
      itemImg.src = item.src
      gearImg.push(itemImg)
      itemImg.onload = () => {
        buildImage(canvas, ctx)
      }
    })
    // remove loading screen
    removeLoading(ctx, loading)
  }

  function showLoading (canvas, ctx) {
    // Create the loading element
    const loading = {
      x: canvas.width / 2 - 100, // Rectangle x-coordinate
      y: canvas.height / 2 - 50, // Rectangle y-coordinate
      width: 200,
      height: 100,
      text: 'Loading'
    }

    // Draw the rectangle
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(loading.x, loading.y, loading.width, loading.height)

    // Draw the text
    ctx.font = '24px Arial'
    ctx.fillStyle = '#000000'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(loading.text, canvas.width / 2, canvas.height / 2)

    return loading // Return the loading element
  }

  function removeLoading (ctx, loading) {
    // Clear only the area occupied by the loading element
    ctx.clearRect(loading.x, loading.y, loading.width, loading.height)
  }

  function buildImage (canvas, ctx) {
    // draw bg
    buildBG(canvas, ctx)

    // draw image
    ctx.drawImage(avatarImg, 0, 0, 400, 400)
    if (gear !== null) {
      gearImg.forEach((img) => {
        ctx.drawImage(img, 0, 0, 400, 400)
      })
    }

    // draw text
    buildBubble(canvas, ctx)
    buildText(canvas, ctx)
  }

  function buildBG (canvas, ctx) {
    ctx.fillStyle = 'white'
    ctx.fillRect(2, 2, canvas.width - 4, canvas.height - 4)

    // Set the stroke color to black and line width to 2px
    ctx.strokeStyle = 'black'
    ctx.lineWidth = 2

    // Draw a rounded rectangle border around the canvas
    const cornerRadius = 10
    ctx.beginPath()
    ctx.moveTo(cornerRadius, 0)
    ctx.lineTo(canvas.width - cornerRadius, 0)
    ctx.arcTo(canvas.width, 0, canvas.width, cornerRadius, cornerRadius)
    ctx.lineTo(canvas.width, canvas.height - cornerRadius)
    ctx.arcTo(canvas.width, canvas.height, canvas.width - cornerRadius, canvas.height, cornerRadius)
    ctx.lineTo(cornerRadius, canvas.height)
    ctx.arcTo(0, canvas.height, 0, canvas.height - cornerRadius, cornerRadius)
    ctx.lineTo(0, cornerRadius)
    ctx.arcTo(0, 0, cornerRadius, 0, cornerRadius)
    ctx.closePath()
    ctx.stroke()
  }

  function buildText (canvas, ctx) {
    // char info
    ctx.fillStyle = 'black'
    ctx.font = 'bold 20px sans-serif'
    ctx.font = 'bold 20px Monda'
    ctx.textAlign = 'center'
    ctx.fillText(title, canvas.width / 2, canvas.height - 42)

    ctx.font = 'normal 20px sans-serif'
    ctx.font = 'normal 20px Monda'
    ctx.textAlign = 'center'
    ctx.fillText(subtitle, canvas.width / 2, canvas.height - 22)

    // level
    ctx.fillStyle = 'black'
    ctx.font = 'bold 46px sans-serif'
    ctx.font = 'bold 46px Monda'
    ctx.textAlign = 'left'
    ctx.fillText(level, 20, 50)
  }
}

function buildBubble (canvas, ctx) {
  ctx.globalAlpha = 0.8
  // Draw the grey rectangle with rounded corners and a black border
  ctx.fillStyle = '#d3d3d3'
  ctx.strokeStyle = 'black'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(10, canvas.height - 16)
  ctx.lineTo(10, canvas.height - 50)
  ctx.quadraticCurveTo(10, canvas.height - 60, 20, canvas.height - 60)
  ctx.lineTo(380, canvas.height - 60)
  ctx.quadraticCurveTo(390, canvas.height - 60, 390, canvas.height - 50)
  ctx.lineTo(390, canvas.height - 16)
  ctx.quadraticCurveTo(390, canvas.height - 10, 380, canvas.height - 10)
  ctx.lineTo(20, canvas.height - 10)
  ctx.quadraticCurveTo(10, canvas.height - 10, 10, canvas.height - 16)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()
  ctx.globalAlpha = 1.0
}

export function drawHex ({
  svg,
  color,
  borderColor,
  borderWidth,
  bgImage,
  dropShadow,
  innerShadow,
  glow,
  teacherview
}) {
  if (svg) {
    svg.innerHTML = ''
    svg.innerHTML += `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="-50 -50 900 900" width="150%" height="150%" style="transform: translate(-12%, -20%);">
  ${
    !!bgImage &&
    `<defs>
      <pattern id="${bgImage}" patternUnits="userSpaceOnUse" width="75%" height="75%">
        <image href="${bgImage}" x="0" y="0" width="75%" height="75%" />
      </pattern>
  </defs>`
  }
  <filter id="dropShadow">
    <feDropShadow dx="10" dy="10" stdDeviation="16" flood-color="#808080" flood-opacity="0.8" />
  </filter>

  <filter id="innerShadow">
    <feComponentTransfer in=SourceAlpha>
      <feFuncA type="table" tableValues="1 0" />
    </feComponentTransfer>
    <feGaussianBlur stdDeviation="4"/>
    <feOffset dx="0" dy="5" result="offsetblur"/>
    <feFlood flood-color="rgb(0, 0, 0)" result="color"/>
    <feComposite in2="offsetblur" operator="in"/>
    <feComposite in2="SourceAlpha" operator="in" />
    <feMerge>
      <feMergeNode in="SourceGraphic" />
      <feMergeNode />
    </feMerge>
  </filter>

  <filter id="glow">
    <feDropShadow dx="10" dy="10" stdDeviation="32" flood-color="#fff" />
  </filter>

  ${!teacherview && !!dropShadow && '<g filter="url(#dropShadow)">'}

  ${!teacherview && !!innerShadow && '<g filter="url(#innerShadow)">'}

  ${!teacherview && !!glow && '<g filter="url(#glow)">'}
    <polygon points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" fill="none" stroke="${borderColor}" stroke-width="${borderWidth}" />
  ${!teacherview && !!innerShadow && '<g filter="url(#innerShadow)">'}
    
    <polygon points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" fill="${color}" stroke="none" style="inset 39px 5px 15px 5px rgba(0,0,0,0.5)" />           
  ${!teacherview && !!innerShadow && '</g>'}
  
  ${!!bgImage && `${`<polygon points="723,314 543,625.769145 183,625.769145 3,314 183,2.230855 543,2.230855 723,314" fill="url(#${bgImage})" opacity="0.75"/>`}`}          
  ${!teacherview && !!glow && '</g>'}
  ${!teacherview && !!innerShadow && '</g>'}

  ${!teacherview && !!dropShadow && '</g>'}
</svg>`
  }
}
