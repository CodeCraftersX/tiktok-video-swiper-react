export function getCurrentPlaybackPercent(currentTime, totalDuration ) {

  
    if (totalDuration === 0) {
      return 0; // If duration is not available yet
    } else {
      return (currentTime / totalDuration) * 100;
    }
  }
export function percentToSeconds(progress, totalDuration) {
    return (progress / 100) * totalDuration;
}

