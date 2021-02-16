//from system
import React from "react";

import prop_types from "prop-types";

import * as redux from "redux";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";

import * as  app_action from "../../store/action/app_action";

import ProfileComponent from "../../component/account/profile_component";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,
	
	kycs: prop_types.object.isRequired,
	entities: prop_types.object.isRequired,
	settings: prop_types.object.isRequired,
	uploads: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};


class ProfileContainer extends React.Component {

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
			<ProfileComponent {...this.props} />
		);
	}
}

ProfileContainer.propTypes = properties;

const map_state_to_props = state => ({
	header: state.app_reducer.header,
	systeminfos: state.app_reducer.systeminfos,
	
	kycs: state.app_reducer.kycs,
	entities: state.app_reducer.entities,
	settings: state.app_reducer.settings,
	uploads: state.app_reducer.uploads,
});

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

export default react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null, { pure: false })(ProfileContainer));