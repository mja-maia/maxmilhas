import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Redirect } from 'react-router-dom'

import Autocomplete from './../template/autocomplete'
import DatePicker, { registerLocale } from 'react-datepicker'
import ptBR from 'date-fns/locale/pt-BR'
registerLocale("pt-BR", ptBR);
import "react-datepicker/dist/react-datepicker.css";
import { formatDate } from '../utils'
import { createIntention } from "../store/actions/flights";



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
				infants: 0
			},
			inboundDateOBJ: null,
			outboundDateOBJ: new Date(),
			redirectToSearch: false,
			togglePassenger: false
		};

		this.getFromAirport = this.getFromAirport.bind(this);
		this.getToAirport = this.getToAirport.bind(this);
		this.handleOutboundDate = this.handleOutboundDate.bind(this);
		this.handleInboundDate = this.handleInboundDate.bind(this);
		this.createIntention = this.createIntention.bind(this);
		this.togglePassenger = this.togglePassenger.bind(this);
		this.handlePassengers = this.handlePassengers.bind(this);
		this.handleClickOutside = this.handleClickOutside.bind(this);
		this.setWrapperRef = this.setWrapperRef.bind(this);
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	setWrapperRef(node) {
		this.wrapperRef = node;
	}

	handleClickOutside(event) {
		if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
			// this.togglePassenger()
		}
	}

	getFromAirport(airport) {
		this.setState({
			...this.state,
			formData: {
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
				inboundDate: ""
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
		});
	}

	createIntention() {
		this.props.createIntention(this.state.formData);
		this.setState({
			...this.state,
			redirectToSearch: true
		});
	}

	togglePassenger(e) {
		this.setState({
			...this.state,
			togglePassenger: !this.state.togglePassenger
		});
	}

	handlePassengers(e) {
		this.setState({
			...this.state,
			formData: {
				...this.state.formData,
				[e.target.id]: parseInt(e.target.value)
			}
		});
	}

	showPassengerTitle(){
    const { adults, children, infants, cabin} = this.state.formData
    if(adults >= 1 && children == 0 && infants == 0){
      return (
        <div className="total-passengers-wrapper">
          <div className="total-passengers">{adults}</div>
          <div className="total-passengers-info">
            <div className="total-passengers-type">Adultos</div>
            <div className="total-passengers-cabin">
              {cabin == "EC" ? "CLASSE ECONÔMICA" : "CLASSE EXECUTIVA"}
            </div>
          </div>
        </div>
      )
    }else {
      return <div className="total-passengers-wrapper">
					<div className="total-passengers">{adults + children + infants}</div>
					<div className="total-passengers-info">
            <div className="total-passengers-type">Passageiros</div>
            <div className="total-passengers-cabin">
            {cabin == "EC" ? "CLASSE ECONÔMICA" : "CLASSE EXECUTIVA"}
            </div>
					</div>
				</div>;
    }
  }

	render() {
		const {
			from,
			to,
			outboundDate,
			inboundDate,
			adults,
			children,
			infants
		} = this.state.formData;

		if (this.state.redirectToSearch) {
			return (
				<Redirect
					to={`/busca/${from}/${to}/${outboundDate}/${inboundDate ||
						""}/${adults}/${children}/${infants}/EC`}
				/>
			);
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
							onChange={this.handleOutboundDate}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="">Data de volta</label>
						<DatePicker
							locale="pt-BR"
							dateFormat="dd/MM/yyyy"
							disabledKeyboardNavigation
							selected={this.state.inboundDateOBJ}
							minDate={this.state.outboundDateOBJ}
							onChange={this.handleInboundDate}
						/>
					</div>

					<div className="form-group">
						<label htmlFor="">Passageiros e classe do voo</label>
						<div
							onClick={this.togglePassenger}
							ref={this.setWrapperRef}
							className={`passenger-wrapper ${
								this.state.togglePassenger ? "border-green" : ""
							}`}
						>
							{this.showPassengerTitle()}
						</div>
						{this.state.togglePassenger && (
							<div className="dropdown-menu-passengers">
								<div className="passengers-info">
									<div className="form-group">
										<div className="passenger-type">Adultos</div>
										<select id="adults" onChange={this.handlePassengers}>
											<option value="1">1</option>
											<option value="2">2</option>
											<option value="3">3</option>
											<option value="4">4</option>
											<option value="5">5</option>
											<option value="6">6</option>
											<option value="7">7</option>
											<option value="8">8</option>
											<option value="9">9</option>
											<option value="10">10</option>
										</select>
									</div>
									<div className="form-group">
										<div>
											<div className="passenger-type">Crianças</div>
											<div className="small">de 2 a 11 anos</div>
										</div>
										<div className="select-passenger">
											<select id="children" onChange={this.handlePassengers}>
												<option value="0">0</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
												<option value="9">9</option>
												<option value="10">10</option>
											</select>
										</div>
									</div>
									<div className="form-group">
										<div>
											<div className="passenger-type">Bebês</div>
											<div className="small">de 0 a 23 meses</div>
										</div>
										<div className="select-passenger">
											<select id="infants" onChange={this.handlePassengers}>
												<option value="0">0</option>
												<option value="1">1</option>
												<option value="2">2</option>
												<option value="3">3</option>
												<option value="4">4</option>
												<option value="5">5</option>
												<option value="6">6</option>
												<option value="7">7</option>
												<option value="8">8</option>
												<option value="9">9</option>
												<option value="10">10</option>
											</select>
										</div>
									</div>
								</div>
								<div className="passengers-cabin">
									<div className="small-cabin">Classe do voo</div>
									<select className="select-cabin" id="cabin">
										<option value="EC">Classe econômica</option>
										<option value="EX">Classe executiva</option>
									</select>
								</div>
							</div>
						)}
					</div>

					<button className="btn btn-search" onClick={this.createIntention}>
						<i className="icon-search"> </i>
						Pesquisar passagem
					</button>
				</div>
			</div>
		);
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
