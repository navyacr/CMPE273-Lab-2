import React, { Component } from 'react';
import '../../App.css';
import { Card } from 'react-bootstrap';
import 'react-dropdown/style.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { customersView , getMessages } from '../../actions/allCustomersActions';
import ReactPaginate from 'react-paginate';
import './pagination.css';

class CustomersView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 0,
      perPage: 5,
      currentPage: 0,
      pageCount: null,
      events: []

    };
    this.props.customersView();
  } 
  

  componentWillReceiveProps(props){
    console.log("Props: ", props)
    this.setState({
      ...this.state,
      events : props.user,
      outputMessages: props.messages,
      pageCount: Math.ceil(this.state.events.length / this.state.perPage)
      
    }
   );	
  }

  handlePageClick = e => {
    // alert("inside handle");
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;

    this.setState({
        currentPage: selectedPage,
        offset: offset,
        restaurantId: localStorage.getItem('restaurant_id')
    }
    );

  };
  getMessages(customerId){
    this.setState({
      selectedCustomer: customerId
  })
    this.props.getMessages({
      customerId: customerId,
      restaurantId: this.state.restaurantId

  })

  setTimeout(() => {
    let modalBody = document.getElementById("chat-modal-body");
    // modalBody.scrollTop =  modalBody.scrollHeight - modalBody.clientHeight ;
  }, 1000)

  console.log("Message:", this.props.messages)

  }

  render() {

    let chatModal = (
      <div className="modal fade" id="chatModal" tabIndex="-1" role="dialog" aria-labelledby="chatModalTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
              <div className="modal-header">
                  <h5 className="modal-title" id="chatModalTitle">Chat</h5>
                  {/* <span className="g-icon g-order-refresh fa fa-refresh" onClick={(e) => this.getMessages(this.state.selectedCustomer)} style={{left: "80px",top: "20px"}}></span> */}
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
              </button>
              </div>
              
              </div>
          </div>
  </div>);
      const count = this.state.events.length;
      const slice = this.state.events.slice(this.state.offset, this.state.offset + this.state.perPage);
      const testResult = slice.map((item,key)=>
      
        <div class="row">
          
          <Card border="info" style={{ width: '40%' }}><Card.Body> 
                              {/* <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + item._id}> */}
                                <Card.Title><b>{item.name}</b></Card.Title>
                              {/* </a> */}
                            {/* <Card.Text><b> Description: </b> {item.description}</Card.Text>
                            <Card.Text><b> Date: </b> {item.date}</Card.Text>
                            <Card.Text><b> Time: </b> {item.time}</Card.Text>
                            <Card.Text><b> Location: </b> {item.location}</Card.Text>
                            <Card.Text><b> Trending Hashtags: </b> {item.hashtags}</Card.Text> */}
                            <Card.Text> 
                            {/* <button class="btn btn-primary" value={this.props.user._id}  onClick={this.register}>Chat</button> */}
                            <div className="g-menu-image">
                                <button className="btn btn-success" data-toggle="modal" data-target="#chatModal"
                                onClick={() => this.getMessages(item._id)}>Chat with Restaurant</button>
                                {/* {this.props.messages[0].message} */}
                          </div>
                          
                          </Card.Text>
                        </Card.Body>
              
          </Card>
          {/* <div className="col-sm-6" >{item.description}</div> */}
          <br/>
          <br/>
          <br/>
        </div> 
      );
      
    //   var data = []
    //   console.log("user props", this.props.user)
    //   if (this.props.user && this.props.user.length > 0) {
    //     for (let i = 0; i < this.props.user.length; i++) {
    //             data.push(
    //                         <Card border="info" style={{ width: '40%' }}><Card.Body> 
    //                           <a style={{ cursor: 'pointer' }} href={"/oneEventView/" + this.props.user[i]._id}>
    //                             <Card.Title><b>{this.props.user[i].name}</b></Card.Title>
    //                           </a>
    //                         <Card.Text><b> Description: </b> {this.props.user[i].description}</Card.Text>
    //                         <Card.Text><b> Date: </b> {this.props.user[i].date}</Card.Text>
    //                         <Card.Text><b> Time: </b> {this.props.user[i].time}</Card.Text>
    //                         <Card.Text><b> Location: </b> {this.props.user[i].location}</Card.Text>
    //                         <Card.Text><b> Trending Hashtags: </b> {this.props.user[i].hashtags}</Card.Text>
    //                         <Card.Text> </Card.Text>
    //                     </Card.Body></Card>)
            
    //     }
    // }

    let paginationElement = (
      <ReactPaginate
        previousLabel={"← Previous"}
        nextLabel={"Next →"}
        breakLabel={<span className="gap">...</span>}
        pageCount={Math.ceil(this.state.events.length / this.state.perPage) > 1 ? Math.ceil(this.state.events.length / this.state.perPage) : 10}
        onPageChange={this.handlePageClick}
        forcePage={this.state.currentPage}
        containerClassName={"pagination"}
        previousLinkClassName={"previous_page"}
        nextLinkClassName={"next_page"}
        disabledClassName={"disabled"}
        activeClassName={"active"}
      />
    );


    return (
      <div>
        {/* {data} */}
        <div className="panel">
          {paginationElement}
          <div className="panel-body">
            {/* <div>{chatModal}</div> */}
            <div>{testResult}</div> 
          </div>
        </div>

      </div>
       
     )
  }
}



CustomersView.propTypes = {
  customersView: PropTypes.func.isRequired,
  getMessages: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired
}


const mapStateToProps = state => ({
  user: state.customersView.user,
  messages : state.getMessages.messages
});

export default connect(mapStateToProps, { customersView, getMessages })(CustomersView);