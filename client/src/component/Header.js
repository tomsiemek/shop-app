import React, {Component} from 'react';
import { Link } from 'react-router-dom'
import Links from '../links';
import Searchbar from './Searchbar';


const names = {
    home: "Home",
    tvs: "Tvs",
    phones: "Phones",
    watches: "Watches"
}

class Header extends Component {


    render() {
        return (

            <nav className="Navbar" >
                <ul className="Navbar">
                    <li className="Navbar"><Link to={Links.homePath}>{names.home}</Link></li>
                    <li className="Navbar"><Link to={Links.tvsPath}>{names.tvs}</Link></li>
                    <li className="Navbar"><Link to={Links.phonesPath}>{names.phones}</Link></li>
                    <li className="Navbar"><Link to={Links.watchesPath}>{names.watches}</Link></li>
                </ul>
            </nav>

        );
    }
}

export default Header;