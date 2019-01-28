import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

import Autocomplete from './../template/autocomplete'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
registerLocale("pt-BR", ptBR);
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from './../utils/utils'
import { createIntention } from "./searcherAction";



class Searcher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			airports: require("./../assets/airports.json")["airports"],
			formData: {
                tripType: "RT",
                from: "",
                to: "",
                outboundDate: formatDate(new Date()),
                inboundDate: "",
                cabin: "EC",
                adults: 1,
                children: 0,
                infants: 0,
            },
            inboundDateOBJ: null,
            outboundDateOBJ: new Date(),
            redirectToSearch: false
		};

		this.getFromAirport = this.getFromAirport.bind(this);
		this.getToAirport = this.getToAirport.bind(this);
		this.handleOutboundDate = this.handleOutboundDate.bind(this);
		this.handleInboundDate = this.handleInboundDate.bind(this);
		this.createIntention = this.createIntention.bind(this);
	}

	getFromAirport(airport) {
		this.setState({
            ...this.state,
            formData:{
                ...this.state.formData,
                from: airport
            }
		});
	}

	getToAirport(airport) {
		if (this.state.formData.from === airport) {
			//TODO EXIBIR ERRO DE AEROPORTOS IGUAIS
			console.log("aeroportos iguais.");
		}
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                to: airport
            }
        });
	}

    handleOutboundDate(date) {
        this.setState({
            ...this.state,
            outboundDateOBJ: new Date(date),
            inboundDateOBJ: null,
            formData: {
                ...this.state.formData,
                outboundDate: formatDate(date),
                inboundDate: ''
            }
        });
    }

	handleInboundDate(date) {
        this.setState({
            ...this.state,
            inboundDateOBJ: new Date(date),
            formData: {
                ...this.state.formData,
                inboundDate: formatDate(date)
            }
        })
    }

    createIntention() {
        this.props.createIntention(this.state.formData)
        this.setState({
            ...this.state,
            redirectToSearch: true
        })
	}

	render() {
        if(this.state.redirectToSearch){
            return <Redirect to="/busca"/>
        }
        return (
            <div className="searcher-wrapper">
                <div className="cities-searcher">
                    <div className="form-group">
                        <label htmlFor="">Sair de </label>
                        <Autocomplete
                            handleClick={this.getFromAirport}
                            suggestions={this.state.airports}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="">Ir para</label>
                        <Autocomplete
                            handleClick={this.getToAirport}
                            suggestions={this.state.airports}
                        />
                    </div>
                </div>

                <div className="dates-seacher">
                    <div className="form-group">
                        <label htmlFor="">Data de ida</label>
                        <DatePicker
                            dateFormat="dd/MM/yyyy"
                            disabledKeyboardNavigation
                            selected={this.state.outboundDateOBJ}
                            locale="pt-BR"
                            minDate={new Date()}
                            onChange={this.handleOutboundDate} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Data de volta</label>
                        <DatePicker
                            locale="pt-BR"
                            dateFormat="dd/MM/yyyy"
                            disabledKeyboardNavigation
                            selected={this.state.inboundDateOBJ}
                            minDate={this.state.outboundDateOBJ}
                            onChange={this.handleInboundDate} />
                    </div>

                    <div className="form-group">
                        <label htmlFor="">Passageiros e classe do voo</label>
                        <input type="text" onChange={this.handleChange} />
                    </div>

                    <button className="btn btn-search" onClick={this.createIntention}>
                        <i className="icon-search"> </i>
                        Pesquisar passagem
					</button>
                </div>
            </div>
        )
	}
}

const mapDispatchToProps = dispatch =>
	bindActionCreators(
		{
			createIntention
		},
		dispatch
	);

export default connect(null, mapDispatchToProps)(Searcher)