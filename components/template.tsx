import React, { Component } from 'react';
import { NavLink } from 'react-bootstrap';
class TemplateComponentDynamic extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            id: null,
            newpage: '',
        };

        this.refresh = this.refresh.bind(this);
    }
    
    refresh() {
        const urlParams = new URLSearchParams(window.location.search);
        const getid = urlParams.get('id');
        this.setState({ id: getid });
    }
    
    componentWillMount() {
        // axios commands to get navigation bar setting it newpage state
        this.refresh();
    }
    
    render() {
        /*const id = this.state.id;
        const newpage = this.state.newpage.map(o => (
            <NavLink href={'/Home?id=' + o.id} onClick={this.refresh}>
                {o.name}
            </NavLink>
        ));*/
            let id='';
        return (
            <div>
                {id != null ? 
                    <NavLink href={'/Home?id=' + id}>
                        <button>Change page</button>
                    </NavLink>
                : null}
            </div>
        );
    }

    
    componentDidMount() {
        alert('Page Monted Successfully');
    }
}