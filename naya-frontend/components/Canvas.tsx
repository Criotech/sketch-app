import React, { useCallback, useEffect, useRef, useState } from 'react';
import io, { Socket } from 'socket.io-client';

interface CanvasProps {
  width: number;
  height: number;
  canvasImageData: string;
  color: string;
  saveSketchFile: (canvasImageData: string) => Promise<void>;
  isLoading: boolean;
  fileId: string;
}

type Coordinate = {
  x: number;
  y: number;
};

const Canvas = ({
  width,
  height,
  canvasImageData,
  color,
  saveSketchFile,
  isLoading,
  fileId,
}: CanvasProps) => {
  let socket: Socket = io('http://localhost:5200');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPainting, setIsPainting] = useState(false);
  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(
    undefined
  );

  const copyLiveLinkTOClipboard = async () => {
    await navigator.clipboard.writeText(
      `http://localhost:3000/sketch/${fileId}`
    );
    alert('Link copied to clipboard');
  };

  const startPaint = useCallback((event: MouseEvent) => {
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setMousePosition(coordinates);
      setIsPainting(true);
    }
  }, []);

  useEffect(() => {
    socket.emit('create', fileId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    var context = canvas.getContext('2d')!;

    var myImage = new Image();
    myImage.src = canvasImageData;
    myImage.onload = function () {
      context.drawImage(myImage, 0, 0);
    };

    socket.on('canvas-data', (data: any) => {
      var img = new Image();
      img.src = data;
      img.onload = function () {
        context.drawImage(img, 0, 0);
      };
    });
  }, [canvasImageData, socket, height, width, color]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousedown', startPaint);
    return () => {
      canvas.removeEventListener('mousedown', startPaint);
    };
  }, [startPaint]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [drawLine, isPainting, mousePosition]
  );

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mousemove', paint);
    return () => {
      canvas.removeEventListener('mousemove', paint);
    };
  }, [paint]);

  const exitPaint = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    var base64ImageData = canvas.toDataURL('image/png');

    localStorage.setItem('canvas', base64ImageData);
    socket.emit('canvas-data', { room: fileId, canvas: base64ImageData });
    setIsPainting(false);
    setMousePosition(undefined);
  }, []);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.addEventListener('mouseup', exitPaint);
    canvas.addEventListener('mouseleave', exitPaint);
    return () => {
      canvas.removeEventListener('mouseup', exitPaint);
      canvas.removeEventListener('mouseleave', exitPaint);
    };
  }, [exitPaint]);

  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }

    const canvas: HTMLCanvasElement = canvasRef.current;
    return {
      x: event.pageX - canvas.offsetLeft,
      y: event.pageY - canvas.offsetTop,
    };
  };

  const drawLine = useCallback(
    (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
      if (!canvasRef.current) {
        return;
      }

      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas.getContext('2d');
      if (context) {
        context.strokeStyle = color;
        context.lineJoin = 'round';
        context.lineWidth = 5;

        context.beginPath();
        context.moveTo(originalMousePosition.x, originalMousePosition.y);
        context.lineTo(newMousePosition.x, newMousePosition.y);
        context.closePath();

        context.stroke();
      }
    },
    [color]
  );

  return (
    <>
      <button
        onClick={copyLiveLinkTOClipboard}
        className='px-3 py-1 bg-indigo-400 text-white rounded-md text-sm float-right mr-[20px] mb-[10px]'>
        Share live link
      </button>
      <button
        onClick={() =>
          saveSketchFile(canvasRef.current!.toDataURL('image/png'))
        }
        className='px-3 py-1 bg-green-400 text-white rounded-md text-sm float-right mr-[60px] mb-[10px]'>
        {isLoading ? 'Loading...' : 'Save'}
      </button>
      <canvas
        ref={canvasRef}
        height={height}
        width={width}
        className='bg-white border relative'
      />
    </>
  );
};

Canvas.defaultProps = {
  width: 1200,
  height: 800,
};

export default Canvas;
