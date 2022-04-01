const axios = require('axios');

const axiosOptions = {
    headers: {
        "lang": "en",
        "versioncode": 11,
        "clienttype": "ios_jike_default",

    }
}
const getDataMovieByPage = async (page) => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=${page}`, axiosOptions)
}

const getDetailMovieAxios = async (id, category) => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`, axiosOptions)
}

const getMovieMediaAxios = async (category, movieId, episodeId, resolution) => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${movieId}&episodeId=${episodeId}&definition=${resolution}`, axiosOptions)
}

const searchMovide = async (name) => {


    return await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=6d9553f6d964292a13b91bf8b1fbbf74&language=en-US&query=${name}&page=1&include_adult=false`, axiosOptions)
}



const getMovieTrailer = async (id) => {
    return await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=6d9553f6d964292a13b91bf8b1fbbf74&append_to_response=videos,images,credits`, axiosOptions)
}

const getSearchConfig = async () => {
    return await axios.get(`https://ga-mobile-api.loklok.tv/cms/app/search/list`, axiosOptions)
}

const postSearch = async (body) => {


    return await axios.post(`https://ga-mobile-api.loklok.tv/cms/app/search/v1/search`, {
        size: 50,
        params: body.params,
        area: body.area,
        category: body.category,
        year: body.year,
        subtitles: "",
        order: body.order
    }, axiosOptions )
}

const postSearchKeyWord = async (body) => {


    return await axios.post(`https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord`, {
        searchKeyWord: body.name,
        size: 50,
        sort: "",
        searchType: ""
    }, axiosOptions )
}


module.exports = {
    getDataMovieByPage: getDataMovieByPage,
    getDetailMovieAxios: getDetailMovieAxios,
    getMovieMediaAxios: getMovieMediaAxios,
    searchMovide : searchMovide,
    getMovieTrailer : getMovieTrailer,
    getSearchConfig : getSearchConfig,
    postSearch : postSearch,
    postSearchKeyWord : postSearchKeyWord
}

