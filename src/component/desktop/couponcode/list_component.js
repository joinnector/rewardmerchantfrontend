//from system
import React from "react";
import prop_types from "prop-types";

import collection_helper from "../../../helper/collection_helper";
import constant_helper from "../../../helper/constant_helper";

import BulkGenerateForm from "../../../component_form/couponcode/bulkgenerate_form";
import BulkUploadForm from "../../../component_form/couponcode/bulkupload_form";
import CreateForm from "../../../component_form/couponcode/create_form";
import EditForm from "../../../component_form/couponcode/edit_form";
import ViewForm from "../../../component_form/couponcode/view_form";
import FilterForm from "../../../component_form/couponcode/filter_form";

import * as antd from "antd";
import * as antd_icons from "@ant-design/icons";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,
	couponcodes: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class CouponCodeListComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drawer_visible: false,

			action: "create",
			action_item: null,

			loading: false,

			page: 1,
			limit: 20,

			list: []
		};

		this.list_change = this.list_change.bind(this);

		this.api_merchant_create_generatecouponcodes = this.api_merchant_create_generatecouponcodes.bind(this);
		this.api_merchant_create_bulkcouponcodes = this.api_merchant_create_bulkcouponcodes.bind(this);
		this.api_merchant_create_couponcodes = this.api_merchant_create_couponcodes.bind(this);
		this.api_merchant_get_couponcodes = this.api_merchant_get_couponcodes.bind(this);
		this.api_merchant_update_couponcodes = this.api_merchant_update_couponcodes.bind(this);
		this.api_merchant_delete_couponcodes = this.api_merchant_delete_couponcodes.bind(this);
		this.api_merchant_delete_couponcodes_by_deal_id = this.api_merchant_delete_couponcodes_by_deal_id.bind(this);
		this.api_merchant_list_couponcodes = this.api_merchant_list_couponcodes.bind(this);

		this.process_list_data = this.process_list_data.bind(this);
		this.process_list_column = this.process_list_column.bind(this);

		this.on_bulkgenerate = this.on_bulkgenerate.bind(this);
		this.on_bulkupload = this.on_bulkupload.bind(this);
		this.on_create = this.on_create.bind(this);
		this.on_edit = this.on_edit.bind(this);
		this.on_delete = this.on_delete.bind(this);
		this.on_delete_by_deal_id = this.on_delete_by_deal_id.bind(this);
		this.on_view = this.on_view.bind(this);
		this.on_filter = this.on_filter.bind(this);

		this.toggle_drawer = this.toggle_drawer.bind(this);

		this.render_drawer_action = this.render_drawer_action.bind(this);

		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	list_change(list) {
		this.set_state({ list: list });
	}

	api_merchant_create_generatecouponcodes(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: "api/v1/merchant/generatecouponcodes",
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
				this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_create_bulkcouponcodes(values) {
		this.state.list.map((x, index) => {
			// eslint-disable-next-line no-unused-vars
			const opts = {
				event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
				endpoint: "api/v1/merchant/bulkcouponcodes",
				params: {},
				has_authorization: true,
				has_signature: true,
				attributes: {
					...collection_helper.get_lodash().omitBy(values, collection_helper.get_lodash().isNil),
					file: "",
				},
				file: x.originFileObj,
				headers: {
					"content-type": "multipart/form-data",
				}
			};

			// eslint-disable-next-line no-unused-vars
			this.props.app_action.api_generic_post(opts, (result) => {
				if (result.meta.status === "success" && index === this.state.list.length - 1) {
					this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
				}
			});
		});
	}

	api_merchant_create_couponcodes(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: "api/v1/merchant/couponcodes",
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
				this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_update_couponcodes(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/couponcodes/${this.state.action_item._id}`,
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
				this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_delete_couponcodes(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/couponcodes/${values._id}`,
			params: {},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_delete(opts, (result) => {
			if (result.meta.status === "success") {
				this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_delete_couponcodes_by_deal_id(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/couponcodes/${values._id}`,
			params: { deal_id: values.deal_id },
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_delete(opts, (result) => {
			if (result.meta.status === "success") {
				this.api_merchant_list_couponcodes({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_get_couponcodes(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: `api/v1/merchant/couponcodes/${values._id}`,
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

	api_merchant_list_couponcodes(values) {
		this.set_state({ page: values.page || 1, limit: values.limit || 20 });

		if (this.state.action === "filter"
			&& Object.keys(collection_helper.get_lodash().omit(values, ["page", "limit", "sort", "sort_op"])).length > 0) {
			this.set_state({ drawer_visible: false });
		}

		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_LIST_COUPONCODE_DISPATCH,
			endpoint: "api/v1/merchant/couponcodes",
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
		return (this.props.couponcodes && this.props.couponcodes.items || []).map(item => ({ ...item, key: item._id }));
	}

	process_list_column() {
		const popover_content = (record) => {
			return (
				<div style={{ display: "block" }}>
					<p><a onClick={() => this.on_delete_by_deal_id(record, "deal_id")}>Delete all available coupon codes of this deal </a></p>
				</div>
			);
		};

		return [
			// eslint-disable-next-line no-unused-vars
			{ title: "Deal id", dataIndex: "deal_id", key: "deal_id", render: (text, record) => <antd.Typography.Paragraph>{record.deal_id}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Code", dataIndex: "code", key: "code", render: (text, record) => <antd.Typography.Paragraph>{record.code}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Available", dataIndex: "is_available", key: "is_available", render: (text, record) => <antd.Typography.Paragraph>{String(record.is_available)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Referenec id", dataIndex: "base_reference_id", key: "base_reference_id", render: (text, record) => <antd.Typography.Paragraph>{(record.base_reference_id ? record.base_reference_id : "-")}</antd.Typography.Paragraph> },
			{
				// eslint-disable-next-line no-unused-vars
				title: "Action", key: "action", render: (text, record) => {
					return (
						<antd.Space size="middle">
							<a onClick={() => this.on_edit(record)}>Edit</a>
							<a onClick={() => this.on_view(record)}>View</a>
							<a onClick={() => this.on_delete(record)}>Delete</a>
							<antd.Popover content={popover_content(record)} title="More" trigger="click">
								<antd_icons.MenuOutlined style={{ color: "#1890ff" }} />
							</antd.Popover>
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

	on_bulkgenerate() {
		this.set_state({ action: "bulkgenerate" });
		this.toggle_drawer();
	}

	on_bulkupload() {
		this.set_state({ action: "bulkupload" });
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

	on_delete(record) {
		const _this = this;
		// todo show popoup and call the api
		antd.Modal.confirm({
			title: "Delete", content: "Delete Coupon code?", okText: "Confirm",
			okType: "default", cancelText: "Cancel",
			onOk() {
				_this.api_merchant_delete_couponcodes(record);
			}
		});
	}

	on_delete_by_deal_id(record) {
		const _this = this;
		// todo show popoup and call the api
		antd.Modal.confirm({
			title: "Delete", content: "Delete all available coupon codes of this deal?", okText: "Confirm",
			okType: "default", cancelText: "Cancel",
			onOk() {
				_this.api_merchant_delete_couponcodes_by_deal_id(record);
			}
		});
	}

	toggle_drawer() {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			drawer_visible: !state.drawer_visible,
		}));
	}

	render_drawer_action() {
		if (this.state.action === "create") {
			return <CreateForm {...this.props} api_merchant_create_couponcodes={this.api_merchant_create_couponcodes} />;
		} else if (this.state.action === "bulkgenerate") {
			return <BulkGenerateForm {...this.props} api_merchant_create_generatecouponcodes={this.api_merchant_create_generatecouponcodes} />;
		} else if (this.state.action === "bulkupload") {
			return <BulkUploadForm {...this.props} api_merchant_create_bulkcouponcodes={this.api_merchant_create_bulkcouponcodes} list_change={this.list_change} />;
		} else if (this.state.action === "edit") {
			return <EditForm {...this.props} action_item={this.state.action_item} api_merchant_update_couponcodes={this.api_merchant_update_couponcodes} />;
		} else if (this.state.action === "view") {
			return <ViewForm {...this.props} action_item={this.state.action_item} />;
		} else if (this.state.action === "filter") {
			return <FilterForm {...this.props} api_merchant_list_couponcodes={this.api_merchant_list_couponcodes} />;
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
		const count = (this.props.couponcodes && this.props.couponcodes.count || 0);

		return (
			<antd.Layout>
				<antd.PageHeader
					ghost={false}
					title="Coupon Codes"
					// subTitle="This is a subtitle"
					extra={[
						<antd.Button key="1" type="primary" onClick={this.on_bulkupload}>Bulk upload</antd.Button>,
						<antd.Button key="2" type="primary" onClick={this.on_bulkgenerate}>Bulk generate</antd.Button>,
						<antd.Button key="3" type="primary" onClick={this.on_create}>Create</antd.Button>,

						<antd.Button key="4" type="default" onClick={this.on_filter}>Filter</antd.Button>
					]}>

					<antd.Table
						dataSource={dataSource}
						columns={columns}
						size="middle"
						bordered={false}
						pagination={{
							onChange: (page) => {
								if (!this.state.loading) this.api_merchant_list_couponcodes({ page: page });
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

CouponCodeListComponent.propTypes = properties;

export default CouponCodeListComponent;