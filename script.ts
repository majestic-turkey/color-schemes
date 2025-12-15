// DOM Elements
const colorSchemes = document.getElementById('color-scheme')
const baseColorInput = document.getElementById('base-color')
const schemeTypeSelect = document.getElementById('scheme-type')
const generateButton = document.getElementById('generate-btn')


// Get colors based on seed color and scheme type
function fetchColors(base: string, scheme: string) {
    fetch(`https://www.thecolorapi.com/scheme?hex=${base}&mode=${scheme}&count=5`)
    .then(res => res.json())
    .then(data => {
        const colors = data.colors
        renderColors(colors)
    })
}

// Event Listeners
document.addEventListener('click', (e) => {
    const event = e.target as HTMLElement
    if (event.id === 'generate-btn' && baseColorInput && schemeTypeSelect) {
        e.preventDefault()
        const baseColor = (baseColorInput as HTMLInputElement).value.substring(1)
        const schemeType = (schemeTypeSelect as HTMLSelectElement).value
        fetchColors(baseColor, schemeType)
    } else  if (event.classList.contains('hex-value')) {
        navigator.clipboard.writeText(event.innerText.substring(1))
        const prevText = event.innerText
        event.innerText = 'Copied!'
        setTimeout(() => {
            event.innerText = prevText
        }, 1000)
    }
})

// Render colors to the DOM
function renderColors(colors: any[]) {
    if (!colorSchemes) return
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

