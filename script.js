// DOM Elements
const colorSchemes = document.getElementById('color-scheme')
const baseColorInput = document.getElementById('base-color')
const schemeTypeSelect = document.getElementById('scheme-type')
const colorCountInput = document.getElementById('color-count')
const generateButton = document.getElementById('generate-btn')


// Get colors based on seed color and scheme type
function fetchColors(base, scheme, count) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${base}&mode=${scheme}&count=${count}`)
    .then(res => res.json())
    .then(data => {
        const colors = data.colors
        renderColors(colors)
    })
}

// Event Listeners
generateButton.addEventListener('click', (e) => {

})

document.addEventListener('click', (e) => {
    if (e.target.id === 'generate-btn') {
        e.preventDefault()
        const baseColor = baseColorInput.value.substring(1)
        const schemeType = schemeTypeSelect.value
        const count = colorCountInput.value
        fetchColors(baseColor, schemeType, count)
    } else  if (e.target.classList.contains('hex-value')) {
        const hexValue = e.target.dataset.hex
        navigator.clipboard.writeText(hexValue)
        const prevText = e.target.innerText
        e.target.innerText = 'Copied!'
        setTimeout(() => {
            e.target.innerText = prevText
        }, 1000)
    }
})

// Render colors to the DOM
function renderColors(colors) {
    colorSchemes.style.gridTemplateColumns = `repeat(${colors.length}, 1fr)`
    colorSchemes.innerHTML = ''
    for (let color of colors) {
        const html = `
        <div class="color-container">
            <div class="color" style="background-color: ${color.hex.value}" aria-hidden="true"></div>
        `
        const hexHtml = `
            <button class="hex-value" data-hex="${color.hex.value}" aria-label="Copy hex color ${color.hex.value} to clipboard">${color.hex.value}</button>
        </div>
        `
        colorSchemes.innerHTML = colorSchemes.innerHTML + html + hexHtml
    }
}

