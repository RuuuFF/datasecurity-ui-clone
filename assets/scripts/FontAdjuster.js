import { Fonts } from './Fonts.js'

const Font = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem",

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value
    
    return value
  },

  scaler(min, max) {
    const screenWidth = Number(window.innerWidth)

    return Font.scale(screenWidth, Font.minWidth, Font.maxWidth, min, max)
  },

  fontAdjust() {
    Fonts.forEach(obj => {
      const { el, minFontsize, maxFontsize, minLineheight, maxLineheight } = obj

      el.forEach(el => {
        el.style.fontSize = `${Font.scaler(minFontsize, maxFontsize) + Font.measure}`
        el.style.lineHeight = `${Font.scaler(minLineheight, maxLineheight) + Font.measure}`
      })
    })
  },
}

window.addEventListener('resize', Font.fontAdjust)
Font.fontAdjust()