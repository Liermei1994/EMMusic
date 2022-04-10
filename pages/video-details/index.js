import { mvDetails,mvUrl,relatedMv } from '../../service/aip_video.js'

Page({

  data: {
    id:null,
    mvUrl:'',
    mvInfo:{},
    mvRelate:[]
  },
  onLoad: function (options) {
    this.setData({id:options.id})
    this.getAllDatas()
  },
  //api
  getAllDatas:function(){
    mvUrl({id:this.data.id}).then(res =>{
      this.setData({mvUrl:res.data})
    });
    mvDetails({mvid:this.data.id}).then(res =>{
      this.setData({mvInfo:res.data})
    });
    relatedMv({id:this.data.id}).then(res =>{
      this.setData({mvRelate:res.data})
    })
  }
})