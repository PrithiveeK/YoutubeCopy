import React, { Component } from 'react';
import style from './cssModules/searchBar.module.css';

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            query: this.props.query
        }
    }
    handleQuery = (event) => {
        this.setState({query: event.target.value});
    }
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchQuery(this.state.query);
    }
    render() {
        const {query} = this.state;
        return (
            <div className={style['top-bar']}>
                <h1 className={style.youtube}>Youtube</h1>
                <form onSubmit={this.handleSubmit} className={style['query-form']}>
                    <input type='text' value={query} onChange={this.handleQuery}
                    className={style['query-input']}/>
                    <button type='submit' className={style['submit-btn']}>Search</button>
                </form>
                <div className={style.empty} />
            </div>
        );
    }
}

export default SearchBar;