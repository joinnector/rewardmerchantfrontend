//from system
import React from "react";
import prop_types from "prop-types";

import constant_helper from "../../../helper/constant_helper";
import collection_helper from "../../../helper/collection_helper";

import LoginForm from "../../../component_form/auth/login_form";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class LoginComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {

		};

		this.api_open_create_logins = this.api_open_create_logins.bind(this);
		
		this.set_state = this.set_state.bind(this);
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

	api_open_create_logins(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_LOGIN_DISPATCH,
			endpoint: "api/open/login",
			params: {},
			attributes: {
				email: values.email,
				password: values.password,
			}
		};

		this.props.app_action.api_generic_post(opts, (result) => {
			if (result.meta.status === "success") {
				collection_helper.process_add_item(constant_helper.get_app_constant().NECTOR_AUTHORIZATION, result.data.auth_token);
				collection_helper.process_add_item(constant_helper.get_app_constant().NECTOR_SHARED_SECRET, result.data.shared_secret);
				this.props.history.replace("/");
			}
		});
	}

	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values
		}));
	}

	render() {
		return (<LoginForm {...this.props} state={this.state}
			api_open_create_logins={this.api_open_create_logins} />);
	}
}

LoginComponent.propTypes = properties;

export default LoginComponent;