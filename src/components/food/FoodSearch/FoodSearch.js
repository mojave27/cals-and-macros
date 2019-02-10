import React, { Component } from "react";
import { Button, Input } from "semantic-ui-react";
import styles from "./FoodSearch.module.css";

class FoodSearch extends Component {
  state = {
      loading: false,
      searchValue: ''
  };

  handleInputChange = (e) => {
    this.setState({searchValue: e.target.value});
  }

  handleClick = () => {
    console.log('clicked');
    // this.setState({searchValue: e.target.value});
  };

  render() {
    return (
      <div className={styles.container}>
        <Input 
            loading={this.state.loading} 
            icon='search' 
            iconPosition='left' 
            placeholder='search...' 
            value={this.state.searchValue}
            onChange={this.handleInputChange}
            className={styles.searchInput}
        /><br />
        <Button color="orange" onClick={this.handleClick} disabled={false} >
          search
        </Button>
      </div>
    );
  }
}

export default FoodSearch;
