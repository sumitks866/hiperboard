import { generateColorCode } from "@/utils/utilities";
import React, { useEffect, useRef } from "react";

interface IProps {
  name: string;
  width?: number;
  height?: number;
}

const getInitials = (str: string) => {
  return str
    ?.trim()
    .split(" ")
    .slice(0, 2)
    .map((word) => word.charAt(0))
    .join("");
};

export default function NameLogo(props: IProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current === null) return;
    const initials = getInitials(props.name);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const backgroundColor = generateColorCode(props.name || ""),
      textColor = "#ffffff";

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw background circle
    ctx.beginPath();
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      canvas.width / 2,
      0,
      Math.PI * 2
    );
    ctx.fillStyle = backgroundColor;
    ctx.fill();

    // Draw initials text
    ctx.font = `${canvas.width / 1.7}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials, canvas.width / 2, canvas.height / 2);
  }, [props]);

  return (
    <canvas
      ref={canvasRef}
      width={props.height || 100}
      height={props.width || 100}
      style={{ borderRadius: "50%", display: 'block' }}
    ></canvas>
  );
}
