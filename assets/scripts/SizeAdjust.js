const Options = {
  minWidth: 420,
  maxWidth: 1365,
  measure: "rem"
}

const CSSSelectors = [
  {
    selector: ".logo a",
    propAndValue: [
      { property: "font-size", min: 1.8, max: 2.8 },
      { property: "line-height", min: 2, max: 3 }
    ]
  },

  {
    selector: ".btn-container .btn",
    propAndValue: [
      { property: "font-size", min: 1.4, max: 1.6 },
      { property: "line-height", min: 2.3, max: 2.5 }
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
      { property: "line-height", min: 3.4, max: 5.8 }
    ]
  },

  {
    selector: "h2.bigger",
    propAndValue: [
      { property: "font-size", min: 3.2, max: 7.2 },
      { property: "line-height", min: 3.5, max: 7.9 }
    ]
  },

  {
    selector: "h3",
    propAndValue: [
      { property: "font-size", min: 2, max: 2.4 },
      { property: "line-height", min: 2.4, max: 2.8 }
    ]
  },

  {
    selector: "h3.bigger",
    propAndValue: [
      { property: "font-size", min: 3.2, max: 3.6 },
      { property: "line-height", min: 3.6, max: 4 }
    ]
  },

  {
    selector: "h3.low",
    propAndValue: [
      { property: "font-size", min: 3, max: 3.6 },
      { property: "line-height", min: 3.3, max: 3.9 }
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
      { property: "line-height", min: 2.4, max: 2.8 }
    ]
  },

  {
    selector: "p.bigger",
    propAndValue: [
      { property: "font-size", min: 1.6, max: 2 },
      { property: "line-height", min: 2.8, max:3.4 }
    ]
  },

  {
    selector: ".third-section section:last-child ol a",
    propAndValue: [
      { property: "font-size", min: 1.4, max: 1.6 },
      { property: "line-height", min: 2.6, max: 2.8 }
    ]
  },

  {
    selector: "footer ul li",
    propAndValue: [
      { property: "font-size", min: 1.2, max: 1.4 },
      { property: "line-height", min: 1.6, max: 1.8 }
    ]
  }
]

const SizeAdjust = {
  createStyleEl() {
    const styleEl = document.createElement('style')
    document.getElementsByTagName('head')[0].appendChild(styleEl)
    styleEl.insertAdjacentHTML("beforebegin", "<!-- Style injected by SizeAdjust (github.com/ruuuff) -->")
  },

  scale(num, in_min, in_max, out_min, out_max) {
    let value = (num - in_min) * (out_max - out_min) / (in_max - in_min) + out_min
    
    value <= out_min ? value = out_min : value
    value >= out_max ? value = out_max : value

    return value
  },

  callScaleWithParameters(min, max) {
    return SizeAdjust.scale(Number(document.documentElement.clientWidth), Number(Options.minWidth), Number(Options.maxWidth), Number(min), Number(max))
  },

  innerStyles() {
    const style = document.querySelector('head style:last-child')
    style.innerHTML = ""

    CSSSelectors.forEach(({ selector, propAndValue }) => {
      style.insertAdjacentHTML("beforeend", `${selector} {`)

      propAndValue.forEach(({ property, min, max }) => {
        const size = SizeAdjust.callScaleWithParameters(Number(min), Number(max)).toFixed(2)

        style.insertAdjacentHTML("beforeend", `  ${property}: ${size + Options.measure};`)
      })
      style.insertAdjacentHTML("beforeend", `}
      `)
    })
  },
}

SizeAdjust.createStyleEl()
SizeAdjust.innerStyles()
window.addEventListener('resize', SizeAdjust.innerStyles)