'use strict'

export default function objectToFormData(obj) {
  return Object.keys(obj).reduce((formData, key) => {
    formData.append(key, obj[key])
    return formData
  }, new FormData)
}