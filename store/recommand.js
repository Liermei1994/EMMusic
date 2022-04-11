import {
  HYEventStore
} from 'hy-event-store'
import {
  getRankSongs
} from '../service/api_music'

const rankingMap = { 0: "newRanking", 1: "hotRanking", 2: "originRanking", 3: "upRanking" }

const rankingStore = new HYEventStore({
  state: {
    name: 'lem',
    recommendSongs: {},
    newRanking: {}, // 0: 新歌
    hotRanking: {}, // 1: 热门
    originRanking: {}, // 2: 原创
    upRanking: {} // 3: 飙升
  },
  actions: {
    getDatas(ctx, payload) {
      // getRankSongs({idx:1}).then(res =>{
      //   ctx.recommendSongs = res.playlist
      // })

      for (let i = 0; i < 4; i++) {
        getRankSongs({idx:i}).then(res => {
          const rankingName = rankingMap[i]
          ctx[rankingName] = res.playlist
          // switch (i) {
          //   case 0:
          //     ctx.newRanking = res.playlist
          //     break;
          //   case 1:
          //     ctx.hotRanking = res.playlist
          //     break;
          //   case 1:
          //     ctx.hotRanking = res.playlist
          //     break;
          //   case 1:
          //     ctx.hotRanking = res.playlist
          //     break;
          // }
        })
      }

    }
  }
})
export {
  rankingStore
}