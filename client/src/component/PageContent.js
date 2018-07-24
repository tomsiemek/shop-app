import React from 'react';
import {Image, Button, Card} from 'semantic-ui-react';
import errorImage from '../images/sadFace.png';

const PageContent = (data) => {

    if (data.length === 0) {
        return <div> NOTHING HERE :/</div>
    }

    console.log("IN PAGECONTENT: ");
    console.log(data);

    if (data.data !== undefined) {
         data = data.data;
    }




    return (
        <Card.Group stackable itemsPerRow = {5}>
        {data.map( item =>
        <Card>
            <Image src={item.imageUrl || errorImage} onError={(e)=>{e.target.src=errorImage}} />
            <Card.Content>
                <Card.Header>{item.name}</Card.Header>
                <Card.Meta>
                    <span className='date'>{item.producer}</span>
                </Card.Meta>
                <Card.Description> {item.price || "n/d"} PLN  <br/> Amount: {item.amount || "n/d"} </Card.Description>
            </Card.Content>
            <Card.Content extra>
        <div className='ui two buttons'>
          <Button basic color='blue'>
            BUY
          </Button>
        </div>
      </Card.Content>
        </Card>
        )}
        </Card.Group>
    );
}

export default PageContent;