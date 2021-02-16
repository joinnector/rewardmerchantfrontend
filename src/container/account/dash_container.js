//from system
import React from "react";

import prop_types from "prop-types";

import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

import collection_helper from "../../helper/collection_helper";

import * as  app_action from "../../store/action/app_action";

import DashComponent from "../../component/account/dash_component";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};


class DashContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			params: collection_helper.process_url_params(this.props.location.search)
		};
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
		const component_view = this.state.params.get("view") === "mobile" ? <DashComponent {...this.props} /> : <DashComponent {...this.props} />;
		return component_view;
	}
}

DashContainer.propTypes = properties;

const map_state_to_props = state => ({
	header: state.app_reducer.header,
});

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

export default react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null, { pure: false })(DashContainer));