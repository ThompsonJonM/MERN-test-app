import React from 'react';
import axios from 'axios';
import ItemService from './ItemService';

export default class EditItem extends React.Component {

  constructor(props) {
      super(props);

      this.addItemService = new ItemService();
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {value: ''};
  }

  componentDidMount(){
    axios.get('http://localhost:3000/items/edit/'+this.props.match.params.id)
      .then(response => {
        this.setState({ items: response.data });
      })

      .catch(function (error) {
        console.log(error);
      })
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.addItemService.updateData(this.state.value, this.props.match.params.id);
    this.props.history.push('/index');
  }

  render() {
    return (
          <div className="container">
            <form onSubmit={this.handleSubmit}>
              <label>
                Edit Item:
                <input type="text" value={this.state.value.item}  onChange={this.handleChange} className="form-control"/>
              </label><br/>
              <input type="submit" value="Update" className="btn btn-primary"/>
            </form>
        </div>
    );
  }
}