import { useEffect, useState } from 'react'

const ConfettiAnimation = () => {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    // Generar confeti
    const pieces = []
    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
        duration: 2 + Math.random() * 2,
        color: ['#FF4500', '#ff6a35', '#4ade80', '#fbbf24', '#60a5fa'][Math.floor(Math.random() * 5)]
      })
    }
    setConfetti(pieces)
  }, [])

  return (
    <>
      <style>{`
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 9999;
          overflow: hidden;
        }

        .confetti-piece {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          opacity: 0;
          animation: confetti-fall linear forwards;
        }

        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotateZ(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotateZ(720deg);
            opacity: 0;
          }
        }

        .confetti-piece:nth-child(odd) {
          border-radius: 50%;
        }
      `}</style>

      <div className="confetti-container">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`
            }}
          />
        ))}
      </div>
    </>
  )
}

export default ConfettiAnimation
