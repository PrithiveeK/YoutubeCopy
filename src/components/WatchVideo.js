import React, { Component } from 'react';
import style from './cssModules/watchVideo.module.css';

class WatchVideo extends Component {
    constructor(props){
        super(props);
        this.state = {
            videoDet: {
                title: '',
                desc: '',
                channelName: '',
                pubDate: ''
            }
        }
    }
    componentDidMount(){
        this.videoId = this.props.match.params.id;
        this.getVideoDetails();
    }
    getVideoDetails = async () => {
        this.props.loader[0]();
        const apiURL = 'https://www.googleapis.com/youtube/v3/videos?part=snippet';
        const videoIdPrams = `&&id=${this.videoId}`;
        const key = `&&key=AIzaSyAH4EKzZI6NooXKYNkPYGhW7csAPWS-0fk`;
        const res = await fetch(apiURL+videoIdPrams+key,
            {header: {'Content-Type': 'application/json'}});
        const result = await res.json();
        const data = result.items[0].snippet;
        const date = Date(data.publishedAt).split(' ');
        this.props.loader[1]();
        this.setState({videoDet: {
            title: data.title,
            desc: data.description,
            channelName: data.channelTitle,
            pubDate: `${date[1]} ${date[2]}, ${date[3]}`
        }},()=>{
            this.props.loader[2]();
        });
    }
    render() {
        const {title, desc, channelName, pubDate} = this.state.videoDet;
        return (
            <div className={style['body-container']}>
                <div className={style['watcher-container']}>
                    <object data={`https://youtube.com/embed/${this.videoId}`} 
                    className={style.object}/>
                    <h2 className={style['video-title']}>{title}</h2>
                    <p className={style['pub-date']}>{pubDate}</p>
                    <div className={style['video-content']}>
                        <p className={style['channel-title']}>{channelName}</p>
                        <p className={style['video-desc']}>{desc}</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default WatchVideo;