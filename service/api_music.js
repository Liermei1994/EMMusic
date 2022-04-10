import emRequest from './index'

export function getBanners(params){
  return emRequest.get('/banner',{type:2})
}

export function getRankSongs(params){
  return emRequest.get('/top/list',params)
}

export function getSongMenu(params) {
  return emRequest.get("/top/playlist", {limit:6, offset:0,...params})
}