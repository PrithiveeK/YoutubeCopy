import React, { Component } from 'react';
import VideoItem from './VideoItem';
import style from './cssModules/videoList.module.css';

class VideoList extends Component {
    componentDidMount(){
        this.props.loadDefault();
    }
    render() {
        return (
            <div className={style['video-list']}>
                {this.props.videos.map(video => 
                    <VideoItem key={video.etag} details={video}/>    
                )}
            </div>
        );
    }
}

export default VideoList;