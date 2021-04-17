const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem"
}

const Fonts = [
  {
    selector: ".logo a",
    minFontsize: 1.8,
    maxFontsize: 2.8,
    minLineheight: 2,
    maxLineheight: 3
  },

  {
    selector: "h1",
    minFontsize: 2,
    maxFontsize: 3,
    minLineheight: 2.6,
    maxLineheight: 3.6
  },

  {
    selector: "h2",
    minFontsize: 4.8,
    maxFontsize: 5.2,
    minLineheight: 5.68,
    maxLineheight: 5.28
  },

  {
    selector: "h3",
    minFontsize: 2,
    maxFontsize: 3,
    minLineheight: 2.6,
    maxLineheight: 3.6
  },

  {
    selector: "h4",
    minFontsize: 2,
    maxFontsize: 2.4,
    minLineheight: 2.6,
    maxLineheight: 3
  },

  {
    selector: "p",
    minFontsize: 1.4,
    maxFontsize: 1.6,
    minLineheight: 2.6,
    maxLineheight: 2.8
  }
]

const FontAdjust = {
  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value
    
    return value
  },

  scaler(min, max) {
    const screenWidth = Number(window.innerWidth)

    return FontAdjust.scale(screenWidth, Number(Options.minWidth), Number(Options.maxWidth), min, max)
  },

  createStyleEl() {
    const head = document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    head.appendChild(style)
  },

  adjustSize() {
    const style = document.getElementsByTagName('style')[0]

    style.innerHTML = "/* Style injected by FontAdjust ^^ */"

    Fonts.forEach((obj) => {
      const { selector, minFontsize, maxFontsize, minLineheight, maxLineheight } = obj

      const fontSize = FontAdjust.scaler(minFontsize, maxFontsize).toFixed(1)
      const lineHeight = FontAdjust.scaler(minLineheight, maxLineheight).toFixed(1)

      style.innerHTML += `
      ${selector} {
        font-size: ${String(fontSize + Options.measure)};
        line-height: ${String(lineHeight + Options.measure)};
      }
      `
    })
  },
}

FontAdjust.createStyleEl()
FontAdjust.adjustSize()
window.addEventListener('resize', FontAdjust.adjustSize)