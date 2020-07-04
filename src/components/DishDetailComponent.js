import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    renderDish(dish)
    {
        if(dish != null)
        {
            return (
                
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
            );
        }

        else
        {
            return (
                <div></div>
            );
        }
    }

    renderComments(x) 
    {
        if (x == null) 
        {
            return (<div></div>)
        }


        const comm = x.comments.map((comment) => {
            return(
                <div key={comment.id}>
                    <ul className="list-unstyled">
                        <div>
                            <li>
                                {comment.comment}
                            </li>
                            <li>
                                -- {comment.author}, {(new Date(comment.date)).toDateString()}
                            </li>
                        </div>
                    </ul>
                </div>
            );
        });

        return (
            <div>
                <div><h4>Comments</h4></div>
                {comm}
            </div>
        );
    }

    render() {
        
        return(
            <div className="row">

                <div className="col-12 col-md-5 m-1">
                    {this.renderDish(this.props.currentDish)}
                </div>

                <div className="col-12 col-md-5 m-1 text-center align-self-center">
                    {this.renderComments(this.props.currentDish)}
                </div>
                
            </div>


            
        );

    }

}

export default DishDetail;