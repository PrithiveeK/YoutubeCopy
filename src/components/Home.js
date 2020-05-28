import React, { Component } from 'react';
import {HashRouter, Route} from 'react-router-dom';
import SearchBar from './SearchBar';
import VideoList from './VideoList';
import WatchVideo from './WatchVideo';
import style from './cssModules/home.module.css';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            q: '',
            videoList: []
        }
        this.loadRef = React.createRef();
    }
    startLoading = () => this.loadRef.current.classList.add(style.loading);
    doneLoading = () => this.loadRef.current.classList.add(style.loaded);
    removeLoader = () => {
        setTimeout(()=>{
            this.loadRef.current.classList.remove(style.loading);
            this.loadRef.current.classList.remove(style.loaded);
        },1000);
    }

    handelSearchQuery = async (query) => {
        this.startLoading();
        const apiURL = 'https://www.googleapis.com/youtube/v3/search?part=snippet&&type=video';
        const queryPram = query ? `&&q=${query.replace(/\ /g,'+')}` : '';
        const key = `&&key=AIzaSyAH4EKzZI6NooXKYNkPYGhW7csAPWS-0fk`;
        const res = await fetch(apiURL+queryPram+key,
        {header: {'Content-Type': 'application/json'}});
        const result = await res.json();
        this.doneLoading();
        this.setState({q: query, videoList: result.items},()=>{
            this.removeLoader();
        });
    }
    render() {
        return (
            <HashRouter>
            <div className={style.header}>
                <div className={style.load}>
                    <div className={style.loader} ref={this.loadRef}/>
                </div>
                <SearchBar searchQuery={this.handelSearchQuery} query={this.state.q}/>
                <Route exact path='/'>
                <VideoList videos={this.state.videoList} 
                loadDefault={this.handelSearchQuery}/>
                </Route>
                <Route path='/:id' render={(props)=>
                <WatchVideo {...props}
                loader={[this.startLoading,this.doneLoading,this.removeLoader]}/>
                }/>
            </div>
            </HashRouter>
        );
    }
}

export default Home;