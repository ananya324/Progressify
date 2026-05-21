// components/FloatingParticles.jsx
export default function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {[...Array(25)].map((_, i) => (
        <span
          key={i}
          className="absolute bg-white/10 rounded-full animate-pulse"
          style={{
            width: Math.random() * 6 + 2 + "px",
            height: Math.random() * 6 + 2 + "px",
            top: Math.random() * 100 + "%",
            left: Math.random() * 100 + "%",
            animationDuration: Math.random() * 5 + 3 + "s",
          }}
        />
      ))}
    </div>
  );
}