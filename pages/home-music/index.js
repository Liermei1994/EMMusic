// pages/home-music/index.js
import { getBanners,getSongMenu } from '../../service/api_music'
import computedHeight from '../../utils/queryHeight'
import throttle from '../../utils/throttle'

import { rankingStore } from '../../store/index'

const throttleQuery = throttle(computedHeight,1000)

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    swiperHeight:'',
    recommendList:[],
    hotSongMenu:[],
    recomMenu:[],
    screenWidth:0,
    rankings: { 0: {}, 2: {}, 3: {} }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({screenWidth:app.globalData.screenWidth})
    this.getDatas()
    // 发起共享数据的请求
    rankingStore.dispatch("getDatas")
    // 从store获取共享的数据
    rankingStore.onState('hotRanking',res =>{
      if(!res.tracks) return
      const recommendList = res.tracks.slice(0,6)
      this.setData({recommendList})
    })
    rankingStore.onState("newRanking", this.getRankingHandler(0))
    rankingStore.onState("originRanking", this.getRankingHandler(2))
    rankingStore.onState("upRanking", this.getRankingHandler(3))
  },
  goSeacrh: function(){
    wx.navigateTo({
      url: '/pages/search/index',
    })
  },
  //api
  getDatas(){
    getBanners().then(res =>{
      this.setData({bannerList:res.banners})
    })
    getSongMenu({cat:"全部"}).then(res =>{
      this.setData({ hotSongMenu: res.playlists })
    })
    getSongMenu({cat:"华语"}).then(res =>{
      this.setData({ recomMenu: res.playlists })
    })
  },
  watchImg(){
    throttleQuery('.si-img').then(res =>{
      this.setData({swiperHeight:res[0].height})
    })
  },
  getRankingHandler: function(idx) {
    return (res) => {
      if (Object.keys(res).length === 0) return
      console.log("idx:", idx)
      const name = res.name
      const coverImgUrl = res.coverImgUrl
      const playCount = res.playCount
      const songList = res.tracks.slice(0, 3)
      const rankingObj = {name, coverImgUrl, playCount, songList}
      const newRankings = { ...this.data.rankings, [idx]: rankingObj}
      this.setData({ 
        rankings: newRankings
      })
      console.log(this.data.rankings)
    }
  },

})