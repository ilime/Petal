/**
 * Handle pattern switch except 'select'
 * 
 * @export
 * @param {string} pattern 
 * @param {string} nextPattern 
 * @param {Array} recentSong 
 * @param {Array} redheartSong 
 * @param {number} recentIndex 
 * @param {number} nextRecentIndex 
 * @param {number} redheartIndex 
 * @param {number} nextRedheartIndex 
 * @param {Function} helper 
 */
export default function patternSwitch(
  pattern,
  nextPattern,
  recentSong,
  redheartSong,
  recentIndex,
  nextRecentIndex,
  redheartIndex,
  nextRedheartIndex,
  helper
) {
  switch (nextPattern) {
    case 'recent':
      helper(pattern, nextPattern)(recentSong, recentIndex, nextRecentIndex)
      break
    case 'redheart':
      helper(pattern, nextPattern)(redheartSong, redheartIndex, nextRedheartIndex)
      break
    default:
      break
  }
}