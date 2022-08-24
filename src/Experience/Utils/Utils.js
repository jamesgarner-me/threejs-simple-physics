const randomColorRgb = () => {
   return `rgb(
        ${(Math.random() * 255).toFixed()},
        ${(Math.random() * 255).toFixed()},
        ${(Math.random() * 255).toFixed()}
    )`
}

export { randomColorRgb }
