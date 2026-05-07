type BackgroundAmbienceProps = {
  variant?: "default" | "single";
  className?: string;
};

export function BackgroundAmbience({
  variant = "default",
  className = "",
}: BackgroundAmbienceProps) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`.trim()}
    >
      {variant === "single" ? (
        <div className="absolute left-1/2 top-1/2 h-[min(600px,100vw)] w-[min(600px,100vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 opacity-50 blur-[120px]" />
      ) : (
        <>
          <div className="absolute left-0 top-0 h-[min(800px,100vw)] w-[min(800px,100vw)] -translate-x-1/4 -translate-y-1/2 rounded-full bg-primary/[0.10] blur-3xl" />
          <div className="absolute bottom-0 right-0 h-[min(800px,100vw)] w-[min(800px,100vw)] translate-x-1/4 translate-y-1/2 rounded-full bg-secondary/[0.08] blur-3xl" />
        </>
      )}
    </div>
  );
}
