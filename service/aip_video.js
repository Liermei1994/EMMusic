import emRequest from './index'

export function topMv(params){
  return emRequest.get('/top/mv',{limit:10,...params})
}

//获取 mv 数据
export function mvDetails(params){
  return emRequest.get('/mv/detail',params)
}

//mv地址
export function mvUrl(params){
  return emRequest.get('/mv/url',params)
}

//相关视频
export function relatedMv(params){
  return emRequest.get('/related/allvideo',params)
}