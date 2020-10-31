import React from "react";

export const Shape = ({width, height, color, shape}) => {
  return (
    <div className={shape}>

      {/* dynamics styling */}
      <style jsx>{`
        .square {
          width: ${width}px;
          height: ${height}px;
          background: ${color};
          animation-name: easeIn;
          animation-duration: 4s;
        }
        
        .rectangle {
          width: ${width}px;
          height: ${height}px;
          background: ${color};
          animation-name: easeIn;
          animation-duration: 4s;
        }
        
        .circle {
          width: ${width}px;
          height: ${width}px;
          background: ${color};
          border-radius: 50%;
          animation-name: easeIn;
          animation-duration: 4s;
        }
        
        @keyframes easeIn {
          0% { 
            width: 0;
            height: 0;
          }
          100% {
           width: ${width}px;
           height: ${height}px;
          }
        } 
      `}</style>
    </div>
  )
};
