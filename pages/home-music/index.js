// pages/home-music/index.js
import { getBanners,getSongMenu } from '../../service/api_music'
import computedHeight from '../../utils/queryHeight'
import throttle from '../../utils/throttle'

import { rankingStore } from '../../store/index'

const throttleQuery = throttle(computedHeight,1000)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList:[],
    swiperHeight:'',
    recommendList:[],
    hotSongMenu:[],
    recomMenu:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDatas()
    rankingStore.dispatch("getDatas")
    rankingStore.onState('recommendSongs',res =>{
      if(!res.tracks) return
      const recommendList = res.tracks.slice(0,6)
      this.setData({recommendList})
    })
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
  }

})