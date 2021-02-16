/* eslint-disable indent */
import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

const initial_state = {
	mode: collection_helper.process_get_item(constant_helper.get_app_constant().NECTOR_MODE) || "prod",
	header: {
		authorization: "" || collection_helper.process_get_item(constant_helper.get_app_constant().NECTOR_AUTHORIZATION),
		shared_secret: "" || collection_helper.process_get_item(constant_helper.get_app_constant().NECTOR_SHARED_SECRET),
	},

	systeminfos: {},
	kycs: {},
	entities: {},
	settings: {},

	apis: {},
	leads: {},
	deals: {},
	tasks: {},
	swaps: {},
	coupons: {},
	wallets: {},
	wallettransactions: {},
	couponcodes: {},
	currencies: {},
	uploads: {},
	reviews: {},
	loginactivities: {},
	taskactivities: {},
	notifications: {},
	stats: {},
};

const app_reducer = (state = initial_state, action) => {
	switch (action.type) {
		case constant_helper.get_app_constant().INTERNAL_DISPATCH:
			return {
				...state,
				[action.attributes.key]: action.attributes.value
			};

		case constant_helper.get_app_constant().API_OTP_DISPATCH:
			collection_helper.show_notification("OTP Sent", "success", "OTP has been sent successfully.");
			return {
				...state,
			};

		case constant_helper.get_app_constant().API_FORGOT_PASSWORD_DISPATCH:
			collection_helper.show_notification("Password reset", "success", "Password has been changed successfully.");
			return {
				...state,
			};

		case constant_helper.get_app_constant().API_OPEN_GET_SYSTEMINFOS:
			return {
				...state,
				systeminfos: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_GET_KYC:
			return {
				...state,
				kycs: action.attributes.item || {}
			};

		case constant_helper.get_app_constant().API_MERCHANT_GET_ENTITY:
			return {
				...state,
				entities: action.attributes.item || {}
			};

		case constant_helper.get_app_constant().API_MERCHANT_GET_SETTING:
			return {
				...state,
				settings: action.attributes.item || {}
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_API_DISPATCH:
			return {
				...state,
				apis: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_LEAD_DISPATCH:
			return {
				...state,
				leads: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_DEAL_DISPATCH:
			return {
				...state,
				deals: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_TASK_DISPATCH:
			return {
				...state,
				tasks: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_SWAP_DISPATCH:
			return {
				...state,
				swaps: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_COUPON_DISPATCH:
			return {
				...state,
				coupons: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_WALLET_DISPATCH:
			return {
				...state,
				wallets: action.attributes
			};

			case constant_helper.get_app_constant().API_MERCHANT_LIST_WALLETTRANSACTION_DISPATCH:
			return {
				...state,
				wallettransactions: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_COUPONCODE_DISPATCH:
			return {
				...state,
				couponcodes: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_CURRENCY_DISPATCH:
			return {
				...state,
				currencies: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_UPLOAD_DISPATCH:
			return {
				...state,
				uploads: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_REVIEW_DISPATCH:
			return {
				...state,
				reviews: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_LOGINACTIVITY_DISPATCH:
			return {
				...state,
				loginactivities: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_TASKACTIVITY_DISPATCH:
			return {
				...state,
				taskactivities: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_NOTIFICATION_DISPATCH:
			return {
				...state,
				notifications: action.attributes
			};

		case constant_helper.get_app_constant().API_MERCHANT_LIST_STAT_DISPATCH:
			return {
				...state,
				stats: action.attributes
			};

		case constant_helper.get_app_constant().API_LOGIN_DISPATCH:
			collection_helper.show_notification("Welcome", "success", "Login has been successful.");
			return {
				...state,
				header: {
					...state.header,
					authorization: action.attributes.auth_token,
					shared_secret: action.attributes.shared_secret
				}
			};

		case constant_helper.get_app_constant().API_LOGOUT_DISPATCH:
			collection_helper.show_notification("Logout", "success", "Logout has been successful.");
			return {
				...state,
				header: {
					authorization: null,
					shared_secret: null,
				},
				entities: {},
				kycs: {}
			};

		case constant_helper.get_app_constant().API_SUCCESS_DISPATCH:
			collection_helper.show_message("Success", "success");
			return {
				...state,
			};

		case constant_helper.get_app_constant().API_IGNORE_DISPATCH:
			return {
				...state,
			};

		case constant_helper.get_app_constant().API_ERROR_DISPATCH:
			collection_helper.show_message(action.attributes.message || "Unable to process the request", "error");
			return {
				...state,
			};

		// fallback and return the state
		default:
			return {
				...state
			};
	}
};

export default app_reducer;
