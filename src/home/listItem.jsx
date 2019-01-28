import React, { Component } from 'react'
import { connect } from 'react-redux'
import ReactLoading from 'react-loading';
import moment from 'moment';
import { isEmpty } from 'ramda';
import { convertMinsToHrsMins } from '../utils';



class ListItem extends Component {
    render(){
      const { flightList } = this.props
        return  (
          <div>
            { isEmpty(flightList)
              ? <ReactLoading height={'20%'} width={'20%'} />
              : flightList.outbound.map((flight, index) => (
                  <div key={index} >
                  {
                    flight.pricing.bestPriceAt !== 'ota' &&
                    <div className="flight-item">
                    <div className="flight-item-information">
                      <div className="flight-primary-info">
                        <div className="airline flight-primary-item">
                          <div className="airline-name">{flight.airline}</div>
                          <div className="flight-number">{flight.flightNumber}</div>
                        </div>
                        <div className="flight-timming flight-primary-item">
                          <span className="flight-time">{moment(flight.departureDate).format("h:mm")}</span>
                          <span className="flight-destination">{flight.from}</span>
                          <div className="flight-data">{moment(flight.departureDate).format("DD/MM/YY")}</div>
                        </div>
                        <div className="duration flight-primary-item">
                          <div className="flight-duration">{convertMinsToHrsMins(flight.duration)}</div>

                          <div className="flight-stops">Voo direto</div>
                        </div>
                        <div className="flight-timming flight-primary-item">
                          <span className="flight-time">{moment(flight.arriavalDate).format("h:mm")}</span>
                          <span className="flight-destination">{flight.to}</span>
                          <div className="flight-data">{ moment(flight.arrivalDate).format("DD/MM/YYYY")}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flight-item-price">
                      <div className="cia-price">
                        <span>{flight.airline}</span>
                        <span> R$ { flight.pricing.airline.saleTotal }</span>
                        <div className="highlight-price">
                          <div className="price">
                            <span>R$ {flight.pricing.airline.fareTotal}</span>
                            <div className="small">Ida por adulto com taxas na MaxMilhas </div>
                          </div>
                        </div>
                        <div>
                          <button className="btn btn-buy">COMPRAR</button>
                        </div>
                      </div>
                    </div>
                  </div>
                }
              </div>
            ))
          }
        </div>
      )
    }
}

const mapStateToProps = state => ({
    flightList: state.flight.flight_list
})

const mapDispatchToProp = {}

export default connect(
	mapStateToProps,
	mapDispatchToProp
)(ListItem);
