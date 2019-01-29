import axios from 'axios'
import * as actionType from '../actionTypes/flightTypes';

const BASE_URL = 'https://flight-price-hmg.maxmilhas.com.br'

export const createIntention = (formData) => {
  return dispatch => {
    axios.post(`${BASE_URL}/search?time=${Date.now()}`, formData)
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
        return dispatch({
          type: actionType.FLIGHT_SEARCHED,
          payload: resp.data
        })
      })
  }
}
