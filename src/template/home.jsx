import React from 'react'

import Searcher from './../home/searcher'

export default props => (
	<div className="home">
		<p>
			<img
				className="banner-home"
				src={require("./../assets/imgs/bannersp.png")}
				width="565"
				height="76"
				alt="Banner Promoção Aniversário São Paulo"
			/>
		</p>
		<h1 className="title-home">Encontre passagens aéreas com desconto</h1>
		<h2 className="sub-title-home">
			Compre passagens econômicas sem precisar ter milhas
		</h2>
        <Searcher/>
	</div>
);