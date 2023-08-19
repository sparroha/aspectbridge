'use client'
import { useEffect, useRef, useState } from 'react';
//import { createCanvas } from 'canvas';

const Canvas = ({formula, cw, ch}) => {
  const canvasRef = useRef(formula);
  //const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        const result = formula(x, y, width, height);
        const color = result.valid ? (result.color?result.color:'#000000') : '#FFFFFF';
        context.fillStyle = color;
        context.fillRect(x, y, 1, 1);
      }
    }
  }, [formula]);

  return <canvas ref={canvasRef} width={cw || 1280} height={ch || 720} />;
};

export default Canvas;
