let filterApi = (data) => {
    return data.filter((item) => {
        return item.homeSectionType != "BANNER" && item.homeSectionType != "BLOCK_GROUP"
    })
}
let getResolutionMovies = (arr) => {
    return arr.map(data => {
        return {
            code: data.code,
            description: data.description
        }
    })
}
let handleFilterSub = (data) => {
    let language = data.filter((sub) => {
        return sub.language === "English" || sub.language === "Tiếng Việt"

    })
    return language.map((data) => {
        return {
            language: data.language,
            languageAbbr: data.languageAbbr,
            subtitlingUrl: data.subtitlingUrl
        }
    })
}
let sliceStringIdBanner = (string) => {
    let id = string.slice(string.indexOf("=") + 1, string.indexOf("&type"))
    let category = string.substr(string.length - 1);

    return { id: parseInt(id), category: parseInt(category) }
}
let getListOfferMovie = (listMovie) => {
    return listMovie.map((movie) => {
        return {
            categoryId: parseInt(movie.category),
            movieId: movie.id,
            name: movie.name,
            image: {
                bannerImage: movie.coverHorizontalUrl,
                mainImage: movie.coverVerticalUrl
            },
        }
    })
}
let getRelatedSeries = (listMovie) => {
    return listMovie.map((movie) => {
        return {
            categoryId: parseInt(movie.category),
            movieId: parseInt(movie.id),
            name: movie.name,
            seriesNo: movie.seriesNo,
            image: {
                bannerImage: movie.coverHorizontalUrl,
                mainImage: movie.coverVerticalUrl
            },

        }
    })
}
module.exports = {
    filterApi: filterApi,
    getResolutionMovies: getResolutionMovies,
    handleFilterSub: handleFilterSub,
    sliceStringIdBanner: sliceStringIdBanner,
    getListOfferMovie: getListOfferMovie,
    getRelatedSeries: getRelatedSeries
}
