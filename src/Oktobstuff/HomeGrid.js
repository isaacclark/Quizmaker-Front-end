import React from 'react';
import {Col, Row} from 'antd';
import OktobCard from './OktobCard';

articles = []

class HomeGrid extends React.Component{
    
    constructor(props){
        super(props);
        
        this.state = {
            
        }

        this.clickItem = this.clickItem.bind(this);
    }

    clickItem(id){
        console.log("article with id:" + id + " was clicked");
    }
    oneRow(articles, rowNumber){
        let row = articles.map(element => {
            return <>
            <Col span={6}>
                {element !== null ? (
                <OktobCard key={element.id} id={element.id} title={element.title} description={element.description}
                    likes={element.likes} comments={element.comments} selected={element.liked}
                    imgSrc = {element.imgURL}  clicked={this.clickItem} />) : null }
                    </Col>   
                    </>
        }
        );

        return <div key={rowNumber}>
            <Row type="flex" justify="center">
                {row}
            </Row>
            <br />
        </div>
    }

    render(){
        let allRows = [];
        let counter = 0;
        let rowNumber = 0;

        while(counter < this.props.articles.length){
            let articlesPerRow = [];

            for(let i=0; i < 3; i++){
                if(counter < this.props.articles.length)  
                    articlesPerRow.push(this.props.articles[counter]);
                else
                    articlesPerRow.push(null);
                counter++;
            }

            rowNumber++;
            allRows.push(this.oneRow(articlesPerRow, rowNumber));

        }
        return <>
            {allRows}
        </>;
    }
}

export default HomeGrid;