import React from 'react'

export default props => (
	<div className="flight-item">
		<div className="flight-item-information">
			<div className="flight-primary-info">
				<div className="airline flight-primary-item">
					<div className="airline-name">Azul</div>
					<div className="flight-number">AD2585</div>
				</div>
				<div className="flight-timming flight-primary-item">
					<span className="flight-time">22:20</span>
					<span className="flight-destination">CNF</span>
					<div className="flight-data">29/01/19</div>
				</div>
				<div className="duration flight-primary-item">
					<div className="flight-duration">01:25</div>

					<div className="flight-stops">Voo direto</div>
				</div>
				<div className="airline flight-primary-item">
					<div className="airline-name">Azul</div>
					<div className="flight-number">AD2585</div>
				</div>
			</div>
		</div>
		<div className="flight-item-price">
			<div className="cia-price">
				<span>Na AZUL</span>
				<span> R$ 614,95</span>
				<div className="highlight-price">
					<div className="price">
						<span>R$ 565,75</span>
						<div className="small">Ida por adulto com taxas na MaxMilhas </div>
					</div>
				</div>
                <div>
                    <button className="btn btn-buy">COMPRAR</button>
                </div>
			</div>
		</div>
	</div>
);