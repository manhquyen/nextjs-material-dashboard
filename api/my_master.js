import { API_MY_MASTER } from './common'


const getArticles = ({ page, pageSize }) => {
    return API_MY_MASTER.get(`/getArticles?page=${page}&size=${pageSize}`)
}


const getArticlesByMaster = ({ masterId, page, pageSize}) => {
    return API_MY_MASTER.get(`/getArticlesByMaster?master_id=${masterId}&page=${page}&size=${pageSize}`)
}

const getDetailArticles = ({ articlesId }) => {
    return API_MY_MASTER.get(`/articlesDetail?articles_id=${articlesId}`)
}

const setActiveArticle = ({ articlesId, status }) => {
    return API_MY_MASTER.get(`/setActiveArticles?articles_id=${articlesId}&active=${status}`)
}

const getInfoMaster = ({ masterId }) => {
    return API_MY_MASTER.get(`/getUserInfo?user_id=${masterId}`)
}

const getListMaster = () => {
    return API_MY_MASTER.get(`/getMasters`)
}

const getFollowerByMaster = ({ masterId }) => {
    return API_MY_MASTER.get(`/getFollowerByMaster?master_id=${masterId}`)
}

export  {
    getArticles,
    getArticlesByMaster,
    getDetailArticles,
    setActiveArticle,
    getInfoMaster,
    getListMaster,
    getFollowerByMaster,
}