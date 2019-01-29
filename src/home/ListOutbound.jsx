import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { convertMinsToHrsMins } from '../utils';



class ListOutbound extends Component {
  render(){
    const { flightList } = this.props
      return <div>
					{isEmpty(flightList) ? <ReactLoading className="loader" color="#1abc9c" type="spin" height={"5%"} width={"5%"} /> : flightList.outbound.map(
							(flight, index) => (
								<div key={index}>
									{flight.pricing.bestPriceAt !== "ota" &&
										flight.pricing.ota != null && (
											<div className="flight-item">
												<div className="flight-item-information">
													<div className="flight-primary-info">
														<div className="airline flight-primary-item">
															<div className="airline-name">
																{flight.airline}
															</div>
															<div className="flight-number">
																{flight.flightNumber}
															</div>
														</div>
														<div className="flight-timming flight-primary-item">
															<span className="flight-time">
																{moment(flight.departureDate).format(
																	"h:mm"
																)}
															</span>
															<span className="flight-destination">
																{flight.from}
															</span>
															<div className="flight-data">
																{moment(flight.departureDate).format(
																	"DD/MM/YY"
																)}
															</div>
														</div>
														<div className="duration flight-primary-item">
															<div className="flight-duration">
																{convertMinsToHrsMins(flight.duration)}
															</div>
															<div className="flight-stops">
																{flight.stops == 0 && "Voo direto"}
																{flight.stops == 1 && "1 parada"}
																{flight.stops > 1 &&
																	`${flight.stops} paradas`}
															</div>
														</div>
														<div className="flight-timming flight-primary-item">
															<span className="flight-time">
																{moment(flight.arriavalDate).format(
																	"h:mm"
																)}
															</span>
															<span className="flight-destination">
																{flight.to}
															</span>
															<div className="flight-data">
																{moment(flight.arrivalDate).format(
																	"DD/MM/YYYY"
																)}
															</div>
														</div>
													</div>
													<div className="luggage-wrapper">
														<div className="luggage-info">
                              <i className="icon icon-bad-on-board">  </i>
															Apenas bagagem de mão incluida
														</div>
													</div>
												</div>
												<div className="flight-item-price">
													<div className="cia-price">
														<span>{`Na ${flight.airline}`}</span>
														<span
															className={
																flight.pricing.bestPriceAt != "airline"
																	? "discount"
																	: ""
															}
														>
															{` R$${parseFloat(
																flight.pricing.airline.adult.fare
															).toFixed(2)}`}
														</span>
														<div className="highlight-price">
															<div className="price">
																<span>
																	{`R$ ${parseFloat(
																		flight.pricing.ota.adult.fare
																	).toFixed(2)}`}
																</span>
																<div className="small">
																	Ida por adulto com taxas na MaxMilhas{" "}
																</div>

																<div className="value-total-maxmilhas">
																	{`Valor total do voo de ida R$ ${
																		flight.pricing.ota.saleTotal
																	}`}
																	<div className="saving">
																		<b>
                                      {flight.pricing.savingPercentage
                                        ? `Economize ${
                                        parseFloat(flight.pricing.savingPercentage).toFixed(0)
                                        }% na MaxMilhas `
                                        : ""}
                                    </b>
																	</div>
																</div>
															</div>
														</div>
														<div>
															<button className="btn btn-buy">
																COMPRAR
															</button>
														</div>
													</div>
												</div>
											</div>
										)}
								</div>
							)
						)}
				</div>;
  }
}

const mapStateToProps = state => ({
    flightList: state.flight.flight_list
})

const mapDispatchToProp = {}

export default connect(
	mapStateToProps,
	mapDispatchToProp
)(ListOutbound);
