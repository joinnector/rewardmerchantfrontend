/* eslint-disable indent */
import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

import axios_wrapper from "../../wrapper/axios_wrapper";
import security_wrapper from "../../wrapper/security_wrapper";

export const dispatch_action = (type, attributes = null) => {
	if (collection_helper.validate_is_null_or_undefined(attributes) === true) return { type };
	else return { type, attributes };
};

export const internal_generic_dispatch = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		if (collection_helper.validate_not_null_or_undefined(notify_callback) === true) notify_callback(opts);
		dispatch(dispatch_action(opts.event, { ...collection_helper.get_lodash().omit(opts, ["event"]) }));
	};
};

export const api_generic_post = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = getState().app_reducer.mode === "prod" ? collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_PROD_URL]) : collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_DEV_URL]);

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().app_reducer.header.authorization;
		if (opts.has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(collection_helper.process_serialize_data(opts.attributes), getState().app_reducer.header.shared_secret);
		if (opts.file) opts.attributes.file = opts.file;

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_post(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params, opts.attributes);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, dispatch, error, notify_callback);
		}
	};
};

export const api_generic_get = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = getState().app_reducer.mode === "prod" ? collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_PROD_URL]) : collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_DEV_URL]);

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().app_reducer.header.authorization;

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_get(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, dispatch, error, notify_callback);
		}
	};
};

export const api_generic_put = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = getState().app_reducer.mode === "prod" ? collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_PROD_URL]) : collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_DEV_URL]);

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().app_reducer.header.authorization;
		if (opts.has_signature) headers["x-signature"] = security_wrapper.get_wrapper().process_hmac_signature(collection_helper.process_serialize_data(opts.attributes), getState().app_reducer.header.shared_secret);

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_put(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params, opts.attributes);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, dispatch, error, notify_callback);
		}
	};
};

export const api_generic_delete = (opts, notify_callback = null) => {
	// eslint-disable-next-line no-unused-vars
	return async (dispatch, getState) => {
		const headers = {
			...constant_helper.get_app_constant().API_BASE_HEADER,
			...(opts.headers || {})
		};

		const base_url = getState().app_reducer.mode === "prod" ? collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_PROD_URL]) : collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_DEV_URL]);

		if (opts.has_authorization) headers.authorization = "Bearer " + getState().app_reducer.header.authorization;

		try {
			const result = await axios_wrapper.get_wrapper().process_axios_delete(collection_helper.process_key_join([base_url, opts.endpoint], "/"), headers, opts.params);
			// eslint-disable-next-line no-use-before-define
			api_base_dispatch(opts.event, dispatch, result, notify_callback);
		} catch (error) {
			// eslint-disable-next-line no-use-before-define
			api_base_error_dispatch(opts.event, dispatch, error, notify_callback);
		}
	};
};

const api_base_dispatch = (event, dispatch, result, notify_callback) => {
	if (result.meta.status === "error") {
		// eslint-disable-next-line no-use-before-define
		api_base_error_dispatch(event, dispatch, result, notify_callback);
	} else {
		// eslint-disable-next-line no-use-before-define
		api_base_success_dispatch(event, dispatch, result, notify_callback);
	}
};

const api_base_success_dispatch = (event, dispatch, result, notify_callback) => {
	if (collection_helper.validate_not_null_or_undefined(notify_callback) === true) notify_callback(result);
	dispatch(dispatch_action(event, result.data));
};

const api_base_error_dispatch = (event, dispatch, result, notify_callback) => {
	const meta = (result && result.response && result.response.data && result.response.data.meta) || {};
	const data = (result && result.response && result.response.data && result.response.data.data) || {};
	const code = (result && result.response && result.response.data && result.response.data.meta && result.response.data.meta.code) || 400;

	if (collection_helper.validate_not_null_or_undefined(notify_callback) === true) notify_callback({ data: data, meta: meta });
	if (code === 401) {
		collection_helper.process_delete_items();
		dispatch(dispatch_action(constant_helper.get_app_constant().API_LOGOUT_DISPATCH, data));
	} else {
		dispatch(dispatch_action(constant_helper.get_app_constant().API_ERROR_DISPATCH, data));
	}
};