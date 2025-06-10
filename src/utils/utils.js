const parseMovieData = (movieData) => {
    if (!movieData) {
        throw new Error("Invalid Movie Data")
    }
    console.log("movie data inside parse: " + movieData)
    console.log("parsed data: " + movieData.results.map((data) => ({
      title: data.title,
      vote_average: data.vote_average,
      poster_path: data.poster_path,
    })))
}

export { parseMovieData  }