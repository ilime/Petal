'use strict'

export const AUDIO_VOLUME_PROGRESS_SET = 'AUDIO_VOLUME_PROGRESS_SET'
export const AUDIO_VOLUME_PIN_SET = 'ADUIO_VOLUME_PIN_SET'

export const audioVolumeProgressSet = width => {
  return {
    type: AUDIO_VOLUME_PROGRESS_SET,
    width
  }
}

export const audioVolumePinSet = left => {
  return {
    type: AUDIO_VOLUME_PIN_SET,
    left
  }
}