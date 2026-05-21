// components/MouseGlow.jsx
import { useEffect, useState } from "react";

export default function MouseGlow() {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const move = (e) => {
            setPosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        window.addEventListener("mousemove", move);

        return () => window.removeEventListener("mousemove", move);
    }, []);

    return (
        <div
            className="pointer-events-none fixed inset-0 z-0"
            style={{
                background: `radial-gradient(
  180px at ${position.x}px ${position.y}px,
  rgba(99,102,241,0.13),
  transparent 75%
)`,
            }}
        />
    );
}