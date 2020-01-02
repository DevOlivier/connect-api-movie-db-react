import React from 'react'
const URL_YT = "https://www.youtube.com/embed/"

const VideoPlayer = (props) => {
    return (
        <div className="embed-responsive embed-responsive-16by9 mt-4"> 
                <iframe className="embed-responsive-item" src={`${URL_YT}${props.videoId}`} />
        </div>
    )
}

export default VideoPlayer