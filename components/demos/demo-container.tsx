"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface DemoContainerProps {
  controls: ReactNode;
  children: ReactNode;
}

export function DemoContainer({ controls, children }: DemoContainerProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleBlur = (e: FocusEvent) => {
      // Don't blur if focus is moving to a child element within the card
      const relatedTarget = e.relatedTarget as Node | null;
      if (relatedTarget && card.contains(relatedTarget)) {
        return;
      }
    };

    card.addEventListener("blur", handleBlur, true);

    return () => {
      card.removeEventListener("blur", handleBlur, true);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    // Always focus the card, even when clicking controls
    // This ensures keyboard input continues to work
    e.preventDefault();
    cardRef.current?.focus();
  };

  const handleControlInteraction = (e: React.MouseEvent) => {
    // Allow control interaction but maintain card focus
    e.stopPropagation();
    // Refocus card after a brief delay to allow control to process
    setTimeout(() => {
      cardRef.current?.focus();
    }, 0);
  };

  return (
    <div
      ref={cardRef}
      className="game-container my-8 rounded-lg border bg-card shadow-xs focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 cursor-pointer"
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="relative h-64 bg-muted/30">
        {children}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm border rounded-md px-2 py-1 text-xs text-muted-foreground">
            Click to control
          </div>
          <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm border rounded-md px-2 py-1 text-xs text-muted-foreground">
            WASD to move
          </div>
        </div>
      </div>
      <div
        className="border-t p-4 flex gap-4 items-center flex-wrap"
        onClick={handleControlInteraction}
      >
        {controls}
      </div>
    </div>
  );
}
