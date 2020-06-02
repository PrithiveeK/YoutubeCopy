import React, { Component } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import VideoItem from './VideoItem';
import style from './cssModules/videoList.module.css';

class VideoList extends Component {
    constructor(props){
        super(props);
        this.state = {
            videos: [],
            pageToken: ''
        }
        this.extraLoading = {
            width: '100%',
            height: '50px',
            display: "flex"
        }
        this.loader = {
            margin: 'auto',
            width: '40px',
            height: '40px',
            borderRadius: '100%',
            border: '5px solid red',
            position: 'relative',
            animation: 'rotate 1s infinite linear'
        }
        this.loading = {
            position: 'absolute',
            width: '10px',
            height: '20px',
            backgroundColor: 'white',
            transform: 'rotateZ(35deg)',
            top: '-3px',
            left: '-3px'
        }
        this.retryRef = React.createRef();
    }
    componentDidMount(){
        this.loadNextPage();
    }
    componentDidUpdate(prevProps){
        if(this.props.query !== prevProps.query){
            this.props.loader[0]();
            this.loadNextPage(true);
        }
    }
    showRetry = () => {
        // console.log(this.retryRef.current);
        this.retryRef.current.style.display = "flex";
    }
    hideRetry = () => {
        // console.log(this.retryRef.current);
        this.retryRef.current.style.display = "none";
    }
    loadNextPage = async (updated = false) => {
        this.hideRetry();
        const token = this.state.pageToken;
        const query = this.props.query;
        const apiURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&&type=video&&maxResults=15';
        const queryPram = query ? `&&q=${query.replace(/\ /g,'+')}` : '';
        const pageToken = token ? `&&pageToken=${token}` : '';
        const key = `&&key=${process.env.REACT_APP_YOUTUBE_API}`;
        let res;
        try{
            res = await fetch(apiURL+queryPram+pageToken+key,
            {header: {'Content-Type': 'application/json'}});
            if(!res.ok)
            throw Error("error fetching");
        }catch(err){
            this.props.loader[1]();
            this.props.loader[2]();
            this.showRetry();
            return;
        }
        const result = await res.json();
        if(updated)
        this.props.loader[1]();
        this.setState({
            videos: updated ? result.items : this.state.videos.concat(result.items),
            pageToken: result.nextPageToken
        },()=>{
            if(updated)
            this.props.loader[2]();
        });
    }
    render() {
        return (
            <div className={style['video-list']}>
                <InfiniteScroll
                 dataLength = {this.state.videos.length}
                 next = {this.loadNextPage}
                 hasMore = {true}
                 loader = {<div style={this.extraLoading}><div style={this.loader}><div style={this.loading}></div></div></div>}
                >
                    {this.state.videos.map(video => 
                        <VideoItem key={video.id.videoId} details={video}/>    
                    )}
                </InfiniteScroll>
                <div className={'retry-container'} ref={this.retryRef}>
                    <button className={'retry-btn'}
                    onClick={this.loadNextPage}>Retry</button>
                </div>
            </div>
        );
    }
}

export default VideoList;