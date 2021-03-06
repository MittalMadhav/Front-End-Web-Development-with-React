import React,{Component} from 'react';
import {Card,CardImg,CardText,CardBody,CardTitle, Breadcrumb, BreadcrumbItem,
        Button,Modal,ModalHeader,ModalBody,Label,FormGroup}from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from "react-redux-form";
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';





function renderDish(dish)
{
    if(dish!=null)
    {
        return(
            <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
            <Card>
                <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
            </FadeTransform>
        );
    }

    else
    {
        return(<div></div>);
    }
}


function RenderComments({comments, postComment, currentDishId})
{
    if (comments == null) 
    {
        return(<div></div>)
    }

    else
    {
        const cmnts = comments.map(comment =>{
            return(
                <Fade in>
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
                </Fade>
            )
            })

        return(
            <div>
                <h4>Comments</h4>
                <ul className ="list-unstyled">
                    <Stagger in>
                        {cmnts}
                    </Stagger>
                </ul>
                <CommentForm currentDishId={currentDishId} postComment={postComment}/>
            </div>
        );
    }

}








const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

class CommentForm extends Component
{
    constructor (props)
    {
        super(props);
        
        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal()
    {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit(values) 
    {
        this.toggleModal();
        this.props.postComment(this.props.currentDishId, values.rating, values.author, values.comment);
    }


    render()
    {
        return(
            <React.Fragment>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg mr-2"/>
                    Submit Comment
                </Button>

                
                <Modal isOpen={this.state.isModalOpen}  toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>

                            <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>

                                <FormGroup>
                                    <Label htmlFor="rating">Rating</Label>
                                    <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>                           
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="author">Your Name</Label>
                                    <Control.text model=".author" id="author" name="author" placeholder="Your Name" className="form-control"
                                        validators={{
                                            minLength: minLength(3), 
                                            maxLength: maxLength(15)}}
                                    />
                                    <Errors className="text-danger" model=".author" show="touched"   
                                                messages={{
                                                    minLength: 'Must be greater than or equal to 3 characters',
                                                    maxLength: 'Must be 15 characters or less'
                                                }}
                                    />   
                                </FormGroup>

                                <FormGroup>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Control.textarea model=".comment" rows ="6" name="comment" id="comment" className="form-control"
                                            innerRef={(input) => this.remember=input}/>
                                </FormGroup>

                                <FormGroup>
                                    <Button type="submit" value="submit" color="primary">
                                        Submit
                                    </Button>
                                </FormGroup>

                            </LocalForm>

                    </ModalBody>
                </Modal>

            </React.Fragment>
        );
    }

}





function DishDetail(props)
{        
    
    if(props.isLoading)
    {
        return (
            <div className="container">
                <div className="row">
                    <Loading/>
                </div>
            </div>
        );
    }

    else if (props.errMess)
    {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }


    else if (props.dish != null)
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
                        <RenderComments comments={props.comments} postComment={props.postComment} currentDishId={props.dish.id}/>                       
                    </div>    
    
                </div>
            </div>
        );
    }

    else
        return (
            <div></div>
        );
}


export default DishDetail;