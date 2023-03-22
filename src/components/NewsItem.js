import React, { Component } from 'react'

export class NewsItem extends Component {

  render() {
    let {title,drce,imageUrl,pageUrl,author,date}=this.props;
    return (
        <div className='col-md-4 my-2'>
            <div className="card">
                <img src={!imageUrl ? "https://gumlet.assettype.com/bloombergquint%2F2019-06%2Feb7600fb-e0ec-47f6-bfae-009941cae449%2F323324904_1_5__3_.jpg?rect=0%2C0%2C4000%2C2100&w=1200&auto=format%2Ccompress&ogImage=true" :imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>
                    <p className="card-text">{drce}</p>
                    <p className="card-text"><small className='text-muted'>By {!author? "Unkown" :author} on {new Date(date).toGMTString()}</small></p>
                    <a href={pageUrl} className="btn btn-sm btn-primary">Read More...</a>
                </div>
            </div>
        </div>
    )
  }
}

export default NewsItem