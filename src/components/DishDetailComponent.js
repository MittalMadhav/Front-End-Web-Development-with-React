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
        
        let options = { year: "numeric", month: "short", day: "numeric" };
        return x.comments.map(comment => (
        <ul key={comment.id} className="list-unstyled">
            <li className="mb-2">{comment.comment}</li>
            <li>
                -- {comment.author}{" "}
                {new Date(comment.date).toLocaleDateString("en-US", options)}
            </li>
        </ul>
      ));
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