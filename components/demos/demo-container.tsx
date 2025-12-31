"use client";

import { useRef, useEffect, type ReactNode } from "react";

interface DemoContainerProps {
  controls: ReactNode;
  children: ReactNode;
  autoPlay?: boolean; // If true, always active, no hints, no overlay
  hideOverlay?: boolean; // If true, disables the darkening overlay effect
}

export function DemoContainer({ controls, children, autoPlay = false, hideOverlay = false }: DemoContainerProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Auto-play mode: always active, no click handlers needed
    if (autoPlay) {
      card.dataset.active = "true";
      return;
    }

    const setActive = (active: boolean) => {
      if (active) {
        card.dataset.active = "true";
      } else {
        delete card.dataset.active;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      // Base UI Select renders its popup in a portal, outside the card DOM.
      // Treat interactions inside the select popup as "inside" for control-mode.
      // (Otherwise, clicking a select item would look like an outside click and deactivate.)
      const targetEl = target as HTMLElement;
      const isSelectPortalInteraction =
        typeof targetEl.closest === "function" &&
        !!targetEl.closest(
          [
            "[data-slot='select-content']",
            "[data-slot='select-item']",
            "[data-slot='select-group']",
            "[data-slot='select-scroll-up-button']",
            "[data-slot='select-scroll-down-button']",
          ].join(", ")
        );
      if (isSelectPortalInteraction) return;

      // Click inside: activate.
      if (card.contains(target)) {
        setActive(true);
        return;
      }

      // Click outside: deactivate.
      setActive(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActive(false);
        // Keep focus behavior simple: allow Escape to "drop control"
        (document.activeElement as HTMLElement | null)?.blur?.();
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [autoPlay]);

  const handleClick = () => {
    // Always focus the card, even when clicking controls
    // This ensures keyboard input continues to work
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
      data-game-container
      data-no-overlay={hideOverlay ? "true" : undefined}
      className={`game-container rounded-lg border bg-card shadow-xs focus:outline-none overflow-hidden transition-all duration-200 ${
        autoPlay
          ? ""
          : "data-active:ring-4 data-active:ring-border cursor-pointer"
      }`}
      tabIndex={autoPlay ? -1 : 0}
      onClick={autoPlay ? undefined : handleClick}
    >
      <div className="relative h-64 bg-muted/30">
        {children}
        {!autoPlay && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-sm border rounded-md px-2 py-1 text-xs text-muted-foreground">
              Click to control
            </div>
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm border rounded-md px-2 py-1 text-xs text-muted-foreground">
              WASD to move
            </div>
          </div>
        )}
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
