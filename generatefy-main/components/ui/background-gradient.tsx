
import React from 'react';

export default function BackgroundGradient() {
  return (
    <div className="fixed inset-0 -z-10 bg-neutral-950">
      {/* Glow central/superior ciano */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_560px_at_50%_200px,hsl(var(--primary)/0.08),transparent)]" />
      
      {/* Grade de linhas em ciano discreto */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.04)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.04)_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      {/* Overlay de vinheta para profundidade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,hsl(var(--background))_100%)]" />
    </div>
  );
}