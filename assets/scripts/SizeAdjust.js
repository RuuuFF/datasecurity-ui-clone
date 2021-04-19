const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem"
}

CSSSelectors = [
  {
    selector: ".logo a",
    propAndValue: [
      { property: "font-size", min: 1.8, max: 2.8 },
      { property: "line-height", min: 2, max: 3 }
    ]
  },

  {
    selector: "h1",
    propAndValue: [
      { property: "font-size", min: 2, max: 3 },
      { property: "line-height", min: 2.6, max: 3.6 }
    ]
  },

  {
    selector: "h2",
    propAndValue: [
      { property: "font-size", min: 2.8, max: 5.2 },
      { property: "line-height", min: 5.6, max: 5.2 }
    ]
  },

  {
    selector: "h2.bigger",
    propAndValue: [
      { property: "font-size", min: 7.2, max: 7.2 },
      { property: "line-height", min: 7.9, max: 7.9 }
    ]
  },

  {
    selector: "h3",
    propAndValue: [
      { property: "font-size", min: 2.4, max: 2.4 },
      { property: "line-height", min: 2.8, max: 2.8 }
    ]
  },

  {
    selector: "h3.bigger",
    propAndValue: [
      { property: "font-size", min: 4, max: 4 },
      { property: "line-height", min: 4.8, max: 4.8 }
    ]
  },

  {
    selector: "h3.low",
    propAndValue: [
      { property: "font-size", min: 3.6, max: 3.6 },
      { property: "line-height", min: 3.9, max: 3.9 }
    ]
  },

  {
    selector: "h4",
    propAndValue: [
      { property: "font-size", min: 2, max: 2.4 },
      { property: "line-height", min: 2.6, max: 3 }
    ]
  },

  {
    selector: "p, input, textarea",
    propAndValue: [
      { property: "font-size", min: 1.4, max: 1.6 },
      { property: "line-height", min: 2.6, max: 2.8 }
    ]
  },

  {
    selector: "p.bigger",
    propAndValue: [
      { property: "font-size", min: 2, max: 2 },
      { property: "line-height", min: 3.6, max:3.6 }
    ]
  },

  {
    selector: ".first-section .image-container::after",
    propAndValue: [
      { property: "width", min: 7.4, max: 20.4 },
      { property: "height", min: 7.4, max: 20.4 },
      { property: "top", min: 2, max: 5 }
    ]
  },
  
  {
    selector: ".third-section section:first-child .image-container",
    propAndValue: [
      { property: "width", min: 32, max: 73 },
      { property: "height", min: 23, max: 41 }
    ]
  },

  {
    selector: ".third-section section:last-child ol a",
    propAndValue: [
      { property: "font-size", min: 1.4, max: 1.6 },
      { property: "line-height", min: 2.6, max: 2.8 }
    ]
  }
]

const SizeAdjust = {
  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value
    
    return value
  },

  scaler(min, max) {
    const screenWidth = Number(window.innerWidth)

    return SizeAdjust.scale(screenWidth, Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  createStyleEl() {
    const head = document.getElementsByTagName('head')[0]
    const style = document.createElement('style')
    head.appendChild(style)
    style.insertAdjacentHTML("beforebegin", "<!-- Style injected by SizeAdjust (github.com/ruuuff) -->")
  },

  sizeAdjust() {
    const style = document.getElementsByTagName('style')[0]

    style.innerHTML = ""

    CSSSelectors.forEach(obj => {
      const { selector, propAndValue } = obj

      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(prop => {
        const { property, min, max } = prop

        const getSize = SizeAdjust.scaler(min, max).toFixed(1)

        style.insertAdjacentHTML("beforeend", `  ${property}: ${String(getSize + Options.measure)};`)
      })
      style.insertAdjacentHTML("beforeend", `}
      `)
    })
  },
}

SizeAdjust.createStyleEl()
SizeAdjust.sizeAdjust()
window.addEventListener('resize', SizeAdjust.sizeAdjust)