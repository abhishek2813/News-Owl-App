import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spiner from './Spiner';
import propTypes from 'prop-types'

export class News extends Component {

    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general'

    }
    static propTypes = {
        country: propTypes.string,
        pageSize: propTypes.number.isRequired,
        category: propTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1
        }
        document.title= `${this.props.category} -NewsOwl`

    }
    async updateNews() {
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=09d603374172456c90bbab00eb1dd9c4&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true })
        let data = await fetch(url);
        let jsonData = await data.json();
        this.setState({ articles: jsonData.articles, totalResult: jsonData.totalResults, loading: false })
    }
    async componentDidMount() {
        this.updateNews()
    }

    handlePrevclick = async () => {
        this.setState({
            page: this.state.page - 1
        })
        this.updateNews()
    }

    handleNextclick = async () => {

        this.setState({
            page: this.state.page + 1
        })
        this.updateNews()
    }

    render() {
        return (
            <div className='container my-3'>
                <div className='row'>
                    <h1 className='text-center'>NewsOwl - Top News headlines</h1>
                    {this.state.loading && <Spiner />}
                    {!this.state.loading && this.state.articles.map((val) => {
                        return <NewsItem key={val.url} title={val.title} drce={val.description} pageUrl={val.url} imageUrl={val.urlToImage} author={val.author} date={val.publishedAt} />
                    })}
                </div>
                <div className='conainer d-flex justify-content-between'>

                    <button className='btn btn-primary' disabled={this.state.page <= 1} onClick={this.handlePrevclick}> &laquo; Previous</button>
                    <button className='btn btn-primary' disabled={this.state.page + 1 > Math.ceil(this.state.totalResult / this.props.pageSize)} onClick={this.handleNextclick}>Next &raquo; </button>
                </div>

            </div>
        )
    }
}

export default News