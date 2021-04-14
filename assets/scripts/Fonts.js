const Fonts = [
  {
    el: document.querySelectorAll(".logo h1"),
    minFontsize: 1.8,
    maxFontsize: 2.8,
    minLineheight: 2,
    maxLineheight: 3
  },

  {
    el: document.querySelectorAll("h3"),
    minFontsize: 2,
    maxFontsize: 3,
    minLineheight: 2.6,
    maxLineheight: 3.6
  },

  {
    el: document.querySelectorAll("h4"),
    minFontsize: 2,
    maxFontsize: 2.4,
    minLineheight: 2.6,
    maxLineheight: 3
  },

  {
    el: document.querySelectorAll("p"),
    minFontsize: 1.4,
    maxFontsize: 1.6,
    minLineheight: 2.6,
    maxLineheight: 2.8
  }
]

export { Fonts }