const dataControllerMovie = require('../controller/getDataMovieController')

let route = (app) => {

    app.get('/getListMovie', dataControllerMovie.getListMovieController)

    app.get('/getBanner', dataControllerMovie.getBannerController)

    app.get('/getDetailMovie', dataControllerMovie.getDetailMovieController)

    app.get('/getMovieMedia', dataControllerMovie.getMovieMediaController)


    app.get('/getSearchConfig', dataControllerMovie.getSearchConfig)

    app.post('/search',dataControllerMovie.postSearch)

    app.post('/searchWithKeyWord',dataControllerMovie.postSearchKeyWord)
}


module.exports = route;