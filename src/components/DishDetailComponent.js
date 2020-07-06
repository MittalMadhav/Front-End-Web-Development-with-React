import React from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle} from 'reactstrap'



    function renderDish(dish)
    {
        if(dish!=null)
        {
            return(
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle heading>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>     
                    </Card>
            );
        }

        else
        {
            return(<div></div>);
        }
    }


    function renderComments(comments)
    {
        if (comments == null) 
        {
          return(<div></div>)
        }

        else
        {
            const cmnts = comments.map(comment =>{
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>
                            -- {comment.author}, 
                            { 
                            new Intl.DateTimeFormat('en-US',
                            {year: 'numeric',
                            month: 'short',
                            day: '2-digit' }).format(new Date(comment.date))
                            }
                        </p>
                    </li>
                )
             })
    
            return(
                <div>
                    <h4>Comments</h4>
                        <ul className ="list-unstyled">
                        {cmnts}
                    </ul>
                </div>
                 );
        }

    }


    function DishDetail(props)
    {
        const detail = props.dish;

        if(detail == null)
        {
          return(<div></div>);
        }
            
        return(
            <div className = "container">
                <div className = "row">

                    <div className = "col-sm-12 col-md-5 m-1">
                        {renderDish(detail)}
                    </div> 

                    <div className = "col-sm-12 col-md-5 m-1 align-self-center text-center  ">
                        {renderComments(detail.comments)}
                    </div>    

                </div>
            </div>
        );
    }

export default DishDetail;