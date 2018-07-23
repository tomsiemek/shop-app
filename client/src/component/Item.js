import  React,{Component} from 'react';
import axios from 'axios';
import { Table, Rating, Container} from 'semantic-ui-react';
import Links from '../links';
import Buttons from './Buttons';
import history from '../history';
import _ from 'lodash';
import PageContent from './PageContent';
import {Switch, Route} from 'react-router-dom';
import queryString from 'query-string';

class Item extends Component {
    constructor(props) {
        super(props);

        this.changeCurrentPage = this.changeCurrentPage.bind(this);
    }
    state = {
        data: [],
        request: '',
        currentPageNumber: 1,
        maxNumberOfPages: 0
    }

    componentDidMount() {
        let parsed = queryString.parse(this.props.location);
        console.log("Parsed: ");
        console.log(parsed);
        this.setState({request: this.props.request});
        this.getItemDataFromServer(Links.itemsPath + this.props.request + '/page/' + this.state.currentPageNumber);
    }

    transformItemDataIntoArray(data) {
        if(data.data === undefined) {
          return [];
        }
        return data.data.docs;
      }

      changeCurrentPage(newPage) {
        this.setState({currentPageNumber: newPage});
        //history.push(this.pageQuery(newPage)); //were trying to change url depending on page
        let path = Links.itemsPath + this.state.request + '/page/' + newPage; 
        console.log(path);
        this.getItemDataFromServer(path);
      }

      pageQuery(page) {
        return this.state.request + '?page=' + page;
      }
    
    getItemDataFromServer(path) {
        console.log(path);
    
        axios.get(path )
        .then(data => {console.log(data); return data;})
        .then(data_ => {this.setState({data: this.transformItemDataIntoArray(data_), maxNumberOfPages: this.getMaxNumberOfPages(data_) })});   
    
      }

      getMaxNumberOfPages(data) {
        if(data != undefined)
            return data.data.pages;
        return 0;
      }

      showResults() {
        return (
            <Table celled padded>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Price</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                    {this.state.data.map((item, key) =>
                        <Table.Row>
            <Table.Cell>
                                {item.name}
                            </Table.Cell>
                            <Table.Cell>
                                {item.price || "NO DATA :("}
                            </Table.Cell>

                        </Table.Row>)}
                </Table.Body>
            </Table>)
    }

    render() {
        console.log("IN ITEM: ");
        console.log(this.state.data);

        if(this.state.data == undefined) {
            return <div>something is no yes</div>;
        }

        return ( 
            <div>
            { PageContent(this.state.data)}
        <Buttons maxNumberOfPages={this.state.maxNumberOfPages} onClick={this.changeCurrentPage}/>

        
        </div>
        )
    }


}

export default Item;