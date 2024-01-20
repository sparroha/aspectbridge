'use client'
import { useEffect, useRef, useState } from 'react';

type Formula = (x: number, y: number, width: number, height: number) => {
  valid: boolean;
  color: string;
}

const Canvas = (props) => {
  const {formula, cw, ch} = props
  const canvasRef = useRef(formula);
  //const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current
    const context: CanvasRenderingContext2D = canvas?.getContext('2d');
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

export function Shape(){
  const f: Formula = (x: number, y: number, width: number, height: number) => {
    const center = {x: width/2, y: height/2};
    //distance from center = square root of (x-center.x)^2 + (y-center.y)^2
    const centerDistance = Math.sqrt((x - center.x) ** 2 + (y - center.y) ** 2);
    return {valid: Math.sin(centerDistance / 1) > 0, color: '#000000'}
};
  return <Canvas formula={f} cw={70} ch={60}/>
}