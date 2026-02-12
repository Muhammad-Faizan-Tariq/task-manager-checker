import confetti from 'canvas-confetti';

/**
 * Trigger confetti animation when a task is added
 * Moderate celebration with blue/green colors from center-top
 */
export const triggerTaskAddedConfetti = () => {
  confetti({
    particleCount: 50,
    spread: 60,
    origin: { x: 0.5, y: 0.4 },
    colors: ['#3B82F6', '#10B981', '#6366F1'], // Blue and green shades
    ticks: 150,
    gravity: 1,
    scalar: 0.8
  });
};

/**
 * Trigger confetti animation when a task is completed
 * Bigger celebration with rainbow colors from element position
 * @param {Object} options - Optional configuration
 * @param {number} options.x - X position (0-1, defaults to 0.5)
 * @param {number} options.y - Y position (0-1, defaults to 0.5)
 */
export const triggerTaskCompletedConfetti = (options = {}) => {
  const { x = 0.5, y = 0.5 } = options;

  // Fire two bursts for a bigger celebration
  const count = 100;
  const defaults = {
    origin: { x, y },
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
  };

  confetti({
    ...defaults,
    particleCount: count,
    spread: 100,
    ticks: 200,
    gravity: 1.2,
    scalar: 1.2
  });

  // Second burst with different spread
  setTimeout(() => {
    confetti({
      ...defaults,
      particleCount: count / 2,
      spread: 60,
      ticks: 150,
      gravity: 1,
      scalar: 0.9
    });
  }, 150);
};
