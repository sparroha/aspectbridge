import { useEffect, useRef } from 'react';
import { createCanvas } from 'canvas';

const Canvas = ({ formula }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const result = formula(x, y);
        const color = result ? '#000000' : '#FFFFFF';
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
      }
    }
  }, [formula]);

  return <canvas ref={canvasRef} width={800} height={600} />;
};

export default Canvas;