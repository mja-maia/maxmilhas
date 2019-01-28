import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'


import Filter from './filter'
import ListItem from './listItem'
import { selectList } from './../store/actions/list'

class List extends Component {


    componentWillMount(){
        this.props.selectList('outbound')
    }

    render(){
        return (
            <div className="flights-wrapper">
                <Filter />
                <div className="tab-fligths">
                    <header className={`select-tab ${this.props.list == 'outbound' ? 'active' : 'desactive'}`} onClick={() => this.props.selectList('outbound')}>
                        <span className="select-tab-title">Selecione o voo de ida</span>
                    </header>
                    <header className={`select-tab ${this.props.list == 'inbound' ? 'active' : 'desactive'}`} onClick={() => this.props.selectList('inbound')}>
                        <span className="select-tab-title">Selecione o voo de volta</span>
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
                        <ListItem />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    list: state.list.selectedList
});

const mapDispatchToProp = dispatch => bindActionCreators({
    selectList
},dispatch);

export default connect(mapStateToProps, mapDispatchToProp)(List);
