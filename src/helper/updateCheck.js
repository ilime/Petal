import axios from 'axios'

/**
 * Check update, use github release api
 *
 * @export
 * @param {number} m
 * @param {number} s
 * @param {Function} callback - one arg stand for need update.1 is need.
 */
export default function checkUpdate(m, s, callback) {
  return axios
    .get('https://api.github.com/repos/ilime/Petal/releases/latest')
    .then((response) => {
      let version = response.data.tag_name
        .substring(1)
        .split('.')
        .map((item) => parseInt(item))
      let main = version[0]
      let secondary = version[1]

      let needUpdate = false

      if (main > m) {
        needUpdate = true
      } else {
        if (main === m) {
          if (secondary > s) {
            needUpdate = true
          }
        }
      }

      if (typeof callback === 'function') {
        callback(needUpdate)
      }

      return needUpdate
    })
    .catch(console.log)
}
