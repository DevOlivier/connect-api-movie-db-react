import React from 'react'
import VideoListItems from '../components/videoListItems'

const VideoList = (props) => {
    console.log('test movieList---' , props)
    return (
        <div>
            <ul>
                {
                    props.movieList.map(value => {
                        return <VideoListItems key={value.id} movie={value} callBack={receivePropsChildren} />
                    })
                }
            </ul>
        </div>
    )

    function receivePropsChildren (movie) {
        props.callBack(movie)
    }
}

export default VideoList