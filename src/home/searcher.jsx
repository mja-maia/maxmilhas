import React, { Component } from 'react'

class Searcher extends Component {

    constructor(props){
        super(props);
        this.state = { 
            tripType: "RT",
            from: "",
            to: "",
            outboundDate: '',
            inboundDate: '',
            cabin: 'EC',
            adults: 1,
            children: 0,
            infants: 0
        };

        this.handleChange = this.handleChange.bind(this)
        this.search = this.search.bind(this)
    }

    handleChange(e){
        this.setState({
            ...this.state, 
            [e.target.id]: e.target.value
        })
    }

    search(){
        console.log(this.state)
    }


    render(){
        return (
            <div className="searcher-wrapper">
                <div className="cities-searcher">
                    <div className="form-group">
                        <label htmlFor="">Sair de </label>
                        <input id="from"  type="text" onChange={this.handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Ir para</label>
                        <input id="to"  type="text" onChange={this.handleChange} />
                    </div>
                </div>

                <div className="dates-seacher">
                    <div className="form-group">
                        <label htmlFor="">Data de ida</label>
                        <input id="outboundDate" type="text" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Data de volta</label>
                        <input id="inboundDate" type="text" onChange={this.handleChange}/>
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Passageiros e classe do voo</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>

                    <button className="btn btn-search" onClick={this.search}>
                        <i className="icon-search"> </i>
                        Pesquisar passagem
                    </button>
                </div>
            </div>
        )
    }
}

export default Searcher