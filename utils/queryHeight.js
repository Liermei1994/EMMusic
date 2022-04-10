export default function computedHeight(param){
  return new Promise((resolve,reject)=>{
    const query = wx.createSelectorQuery()
    query.select(param).boundingClientRect()
    // query.selectViewport().scrollOffset()
    query.exec(res =>{
     resolve(res)
    })
  })
}