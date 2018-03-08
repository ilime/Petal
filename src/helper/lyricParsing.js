const linePattern = /^\[(\d{2}:\d{2}\.\d{2,3})\](.*)$/

function lyricParsing(lyric) {
  let result = {
    lyricArr: [],
    canScroll: false
  }

  if (lyric === '暂无歌词') {
    result.lyricArr.push(lyric)
    return result
  }

  if (!lyric.startsWith('[')) {
    result.lyricArr = lyric
      .split('\r\n')
      .filter(line => line !== '')
      .map(line => line.trim())

    return result
  }

  if (lyric.search(/\r\n/) !== -1) {
    result.lyricArr = lyric.split('\r\n').filter(line => line !== '')

    result.lyricArr = result.lyricArr
      .map(line => {
        let matched = line.match(linePattern)
        if (matched !== null) {
          let time = matched[1]

          time = time.split(':')
          time[0] = parseInt(time[0])
          time[1] = parseFloat(time[1])
          time = time[0] * 60 + time[1]

          return [time, matched[2].trim()]
        } else {
          return null
        }
      })
      .filter(line => line !== null && line[1] !== '')

    result.canScroll = true
  }

  return result
}

export default lyricParsing
