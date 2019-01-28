import React from 'react'
import Filter from './filter'
import ListItem from './listItem'

export default props => (
    <div className="flights-wrapper">
      <Filter />
    <div className="tab-fligths">
      <header className="select-tab active">
        <span className="select-tab-title">Selecione o voo de ida</span>
      </header>
      <header className="select-tab">
        <span className="select-tab-title">Selecione o voo de ida</span>
      </header>
      <div className="header-fligths">
        <div className="header-fligths-wrapper">
          <div className="header-flight-item">Companhia</div>
          <div className="header-flight-item">Partida</div>
          <div className="header-flight-item">Duração</div>
          <div className="header-flight-item">Chegada</div>
          <div className="header-flight-item">Preço</div>
        </div>
      </div>
      <div className="list-item">
        <ListItem/>
      </div>
    </div>
  </div>
);
