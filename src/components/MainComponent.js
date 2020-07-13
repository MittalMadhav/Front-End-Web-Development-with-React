import React, { Component } from 'react';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import Contact from './ContactComponent';
import DishDetail from './DishDetailComponent';
import About from './AboutComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';


function mapStateToProps(state)
{
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  }
}


class Main extends Component {

  constructor(props) 
  {
    super(props);
  }

  render() 
  {
    const HomePage = () => {
      return(
        <Home
          dish={this.props.dishes.filter((dish) => dish.featured===true)[0]}
          promotion={this.props.promotions.filter((promo) => promo.featured===true)[0]}
          leader={this.props.leaders.filter((leader) => leader.featured===true)[0]}
        />
      );
    }

    const DishWithID  = ({match}) => {
      return(
        <DishDetail 
          dish={this.props.dishes.filter((dish) => dish.id===parseInt(match.params.currentDishId,10))[0]}
          comments={this.props.comments.filter((comment) => comment.dishId===parseInt(match.params.currentDishId,10))}
        />
      );

    }

    return (
      <div>
        <Header/>

        <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
            <Route exact path ="/menu" component={()=><Menu dishes={this.props.dishes}/>} />
            <Route path ="/menu/:currentDishId" component={DishWithID}/>
            <Route path="/contactus" component={Contact}/>
            <Redirect to="/home"/>
        </Switch>

        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(Main));