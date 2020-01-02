import React from 'react'

const IMG_URL = "https://image.tmdb.org/t/p/w500/"

// let movie = props.movie !!
//function VideoListItems({movie}) { return ( <li> movie.title </li> ) }

const VideoListItems = (props) => {
    console.log(props)
    return <li className="list-group-item mt-1" onClick={handleClickListItem}>
            <div className="media">
                <img className="media-object img-rounder align-self-center align-self-end mr-3 " width="120px" height="140px" src={`${IMG_URL}${props.movie.poster_path}`} />
                <div className="media-body">
                    <p className="list_item">{props.movie.title}</p>
                </div>
            </div>
        </li>

        function handleClickListItem () {
            props.callBack(props.movie)
        }
}

export default VideoListItems