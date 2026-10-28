/* eslint-disable no-unused-vars */
import React from 'react';
import { motion } from 'framer-motion';

function AutoScrollImages({ 
  images = [], 
  height = '170px', 
  duration = 20 
}) {
  const allImages = [...images, ...images];

  return (
    <div className="w-full overflow-hidden relative">
      <motion.div
        className="flex gap-6"
        animate={{
          x: [0, -50 + '%'],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        }}
      >
        {allImages.map((item, i) => {
          const src = typeof item === 'string' ? item : item.src;
          const alt = typeof item === 'string' ? '' : item.alt || '';
          const link = typeof item === 'string' ? '#' : item.link || '#';

          return (
            <div 
              key={i} 
              className="flex-shrink-0 group relative"
              style={{ height }}
            >
              {/* Image du partenaire */}
              <div className="relative h-full w-auto overflow-hidden rounded-lg shadow-lg bg-white p-4">
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-auto object-contain mx-auto transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Overlay avec bouton "Visiter" */}
                <div className="absolute inset-0 bg-black/5 group-hover:bg-opacity-60 transition-all duration-300 flex items-end justify-center pb-4 rounded-lg">
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-first hover:bg-first/90 text-white px-6 py-2 rounded-full font-semibold text-sm shadow-lg"
                  >
                    Visiter
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default AutoScrollImages;