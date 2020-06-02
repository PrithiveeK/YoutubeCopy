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
            q: ''
        }
        this.loadRef = React.createRef();
        this.retryRef = React.createRef();
    }
    startLoading = () => this.loadRef.current.classList.add(style.loading);
    doneLoading = () => this.loadRef.current.classList.add(style.loaded);
    removeLoader = () => {
        setTimeout(()=>{
            this.loadRef.current.classList.remove(style.loading);
            this.loadRef.current.classList.remove(style.loaded);
        },1000);
    }

    handelSearchQuery = (query) => {
        this.setState({q: query});
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
                <VideoList query={this.state.q} 
                loader={[this.startLoading,this.doneLoading,this.removeLoader]}
                retryer={[this.hideRetry,this.showRetry]}/>
                </Route>
                <Route path='/:id' render={(props)=>
                <WatchVideo {...props}
                loader={[this.startLoading,this.doneLoading,this.removeLoader]}
                retryer={[this.hideRetry,this.showRetry]}/>
                }/>
            </div>
            </HashRouter>
        );
    }
}

export default Home;