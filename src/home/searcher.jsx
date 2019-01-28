import React, { Component } from 'react'
import axios from 'axios'

import Autocomplete from './../template/autocomplete'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
registerLocale("pt-BR", ptBR);
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from './../utils/utils'


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
		};

		this.getFromAirport = this.getFromAirport.bind(this);
		this.getToAirport = this.getToAirport.bind(this);
		this.handleOutboundDate = this.handleOutboundDate.bind(this);
		this.handleInboundDate = this.handleInboundDate.bind(this);
		this.search = this.search.bind(this);
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
        console.log(this.state);
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

	search() {
		const SEARCH_FLIGHTS_API = 'https://flight-price-hmg.maxmilhas.com.br'
		const postData = {
		    tripType: "RT",
		    from: "REC",  //origem
		    to: "RIO",  //destino
		    outboundDate: "2019-02-04", //data de partida
		    inboundDate: "2019-02-09", //data de volta
		    cabin: "EC", //classe econômica (EC) ou executiva (EX)
		    adults: 2, //adultos
		    children: 1, //crianças
		    infants: 0 //bebês
		}
		axios.post(`${SEARCH_FLIGHTS_API}/search?time=${Date.now()}`, postData)
		    .then(resp => console.log('resp', resp))

		console.log(this.state);
	}

	render() {
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

					<button className="btn btn-search" onClick={this.search}>
						<i className="icon-search"> </i>
						Pesquisar passagem
					</button>
				</div>
			</div>
		);
	}
}

export default Searcher