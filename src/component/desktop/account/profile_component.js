//from system
import React from "react";
import prop_types from "prop-types";

import collection_helper from "../../helper/collection_helper";
import constant_helper from "../../helper/constant_helper";

import EditForm from "../../component_form/kyc/edit_form";
import ViewForm from "../../component_form/kyc/view_form";

import * as antd from "antd";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,

	kycs: prop_types.object.isRequired,
	entities: prop_types.object.isRequired,
	settings: prop_types.object.isRequired,
	uploads: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class ProfileComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drawer_visible: false,

			action: "create",
			action_item: null,

			loading: false,

			page: 1,
			limit: 20,
		};

		this.api_merchant_update_kycs = this.api_merchant_update_kycs.bind(this);
		this.api_merchant_update_submitkycs = this.api_merchant_update_submitkycs.bind(this);

		this.api_merchant_get_kycs = this.api_merchant_get_kycs.bind(this);
		this.api_merchant_get_entities = this.api_merchant_get_entities.bind(this);
		this.api_merchant_get_settings = this.api_merchant_get_settings.bind(this);

		this.on_kyc_edit = this.on_kyc_edit.bind(this);
		this.on_kyc_upload = this.on_kyc_upload.bind(this);
		this.on_kyc_submit = this.on_kyc_submit.bind(this);

		this.toggle_drawer = this.toggle_drawer.bind(this);

		this.render_drawer_action = this.render_drawer_action.bind(this);

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

	api_merchant_update_kycs(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/kycs/${this.state.action_item._id}`,
			params: {},
			has_authorization: true,
			has_signature: true,
			attributes: {
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil))
			},
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_put(opts, (result) => {
			if (result.meta.status === "success") {
				this.toggle_drawer();
				this.api_merchant_get_kycs();
			}
		});
	}

	api_merchant_update_submitkycs(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/kycs/${this.props.kycs._id}`,
			params: {},
			has_authorization: true,
			has_signature: true,
			attributes: {
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil))
			},
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_put(opts, (result) => {
			if (result.meta.status === "success") {
				this.api_merchant_get_kycs();
				this.api_merchant_get_entities();
			}
		});
	}

	api_merchant_get_kycs() {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_GET_KYC,
			endpoint: `api/v1/merchant/kycs/${collection_helper.process_new_uuid()}`,
			params: {},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {

		});
	}

	api_merchant_get_entities() {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_GET_ENTITY,
			endpoint: `api/v1/merchant/entities/${collection_helper.process_new_uuid()}`,
			params: {},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {

		});
	}

	api_merchant_get_settings() {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_GET_SETTING,
			endpoint: `api/v1/merchant/settings/${collection_helper.process_new_uuid()}`,
			params: {},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {

		});
	}

	on_kyc_edit() {
		this.set_state({ action_item: this.props.kycs, action: "edit" });
		this.toggle_drawer();
	}

	on_kyc_upload() {
		this.props.history.push(`/upload-list?parent_id=${this.props.kycs._id}&parent_type=kycs`);
	}

	on_kyc_submit() {
		this.api_merchant_update_submitkycs({ kyc_status: "uploaded" });
	}

	toggle_drawer() {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			drawer_visible: !state.drawer_visible
		}));
	}

	render_drawer_action() {
		if (this.state.action === "edit") {
			return <EditForm {...this.props} action_item={this.state.action_item} api_merchant_update_kycs={this.api_merchant_update_kycs} />;
		}
	}

	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values
		}));
	}

	render() {
		const email_verified = this.props.entities.email_status === "verified";
		const mobile_verified = this.props.entities.mobile_status === "verified";
		const kyc_verified = this.props.entities.kyc_status === "verified";

		const all_verified = email_verified && mobile_verified && kyc_verified;

		const has_kyc = Object.keys(this.props.kycs).length > 0;

		return (
			<antd.Layout>
				<antd.Card style={all_verified ? { background: "linear-gradient(to right, rgba(255,0,0,0), rgba(0,0,255,0.5)" } : { background: "linear-gradient(to right, rgba(255,0,0,0), rgba(255,0,0,0.5))" }}>
					<antd.Descriptions title={(this.props.entities.name ? "Hi, " + collection_helper.get_lodash().capitalize(this.props.entities.name) : "Hi, ")} column={2}>
						<antd.Descriptions.Item label="Country">{(this.props.entities.country ? collection_helper.get_lodash().capitalize(this.props.entities.country) : "-")}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="KYC status">{(this.props.entities.kyc_status ? collection_helper.get_lodash().capitalize(this.props.entities.kyc_status) : "-")}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Email">{(this.props.entities.email ? this.props.entities.email : "-")}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Email status">{(this.props.entities.email_status ? collection_helper.get_lodash().capitalize(this.props.entities.email_status) : "-")}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Mobile">{(this.props.entities.mobile ? this.props.entities.mobile : "-")}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Mobile status">{(this.props.entities.mobile ? collection_helper.get_lodash().capitalize(this.props.entities.mobile_status) : "-")}</antd.Descriptions.Item>
					</antd.Descriptions>
				</antd.Card>

				<div style={{ marginTop: 30 }} />

				<antd.PageHeader
					ghost={false}
					title={"KYC"}
					extra={
						(has_kyc === true && (this.props.entities.kyc_status === "pending" || this.props.entities.kyc_status === "rejected"))
							? [
								<antd.Button key="1" type="primary" onClick={this.on_kyc_edit}>Edit</antd.Button>,
								<antd.Button key="2" type="primary" onClick={this.on_kyc_upload}>Docs</antd.Button>,
								<antd.Button key="3" type="primary" onClick={this.on_kyc_submit}>Submit</antd.Button>,
							]
							: []}>

					{
						has_kyc === false
							? <antd.Typography.Paragraph> Please contact support to initialize your KYC and submit it once done. </antd.Typography.Paragraph>
							: <ViewForm {...this.props} />
					}

				</antd.PageHeader>

				<antd.Divider />

				<antd.PageHeader
					ghost={false}
					title={"SUBSCRIPTION"}
					extra={[]}>
					<antd.Descriptions title={"Plan details"} column={2}>
						<antd.Descriptions.Item label="Plan name">{this.props.settings.plan && this.props.settings.plan.name ? collection_helper.get_lodash().capitalize(this.props.settings.plan.name) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Plan type">{this.props.settings.plan && this.props.settings.plan.type ? collection_helper.get_lodash().capitalize(this.props.settings.plan.type) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Billing cycle">{this.props.settings.cycle ? collection_helper.get_lodash().capitalize(this.props.settings.cycle) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Monthly cost">{this.props.settings.plan && this.props.settings.plan.month_sell_price ? collection_helper.get_lodash().upperCase(this.props.settings.plan.currency_code) + " " + Number(this.props.settings.plan.month_sell_price) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Annual cost">{this.props.settings.plan && this.props.settings.plan.annual_sell_price ? collection_helper.get_lodash().upperCase(this.props.settings.plan.currency_code) + " " + Number(this.props.settings.plan.annual_sell_price) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Plan expires">{this.props.settings.expire ? this.props.settings.expire : "-"}</antd.Descriptions.Item>
					</antd.Descriptions>

					<antd.Descriptions title={"Plan benefits offered"} column={2}>
						<antd.Descriptions.Item label="Redeem quota">{this.props.settings.redeem_quota ? Number(this.props.settings.redeem_quota) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Reward quota">{this.props.settings.reward_quota ? Number(this.props.settings.reward_quota) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Swap quota">{this.props.settings.swap_quota ? Number(this.props.settings.swap_quota) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="User quota">{this.props.settings.lead_quota ? Number(this.props.settings.lead_quota) : "-"}</antd.Descriptions.Item>
					</antd.Descriptions>

					<antd.Descriptions title={"Plan benefits remaining"} column={2}>
						<antd.Descriptions.Item label="Remaining redeem quota">{this.props.settings.remaining_redeem_quota ? Number(this.props.settings.remaining_redeem_quota) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Remaining reward quota">{this.props.settings.remaining_reward_quota ? Number(this.props.settings.remaining_reward_quota) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Remaining swap quota">{this.props.settings.remaining_swap_quota ? Number(this.props.settings.remaining_swap_quota) : "-"}</antd.Descriptions.Item>
						<antd.Descriptions.Item label="Remaining user quota">{this.props.settings.remaining_lead_quota ? Number(this.props.settings.remaining_lead_quota) : "-"}</antd.Descriptions.Item>
					</antd.Descriptions>

				</antd.PageHeader>

				<antd.Drawer placement="right" onClose={this.toggle_drawer} visible={this.state.drawer_visible} closable={false}>
					{this.render_drawer_action()}
				</antd.Drawer>
			</antd.Layout >
		);
	}
}

ProfileComponent.propTypes = properties;

export default ProfileComponent;