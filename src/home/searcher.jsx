import React, { Component } from 'react'

class Searcher extends Component {
    render(){
        return (
            <div className="searcher-wrapper">
                <div className="searcher-form">
                    <div className="form-group">
                        <label htmlFor="">Sair de </label>
                        <input type="text" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Ir para</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        )
    }
}

export default Searcher