import axios from 'axios'
import * as actionType from '../actionTypes/flightTypes';

const BASE_URL = 'https://flight-price-hmg.maxmilhas.com.br'

export const createIntention = (formData) => {
  const postData = {
    tripType: "RT",
    from: "CNF", //origem
    to: "BSB", //destino
    outboundDate: "2019-02-04", //data de partida
    inboundDate: "2019-02-09", //data de volta
    cabin: "EC", //classe econômica (EC) ou executiva (EX)
    adults: 2, //adultos
    children: 1, //crianças
    infants: 0 //bebês
  }

  return dispatch => {
    axios.post(`${BASE_URL}/search?time=${Date.now()}`, postData)
      .then(resp => {
        const {id, airlines} = resp.data

        airlines.forEach((airline) => {
            if (airline.status.enable) {
              dispatch(searchFlight(id, airline))
            }
        })
      })
  }
}


export const searchFlight = (id, airline) => {
  return dispatch => {
    axios.get(`${BASE_URL}/search/${id}/flights?airline=${airline.label}`)
      .then(resp => {
        console.log(resp.data)
        return dispatch({
          type: actionType.FLIGHT_SEARCHED,
          payload: resp.data
        })
      })
  }
}
