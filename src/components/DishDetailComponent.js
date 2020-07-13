import React from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import CommentForm from './CommentFormComponent';




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
        return(
            <div className = "container">

                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to='/menu'>Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {props.dish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>

                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>

                <div className = "row">

                    <div className = "col-sm-12 col-md-5 m-1">
                        {renderDish(props.dish)}
                    </div> 

                    <div className = "col-sm-12 col-md-5 m-1 align-self-center text-center  ">
                        {renderComments(props.comments)}
                        <CommentForm/>
                    </div>    

                </div>
            </div>
        );
    }

export default DishDetail;