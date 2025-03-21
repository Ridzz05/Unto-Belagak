'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { users } from '@/app/data/users';
import Detail from '../Detail/Detail';

export default function Card() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = users.length - 1;
      if (nextIndex >= users.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <>
      <div className="relative w-full max-w-sm mx-auto h-64 overflow-hidden border border-black">
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 border border-black overflow-hidden">
                  <img 
                    src={users[currentIndex].avatar} 
                    alt={users[currentIndex].name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-2xl font-mono uppercase tracking-tight">{users[currentIndex].name}</p>
                <p className="text-sm font-mono opacity-60">{users[currentIndex].username}</p>
                <p className="text-xs font-mono mt-1 uppercase">[ {users[currentIndex].role} ]</p>
                <button
                  onClick={() => setIsDetailOpen(true)}
                  className="mt-2 font-mono text-xs hover:bg-black hover:text-white transition-colors px-2 py-1"
                >
                  [ detail ]
                </button>
                <p className="text-xs mt-2 font-mono">[ {currentIndex + 1} / {users.length} ]</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-sm hover:bg-black hover:text-white transition-colors px-2 py-1"
          onClick={() => paginate(-1)}
        >
          [ ← ]
        </button>
        
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 font-mono text-sm hover:bg-black hover:text-white transition-colors px-2 py-1"
          onClick={() => paginate(1)}
        >
          [ → ]
        </button>
      </div>

      <Detail 
        user={users[currentIndex]}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
      />
    </>
  );
} 