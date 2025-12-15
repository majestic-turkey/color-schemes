// DOM Elements
const colorSchemes = document.getElementById('color-scheme')
const baseColorInput = document.getElementById('base-color')
const schemeTypeSelect = document.getElementById('scheme-type')
const generateButton = document.getElementById('generate-btn')


// Get colors based on seed color and scheme type
function fetchColors(base, scheme) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${base}&mode=${scheme}&count=5`)
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
        fetchColors(baseColor, schemeType)
    } else  if (e.target.classList.contains('hex-value')) {
        navigator.clipboard.writeText(e.target.innerText.substring(1))
        const prevText = e.target.innerText
        e.target.innerText = 'Copied!'
        setTimeout(() => {
            e.target.innerText = prevText
        }, 1000)
    }
})

// Render colors to the DOM
function renderColors(colors) {
    colorSchemes.innerHTML = ''
    for (let color of colors) {
        const html = `
        <div class="color-container">
            <div class="color" style="background-color: ${color.hex.value}"></div>
        `
        const hexHtml = `
            <div class="hex-value">${color.hex.value}</div>
        </div>
        `
        colorSchemes.innerHTML = colorSchemes.innerHTML + html + hexHtml
    }
}

