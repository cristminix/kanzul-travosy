import { Component } from "react"
import { Row ,Button ,Col, Toast } from "react-bootstrap"
class DisplayToast extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false, 
      title:'',
      message:'',
      type:''
    }
  }
  setParam(type,title,message,onClose){
    this.setState({type,title,message})
  }
 
  toggleShow() {
    this.setState({ show: !this.state.show })
  }
  show(){
    this.setState({ show: true })
  } 
  render() {
    const {title,message,type} = this.state
    const timeago = 'a second ago'
    return (
          <Toast show={this.state.show} onClose={e=>this.toggleShow()} style={{
      position: 'fixed',
      top: 80,
      right: 8,
      zIndex:1000
    }}>
            <Toast.Header>
              <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
              <strong className="mr-auto">{title}</strong>
              <small>{timeago}</small>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        
    )
  }
}

export default DisplayToast