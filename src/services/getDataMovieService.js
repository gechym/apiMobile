const getApiMovie = require('../servicesAxios/getApiMovieAxios')
const { filterApi,
    getResolutionMovies,
    handleFilterSub,
    sliceStringIdBanner,
    getListOfferMovie,
    getRelatedSeries } = require('../utils/support')

let getApiHomeDataService = async (page) => {
    let apiResponse = []

    try {
        let apiData = await getApiMovie.getDataMovieByPage(page);
        let apiAfterFilter = filterApi(apiData.data.data.recommendItems)

        apiAfterFilter.forEach((element, index) => {
            let object1 = {}
            object1.homeSectionName = element.homeSectionName
            let arrListMovie = []

            element.recommendContentVOList.forEach((item, index) => {
                let object2 = {}
                object2.category = item.category
                object2.id = item.id
                object2.title = item.title
                object2.contentType = item.contentType
                object2.imageUrl = item.imageUrl
                arrListMovie[index] = object2
                object1.listMovie = arrListMovie
            })
            apiResponse[index] = object1
        });

        return apiResponse;
    } catch (error) {
        console.log("Error in getApiHomeDataService: " + error);
    }
}
let getDataBannerService = async () => {
    let apiResponse = []
    let index = 0;
    try {
        let listBanner = await getApiMovie.getDataMovieByPage(0);
        listBanner.data.data.recommendItems[1].recommendContentVOList.forEach((element) => {
            let object = {}

            if (element.title != "") {
                object.category = sliceStringIdBanner(element.jumpAddress).category
                object.movieIdBanner = sliceStringIdBanner(element.jumpAddress).id
                object.title = element.title
                object.imageUrl = element.imageUrl
                apiResponse[index] = object
                index++;
            }
        });

        return apiResponse;
    } catch (error) {
        console.log("Error in getDataBannerService: " + error);
    }
}
let getDetailMovieService = async (id, category) => {
    console.log(`${id}  ${category}`)
    let apiCustomRes = {}
    
    let listSpisodeMovie = []

    try {
        let res = await getApiMovie.getDetailMovieAxios(id, category);
        let detailMovie = res.data.data
        apiCustomRes.movieId = parseInt(id)
        apiCustomRes.categoryId = detailMovie.category
        apiCustomRes.releaseYear = detailMovie.year
        apiCustomRes.name = detailMovie.name
        apiCustomRes.category = detailMovie.tagNameList
        apiCustomRes.episodeCount = detailMovie.episodeCount
        apiCustomRes.nation = detailMovie.areaNameList[0]
        apiCustomRes.score = detailMovie.score
        apiCustomRes.image = { bannerImage: detailMovie.coverHorizontalUrl, mainImage: detailMovie.coverVerticalUrl }
        apiCustomRes.introduction = detailMovie.introduction
        detailMovie.episodeVo.forEach((episode, index) => {
            let object = {}
            object.episodeId = episode.id
            object.seriesNo = episode.seriesNo
            object.resolution = getResolutionMovies(episode.definitionList)
            object.subtitles = handleFilterSub(episode.subtitlingList)
            listSpisodeMovie[index] = object
        })
        apiCustomRes.episodeDetails = listSpisodeMovie
        apiCustomRes.recommendMovies = getListOfferMovie(detailMovie.likeList)
        apiCustomRes.relatedSeries = getRelatedSeries(detailMovie.refList)



        let resSearch = await getApiMovie.searchMovide(apiCustomRes.name)

        // console.log(resSearch.data)

        if(resSearch.data.results && resSearch.data.results[0]){
            let resMovie = await getApiMovie.getMovieTrailer(resSearch.data.results[0].id)

            console.log(resMovie.data.videos)


            resMovie.data.videos.results.forEach((item,index) => {
                if(item.type = "Trailer") {
                    apiCustomRes.trailer = item.key
                    return
                }
            })
        }


        return apiCustomRes;
    } catch (error) {
        console.log("Error in getDetailMovieService: " + error);
    }
}
let getMovieMediaService = async (category, movieId, episodeId, resolution) => {
    console.log(`${category} ${movieId} ${episodeId} ${resolution}`)

    let apiResponse = {}
    let apiLoklok = {}
    try {
        do {
            apiLoklok = await getApiMovie.getMovieMediaAxios(category, movieId, episodeId, resolution)
        } while (apiLoklok.data.data.mediaUrl.slice(0, apiLoklok.data.data.mediaUrl.indexOf("tv") + 2) !== "https://ali-cdn-play.loklok.tv")
        apiResponse.mediaUrl = apiLoklok.data.data.mediaUrl
        apiResponse.totalDuration = apiLoklok.data.data.totalDuration
        apiResponse.episodeId = apiLoklok.data.data.episodeId
        return apiResponse
    } catch (error) {
        console.log("Error in getMovieMediaService: " + error);
    }
}


let getSearchConfigService = async () => {
    try {
            apiLoklok = await getApiMovie.getSearchConfig()
            return apiLoklok.data
    } catch (error) {
        console.log("Error in getSearchConfigService: " + error);
    }
}

let postSearchService = async (body) => {
    try {
        apiLoklok = await getApiMovie.postSearch(body)

        return apiLoklok.data
    } catch (error) {
        console.log("Error in postSearchService: " + error);
    }
}


let postSearchKeyWord = async (body) => {
    try {
        apiLoklok = await getApiMovie.postSearchKeyWord(body)

        return apiLoklok.data
    } catch (error) {
        console.log("Error in postSearchService: " + error);
    }
}

module.exports = {
    getApiHomeDataService: getApiHomeDataService,
    getDataBannerService: getDataBannerService,
    getDetailMovieService: getDetailMovieService,
    getMovieMediaService: getMovieMediaService,
    getSearchConfigService : getSearchConfigService,
    postSearchService : postSearchService,
    postSearchKeyWord : postSearchKeyWord
}
