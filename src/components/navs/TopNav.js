import React from 'react';
import './TopNav.css';

class TopNav extends React.Component {
    state = {
        menuClass: 'hide'
    }

    menuClicked = (event) => {
        console.log({ target: event.target })
        this.setState(prevState => {
            let updatedClass = prevState.menuClass;
            if (updatedClass === 'show') {
                updatedClass = 'hide';
            }
            return { menuClass: updatedClass }
        })
    }

    render() {
        let ddClasses = this.state.menuClass + " dropdownContent";
        return (
            <ul onClick={this.menuClicked}>
                <li><a href="#home">Home</a></li>
                <li><a href="#news">News</a></li>
                <li className="dropdown">
                    <a href="javascript:void(0)" className="dropbtn">Dropdown</a>
                    <div className={ddClasses} >
                        <a href="#">Link 1</a>
                        <a href="#">Link 2</a>
                        <a href="#">Link 3</a>
                    </div>
                </li>
            </ul>
        )
    }
}

export default TopNav;