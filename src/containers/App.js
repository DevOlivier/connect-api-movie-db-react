import React, { Component } from 'react'
import axios from 'axios'
import Header from '../components/header'
import SearchBar from '../components/searchBar'
import VideoList from './videoList'
import VideoDetail from '../components/videoDetail'
import VideoPlayer from '../components/videoPlayer'
import '../style.css'

//alt gr7 ``

const API_END_POINT = "https://api.themoviedb.org/3/"
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=false&append_to_response=images"
const SEARCH_URL = "search/movie?language=fr&include_adulte=false"
const API_KEY = "api_key=3bc17d099c740708dbea7ec7a3eb111b"

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { moviesList : {} , currentMovie: {} }
  }

  componentWillMount () {
    this.initDataBaseMovie()
  }

  initDataBaseMovie () {
    axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`)
      .then(function (response) {
        console.log("response get", response)
        //function callback pour que curentMovie.id soit bien charger dans le state (async). Permet de mettre le state à jour avant d'appeller la fonction
        this.setState({ moviesList: response.data.results.slice(1, 6), currentMovie: response.data.results[0]},function(){
          this.addIdVideoCurrentMovie()
        })
      }.bind(this))
  }

  //Ajout d'un paramètre videoId dans le champs state currentMovie 
  addIdVideoCurrentMovie () {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=false`)
      .then(function(response) {
        const keyVideoYt = response.data.videos.results[0].key 
        let newCurrentMovieState = this.state.currentMovie
        newCurrentMovieState.videoId = keyVideoYt
        this.setState({currentMovie : newCurrentMovieState})
      }.bind(this))
  }

  //affichage vidéoList dans le currentMovie
  receivePropsChildren (movie) {
    this.setState({currentMovie : movie},function() {
      this.addIdVideoCurrentMovie()
      this.setRecommandation()
    })
  }

  //permettre la recherche d'un film dans la barre de recherche
  onClickSearchBarNameMovie (searchText) {
    if (searchText) {
      axios.get(`${API_END_POINT}${SEARCH_URL}&${API_KEY}&query=${searchText}`)
        .then(function (response) {
          if (response.data && response.data.results[0]) {
            if (response.data.results[0].id != this.state.currentMovie.id ) {
              this.setState({currentMovie : response.data.results[0]}, function() {
                this.addIdVideoCurrentMovie()
                this.setRecommandation()
              })
            }
          }
        }.bind(this))
    }
  }

  setRecommandation() {
    axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}/recommendations?${API_KEY}&language=fr`)
      .then(function (response) {
        this.setState({ moviesList: response.data.results.slice(0, 5)}, function () {
          this.addIdVideoCurrentMovie()
        })
      }.bind(this))
  }

  render () {

    //fonction qui va afficher le resultat que si les 5 films sont chargés. (async)
    const renderVideoList = () => {
      if(this.state.moviesList.length >=5) {
        return <VideoList movieList={this.state.moviesList} callBack={this.receivePropsChildren.bind(this)} />
      }
    }

    return (
      <React.Fragment>
        <header>
          <Header />
        </header>
        <div className="container mt-4">
          <SearchBar callBack={this.onClickSearchBarNameMovie.bind(this)} />
          <p className="mt-2">Liste des films présent sur l'api MovieDb <a href="https://www.themoviedb.org/movie?language=fr" target="blank">ici</a></p>
          <div className="row">
            <div className="col-md-8">
              <VideoPlayer videoId={this.state.currentMovie.videoId} />
              <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
            </div>
            <div className="col-md-4 mt-4">
              <h3 className="titleListItem">Notre top 5 du moment</h3>
              {renderVideoList()}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
