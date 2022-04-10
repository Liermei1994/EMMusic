import { HYEventStore } from 'hy-event-store'
import { getRankSongs } from '../service/api_music' 

const rankingStore = new HYEventStore({
  state:{
    name:'lem',
    recommendSongs:{}
  },
  actions:{
    getDatas(ctx,payload){
      getRankSongs({idx:1}).then(res =>{
        ctx.recommendSongs = res.playlist
      })
    }
  }
})
export {
  rankingStore
}