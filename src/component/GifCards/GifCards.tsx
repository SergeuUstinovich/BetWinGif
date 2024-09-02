import style from "./GifCards.module.scss";
import { DownloadSvg } from "../../assets/svg/DownloadSvg";
import { Button } from "../../ui";
import { useEffect, useRef, useState } from "react";
import GIF from "gif.js";

interface ImageToGifProps {
  svgContent: string;
  text: string;
}

export const GifCards = ({ svgContent, text }: ImageToGifProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gifUrl, setGifUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (svgContent && text) {
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const svgWithText = svgContent.replace(
            "</svg>",
            `
            <text x="60%" y="56%" dominant-baseline="middle" text-anchor="middle" font-style="italic" font-weight="800" font-size="30" line-height="120%" text-transform="uppercase" text-align="right" fill="#15513b">${text}</text>
            <text x="20%" y="53%" dominant-baseline="middle" text-anchor="middle" font-style="italic" font-weight="700" font-size="20" line-height="90%" text-transform="uppercase" fill="#15513b">
              <tspan x="16%" dy="0">code</tspan>
              <tspan x="16%" dy="1em">Promo:</tspan>
            </text>
            </svg>`
          );
          const encodedSvg = `data:image/svg+xml;base64,${btoa(svgWithText)}`;

          const img = new Image();
          img.src = encodedSvg;

          img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            drawImage(ctx, img);
            createGif();
          };
        }
      }
    }
  }, [svgContent, text]);

  const drawImage = (ctx: CanvasRenderingContext2D, img: HTMLImageElement) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.drawImage(img, 0, 0);
  };

  const createGif = () => {
    const canvas = canvasRef.current;

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setIsLoading(true);
        const img = new Image();
        img.src = canvas.toDataURL();

        img.onload = () => {
          const gif = new GIF({
            workers: 2,
            quality: 10,
            transparent: "rgba(0,0,0,0)",
          });

          let x = -img.width;
          const step = () => {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.drawImage(img, x, (ctx.canvas.height - img.height) / 2);
            gif.addFrame(ctx.canvas, { copy: true, delay: 20 });

            if (x < (ctx.canvas.width - img.width) / 2) {
              x += 20; // Уменьшение шага для более плавной анимации
              requestAnimationFrame(step);
            } else {
              for (let i = 0; i < 100; i++) {
                // 100 кадров для 10 секунд
                gif.addFrame(ctx.canvas, { copy: true, delay: 100 });
              }

              gif.on("finished", (blob) => {
                const url = URL.createObjectURL(blob);
                setGifUrl(url);
                setIsLoading(false);
              });

              gif.render();
            }
          };

          step();
        };
      }
    }
  };

  const downloadGif = () => {
    if (gifUrl) {
      const link = document.createElement("a");
      link.href = gifUrl;
      link.download = "downloaded.gif";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <>
      <div className={`${style.gifBlock}`}>
        <canvas
          ref={canvasRef}
          style={{ display: "none", backgroundColor: "transparent" }}
        ></canvas>
        {gifUrl ? (
          <div className={style.gifCard}>
            <img className={style.gifImg} src={gifUrl} alt="gif" />
            <Button onClick={downloadGif} className={style.gifButton}>
              <DownloadSvg />
              Download
            </Button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
};
