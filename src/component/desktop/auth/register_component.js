//from system
import React from "react";
import prop_types from "prop-types";

import constant_helper from "../../helper/constant_helper";
import collection_helper from "../../helper/collection_helper";

import RegisterForm from "../../component_form/auth/register_form";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class RegisterComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			email_otp_requested: false,
			mobile_otp_requested: false,
			attributes: {
				email_token: "",
				mobile_token: "",
			}
		};

		this.api_open_create_accounts = this.api_open_create_accounts.bind(this);

		this.api_open_create_otps = this.api_open_create_otps.bind(this);

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

	api_open_create_accounts(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: "api/open/register",
			params: {},
			attributes: {
				...this.state.attributes,
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil)),
				profile_type: "merchant"
			}
		};

		opts.attributes.mobile = {
			mobile_code: opts.attributes.mobile_code,
			mobile: opts.attributes.mobile,
		};

		opts.attributes = collection_helper.get_lodash().omit(opts.attributes, ["mobile_code"]);
		opts.attributes = collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(opts.attributes, ["id"]), collection_helper.get_lodash().isNil), collection_helper.get_lodash().isEmpty);

		this.props.app_action.api_generic_post(opts, (result) => {
			if (result.meta.status === "success") {
				collection_helper.process_add_item(constant_helper.get_app_constant().NECTOR_AUTHORIZATION, result.data.auth_token);
				collection_helper.process_add_item(constant_helper.get_app_constant().NECTOR_SHARED_SECRET, result.data.shared_secret);
				// eslint-disable-next-line no-undef
				window.location.reload();
			}
		});
	}

	api_open_create_otps(values) {
		if (collection_helper.validate_is_null_or_undefined(values.email) === true) return null;

		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_OTP_DISPATCH,
			endpoint: "api/open/otp",
			params: {
				email: values.email,
				purpose: "request_medium_verify_otp",
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
					mobile_otp_requested: false,
					attributes: {
						...this.state.attributes,
						email_token: result.data.token
					}
				});
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
		return (<RegisterForm {...this.props} state={this.state}
			api_open_create_accounts={this.api_open_create_accounts}
			api_open_create_otps={this.api_open_create_otps} />);
	}
}

RegisterComponent.propTypes = properties;

export default RegisterComponent;