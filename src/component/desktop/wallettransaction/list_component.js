//from system
import React from "react";
import prop_types from "prop-types";

import collection_helper from "../../../helper/collection_helper";
import constant_helper from "../../../helper/constant_helper";

import CreateForm from "../../../component_form/wallettransaction/create_form";
import EditForm from "../../../component_form/wallettransaction/edit_form";
import ViewForm from "../../../component_form/wallettransaction/view_form";
import FilterForm from "../../../component_form/wallettransaction/filter_form";

import * as antd from "antd";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,
	wallettransactions: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class WalletTransactionListComponent extends React.Component {
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

		this.api_merchant_create_wallettransactions = this.api_merchant_create_wallettransactions.bind(this);
		this.api_merchant_get_wallettransactions = this.api_merchant_get_wallettransactions.bind(this);
		this.api_merchant_update_wallettransactions = this.api_merchant_update_wallettransactions.bind(this);
		this.api_merchant_list_wallettransactions = this.api_merchant_list_wallettransactions.bind(this);

		this.process_list_data = this.process_list_data.bind(this);
		this.process_list_column = this.process_list_column.bind(this);

		this.on_create = this.on_create.bind(this);
		this.on_edit = this.on_edit.bind(this);
		this.on_view = this.on_view.bind(this);
		this.on_filter = this.on_filter.bind(this);
	
		this.toggle_drawer = this.toggle_drawer.bind(this);

		this.render_drawer_action = this.render_drawer_action.bind(this);

		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		this.api_merchant_list_wallettransactions({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	api_merchant_create_wallettransactions(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: "api/v1/merchant/wallettransactions",
			params: {},
			has_authorization: true,
			has_signature: true,
			attributes: {
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["id"]), collection_helper.get_lodash().isNil))
			},
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_post(opts, (result) => {
			if (result.meta.status === "success") {
				this.api_merchant_list_wallettransactions({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_update_wallettransactions(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/wallettransactions/${this.state.action_item._id}`,
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
				this.api_merchant_list_wallettransactions({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_get_wallettransactions(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: `api/v1/merchant/wallettransactions/${values._id}`,
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

	api_merchant_list_wallettransactions(values) {
		this.set_state({ page: values.page || 1, limit: values.limit || 20 });

		if (this.state.action === "filter"
			&& Object.keys(collection_helper.get_lodash().omit(values, ["page", "limit", "sort", "sort_op"])).length > 0) {
			this.set_state({ drawer_visible: false });
		}

		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_LIST_WALLETTRANSACTION_DISPATCH,
			endpoint: "api/v1/merchant/wallettransactions",
			has_authorization: true,
			params: {
				page: values.page || 1,
				limit: values.limit || 20,
				sort: values.sort || "updated_at",
				sort_op: values.sort_op || "DESC",
				...collection_helper.process_nullify(collection_helper.get_lodash().omitBy(collection_helper.get_lodash().omit(values, ["page", "limit", "sort", "sort_op"]), collection_helper.get_lodash().isNil), true)
			},
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts);
	}

	process_list_data() {
		return (this.props.wallettransactions && this.props.wallettransactions.items || []).map(item => ({ ...item, key: item._id }));
	}

	process_list_column() {
		return [
			// eslint-disable-next-line no-unused-vars
			{ title: "Wallet id", dataIndex: "wallet_id", key: "wallet_id", render: (text, record) => <antd.Typography.Paragraph>{record.wallet_id}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Lead id", dataIndex: "lead_id", key: "lead_id", render: (text, record) => <antd.Typography.Paragraph>{record.lead_id}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Amount", dataIndex: "amount", key: "amount", render: (text, record) => <antd.Typography.Paragraph>{Number(record.amount)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Operation", dataIndex: "operation", key: "operation", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().upperCase(record.operation)}</antd.Typography.Paragraph> },
			{
				// eslint-disable-next-line no-unused-vars
				title: "Action", key: "action", render: (text, record) => {
					return (
						<antd.Space size="middle">
							<a onClick={() => this.on_edit(record)}>Edit</a>
							<a onClick={() => this.on_view(record)}>View</a>
						</antd.Space>
					);
				}
			},
		];
	}

	on_create() {
		this.set_state({ action: "create" });
		this.toggle_drawer();
	}

	on_edit(record) {
		this.set_state({ action_item: record, action: "edit" });
		this.toggle_drawer();
	}

	on_view(record) {
		this.set_state({ action_item: record, action: "view" });
		this.toggle_drawer();
	}

	on_filter() {
		this.set_state({ action: "filter" });
		this.toggle_drawer();
	}

	toggle_drawer() {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			drawer_visible: !state.drawer_visible
		}));
	}

	render_drawer_action() {
		if (this.state.action === "create") {
			return <CreateForm {...this.props} api_merchant_create_wallettransactions={this.api_merchant_create_wallettransactions} />;
		} else if (this.state.action === "edit") {
			return <EditForm {...this.props} action_item={this.state.action_item} api_merchant_update_wallettransactions={this.api_merchant_update_wallettransactions} />;
		} else if (this.state.action === "view") {
			return <ViewForm {...this.props} action_item={this.state.action_item} />;
		} else if (this.state.action === "filter") {
			return <FilterForm {...this.props} api_merchant_list_wallettransactions={this.api_merchant_list_wallettransactions} />;
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
		const dataSource = this.process_list_data();
		const columns = this.process_list_column();
		const count = (this.props.wallettransactions && this.props.wallettransactions.count || 0);

		return (
			<antd.Layout>
				<antd.PageHeader
					ghost={false}
					title="Wallet Transactions"
					// subTitle="This is a subtitle"
					extra={[
						<antd.Button key="1" type="primary" onClick={this.on_create}>Create</antd.Button>,

						<antd.Button key="2" type="default" onClick={this.on_filter}>Filter</antd.Button>
					]}>

					<antd.Table
						dataSource={dataSource}
						columns={columns}
						size="middle"
						bordered={false}
						pagination={{
							onChange: (page) => {
								if (!this.state.loading) this.api_merchant_list_wallettransactions({ page: page });
							},
							current: this.state.page,
							total: count,
							pageSize: 20,
						}} />

				</antd.PageHeader>

				<antd.Drawer placement="right" onClose={this.toggle_drawer} visible={this.state.drawer_visible} closable={false}>
					{this.render_drawer_action()}
				</antd.Drawer>


			</antd.Layout>
		);
	}
}

WalletTransactionListComponent.propTypes = properties;

export default WalletTransactionListComponent;