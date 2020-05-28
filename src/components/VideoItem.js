import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import style from './cssModules/videoItem.module.css'

class VideoItem extends Component {
    render() {
        const videoId = this.props.details.id.videoId;
        const title = this.props.details.snippet.title;
        const channelTitle = this.props.details.snippet.channelTitle;
        const desc = this.props.details.snippet.description;
        const imgUrl = this.props.details.snippet.thumbnails.medium.url;
        return (
            <Link to={`/${videoId}`}>
            <div className={style['video-item']} onClick={this.loadVideo}>
                <img src={imgUrl} alt='' className={style['img-content']}/>
                <h3 className={style['video-title']}>{title}</h3>
                <p className={style['channel-title']}>{channelTitle}</p>
                <p className={style['video-desc']}>{desc}</p>
            </div>
            </Link>
        );
    }
}

export default VideoItem;