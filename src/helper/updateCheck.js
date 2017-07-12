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
  axios.get('https://api.github.com/repos/3shld/petal/releases/latest')
    .then(response => {
      let version = response.data.tag_name.substring(1).split('.'),
        main = version[0],
        secondary = version[1]

      if (typeof callback === 'function') {
        if (main > m || secondary > s) {
          callback(1)
        } else {
          callback(0)
        }
      }
    }).catch(console.log)
}