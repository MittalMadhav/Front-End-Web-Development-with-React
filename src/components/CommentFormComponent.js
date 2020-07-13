import React, {Component} from 'react';
import { Modal, ModalHeader, ModalBody, Input,
    Form, FormGroup, Button, Label, Row } from 'reactstrap';
import {Control, LocalForm, Errors} from 'react-redux-form';




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
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        
    }


    render()
    {
        return(
            <React.Fragment>

                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg mr-2"/>
                    Submit Comment
                </Button>

                
                <Modal isOpen={this.state.isModalOpen} >
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





export default CommentForm;
