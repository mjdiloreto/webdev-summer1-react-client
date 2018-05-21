import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class NavBar
    extends Component {
    render() {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <a className="text-white navbar-brand container-fullwidth">Course Manager</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="New Course Title"/>
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
                        <i className="fa fa-plus"/>
                    </button>
                </form>
            </nav>
        )
    }
}


