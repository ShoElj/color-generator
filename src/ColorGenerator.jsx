import React, { useState } from 'react';
import './ColorGenerator.css';

const ColorGenerator = () => {
  const [color, setColor] = useState('#f15025');
  const [shades, setShades] = useState([]);
  const [copiedColor, setCopiedColor] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const generateColors = () => {
    const baseColor = color;
    const generatedShades = [
      { percentage: '100%', hex: '#ffffff' },
      { percentage: '90%', hex: lightenDarkenColor(baseColor, 90) },
      { percentage: '80%', hex: lightenDarkenColor(baseColor, 80) },
      { percentage: '70%', hex: lightenDarkenColor(baseColor, 70) },
      { percentage: '60%', hex: lightenDarkenColor(baseColor, 60) },
      { percentage: '50%', hex: lightenDarkenColor(baseColor, 50) },
      { percentage: '40%', hex: lightenDarkenColor(baseColor, 40) },
      { percentage: '30%', hex: lightenDarkenColor(baseColor, 30) },
      { percentage: '20%', hex: lightenDarkenColor(baseColor, 20) },
      { percentage: '10%', hex: lightenDarkenColor(baseColor, 10) },
      { percentage: '0%', hex: baseColor },
      { percentage: '10%', hex: darkenColor(baseColor, 10) },
      { percentage: '20%', hex: darkenColor(baseColor, 20) },
      { percentage: '30%', hex: darkenColor(baseColor, 30) },
      { percentage: '40%', hex: darkenColor(baseColor, 40) },
      { percentage: '50%', hex: darkenColor(baseColor, 50) },
      { percentage: '60%', hex: darkenColor(baseColor, 60) },
      { percentage: '70%', hex: darkenColor(baseColor, 70) },
      { percentage: '80%', hex: darkenColor(baseColor, 80) },
      { percentage: '90%', hex: darkenColor(baseColor, 90) },
      { percentage: '100%', hex: '#000000' },
    ];
    setShades(generatedShades);
  };

  const lightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] === "#") {
      col = col.slice(1);
      usePound = true;
    }

    const num = parseInt(col, 16);
    let r = (num >> 16) + amt;
    let g = ((num >> 8) & 0x00FF) + amt;
    let b = (num & 0x0000FF) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    const newColor = (r << 16) | (g << 8) | b;
    return (usePound ? "#" : "") + newColor.toString(16).padStart(6, '0');
  };

  const darkenColor = (color, percent) => {
    return lightenDarkenColor(color, -percent);
  };

  const copyToClipboard = (hex) => {
    navigator.clipboard.writeText(hex).then(() => {
      setCopiedColor(hex);
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 2000);
    });
  };

  return (
    <div className="container">
      <h1>Color Generator</h1>
      <div className="input-group">
        <input
          type="text"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          placeholder="#f15025"
        />
        <button onClick={generateColors}>Submit</button>
      </div>
      {showConfirmation && <div className="confirmation">Copied {copiedColor} to clipboard!</div>}
      <div className="color-grid">
        {shades.map((shade, index) => (
          <div key={index} className="color-box" style={{ backgroundColor: shade.hex }} onClick={() => copyToClipboard(shade.hex)}>
            {shade.hex}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorGenerator;
