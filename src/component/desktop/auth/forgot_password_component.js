//from system
import React from "react";
import prop_types from "prop-types";

import constant_helper from "../../helper/constant_helper";

import ForgotPasswordForm from "../../component_form/auth/forgot_password_form";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class ForgotPasswordComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email_otp_requested: false,
			attributes: {
				token: "",
			}
		};

		this.api_open_create_otps = this.api_open_create_otps.bind(this);
		this.api_open_update_forgotpasswords = this.api_open_update_forgotpasswords.bind(this);

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

	api_open_create_otps(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_OTP_DISPATCH,
			endpoint: "api/open/otp",
			params: {
				email: values.email,
				purpose: "request_forgot_password_otp",
				medium: "email"
			},
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		this.props.app_action.api_generic_get(opts, (result) => {
			if (result.meta.status === "success") {
				this.set_state({
					...this.state,
					email_otp_requested: true,
					attributes: {
						...this.state.attributes,
						token: result.data.token
					}
				});
			}
		});
	}

	api_open_update_forgotpasswords(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_FORGOT_PASSWORD_DISPATCH,
			endpoint: "api/open/forgot-password",
			params: {},
			attributes: {
				email: values.email,
				password: values.password,
				confirm_password: values.confirm_password,
				otp: values.otp,
				token: this.state.attributes.token,
			}
		};

		this.props.app_action.api_generic_post(opts, (result) => {
			if (result.meta.status === "success") {
				this.props.history.replace("/login");
			}
		});
	}

	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values,
			attributes: {
				...state.attributes,
				...(values.attributes || {})
			},
		}));
	}

	render() {
		return (<ForgotPasswordForm {...this.props} state={this.state}
			api_open_update_forgotpasswords={this.api_open_update_forgotpasswords}
			api_open_create_otps={this.api_open_create_otps} />);
	}
}

ForgotPasswordComponent.propTypes = properties;

export default ForgotPasswordComponent;