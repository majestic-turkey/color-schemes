# Color Scheme Generator - AI Coding Guidelines

## Project Overview
This is a simple vanilla JavaScript web application that generates color schemes using The Color API (thecolorapi.com). It allows users to select a base color, scheme type, and number of colors, then displays the generated colors with clickable hex values for copying.

## Architecture
- **index.html**: Main UI with color picker, scheme selector, color count input, and display grid
- **script.js**: Handles API calls, DOM manipulation, clipboard functionality, and dynamic grid sizing
- **styles.css**: Grid-based layout using CSS Grid for color display, with columns set dynamically

## Key Patterns
- **API Integration**: Fetch color schemes from `https://www.thecolorapi.com/scheme?hex=${base}&mode=${scheme}&count=${count}`
  - `hex`: Base color without # (e.g., "f55a5a")
  - `mode`: Scheme type (monochrome, analogic, complement, etc.)
  - `count`: Number of colors to generate (1-10)
  - Returns JSON with `colors` array containing hex values

- **Color Rendering**: Each color is a `.color-container` div with:
  - `.color` div styled with background-color (aria-hidden for screen readers)
  - `.hex-value` button for clickable hex text with proper aria-labels and focus styles

- **Event Handling**: Single document click listener handles both generate button and hex value copying
  - Generate: Extracts base color (removes #) and scheme type, calls fetchColors()
  - Copy: Uses navigator.clipboard.writeText(), shows "Copied!" feedback for 1 second

- **DOM Updates**: renderColors() builds HTML strings and sets innerHTML on #color-scheme container

## Code Style
- Vanilla JS with modern fetch API
- Event delegation for dynamic elements
- Inline styles for dynamic background colors
- Semantic HTML with proper ARIA labels and accessibility features
- Screen reader support with sr-only class and aria-live regions

## Common Tasks
- **Adding new scheme types**: Update HTML select options and ensure API mode parameter matches
- **Modifying color display**: Edit .color and .hex-value CSS classes in styles.css
- **API changes**: Update fetch URL and data parsing in fetchColors() function
- **Accessibility updates**: Add aria-labels, focus styles, and semantic HTML when adding new interactive elements

## Testing
Open index.html in a browser to test functionality. No automated tests exist.