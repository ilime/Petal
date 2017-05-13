'use strict'

/**
 * Object to FormData
 * View this to get more
 * https://developer.mozilla.org/en-US/docs/Web/API/FormData
 * 
 * @export
 * @param {Object} obj 
 * @returns {FormData}
 */
export default function objectToFormData(obj) {
  return Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key])
    return formData
  }, new FormData)
}