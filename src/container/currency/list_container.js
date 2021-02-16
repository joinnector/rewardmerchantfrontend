//from system
import React from "react";

import prop_types from "prop-types";

import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

import * as  app_action from "../../store/action/app_action";

import CurrencyListComponent from "../../component/currency/list_component";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,
	currencies: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};


class CurrencyListContainer extends React.Component {

	constructor(props) {
		super(props);
	}

	// mounted
	componentDidMount() {

	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	render() {
		return (
			<CurrencyListComponent {...this.props} />
		);
	}
}

CurrencyListContainer.propTypes = properties;

const map_state_to_props = state => ({
	header: state.app_reducer.header,
	systeminfos: state.app_reducer.systeminfos,
	currencies: state.app_reducer.currencies,
});

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

export default react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null, { pure: false })(CurrencyListContainer));