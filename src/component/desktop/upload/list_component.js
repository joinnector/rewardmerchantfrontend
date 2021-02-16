//from system
import React from "react";
import prop_types from "prop-types";

import collection_helper from "../../../helper/collection_helper";
import constant_helper from "../../../helper/constant_helper";

import CreateForm from "../../../component_form/upload/create_form";
import EditForm from "../../../component_form/upload/edit_form";
import ViewForm from "../../../component_form/upload/view_form";
import FilterForm from "../../../component_form/upload/filter_form";

import * as antd from "antd";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,
	uploads: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class UploadListComponent extends React.Component {
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

		this.api_merchant_create_uploads = this.api_merchant_create_uploads.bind(this);
		this.api_merchant_get_uploads = this.api_merchant_get_uploads.bind(this);
		this.api_merchant_update_uploads = this.api_merchant_update_uploads.bind(this);
		this.api_merchant_delete_uploads = this.api_merchant_delete_uploads.bind(this);
		this.api_merchant_list_uploads = this.api_merchant_list_uploads.bind(this);

		this.process_list_data = this.process_list_data.bind(this);
		this.process_list_column = this.process_list_column.bind(this);

		this.on_create = this.on_create.bind(this);
		this.on_edit = this.on_edit.bind(this);
		this.on_delete = this.on_delete.bind(this);
		this.on_view = this.on_view.bind(this);
		this.on_filter = this.on_filter.bind(this);

		this.toggle_drawer = this.toggle_drawer.bind(this);


		this.render_drawer_action = this.render_drawer_action.bind(this);

		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		this.api_merchant_list_uploads({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
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

	api_merchant_create_uploads(values) {
		this.state.list.map((x, index) => {
			// eslint-disable-next-line no-unused-vars
			const opts = {
				event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
				endpoint: "api/v1/merchant/uploads",
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
					this.api_merchant_list_uploads({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
				}
			});
		});
	}

	api_merchant_update_uploads(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/uploads/${this.state.action_item._id}`,
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
				this.api_merchant_list_uploads({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_delete_uploads(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_SUCCESS_DISPATCH,
			endpoint: `api/v1/merchant/uploads/${values._id}`,
			params: {},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_delete(opts, (result) => {
			if (result.meta.status === "success") {
				this.api_merchant_list_uploads({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
			}
		});
	}

	api_merchant_get_uploads(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: `api/v1/merchant/uploads/${values._id}`,
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

	api_merchant_list_uploads(values) {
		this.set_state({ page: values.page || 1, limit: values.limit || 20 });

		if (this.state.action === "filter"
			&& Object.keys(collection_helper.get_lodash().omit(values, ["page", "limit", "sort", "sort_op"])).length > 0) {
			this.set_state({ drawer_visible: false });
		}

		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_LIST_UPLOAD_DISPATCH,
			endpoint: "api/v1/merchant/uploads",
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
		return (this.props.uploads && this.props.uploads.items || []).map(item => ({ ...item, key: item._id }));
	}

	process_list_column() {
		return [
			// eslint-disable-next-line no-unused-vars
			{ title: "Parent Id", dataIndex: "parent_id", key: "parent_id", render: (text, record) => <antd.Typography.Paragraph>{record.parent_id} - {record.parent_type} </antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Name", dataIndex: "name", key: "name", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().capitalize(record.name)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Type", dataIndex: "type", key: "type", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().capitalize(record.type)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Category", dataIndex: "category", key: "category", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().capitalize(record.category)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Value", dataIndex: "value", key: "value", render: (text, record) => <antd.Typography.Paragraph>{(record.value ? collection_helper.get_lodash().capitalize(record.value) : "-")}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{
				// eslint-disable-next-line no-unused-vars
				title: "Action", key: "action", render: (text, record) => {
					return (
						<antd.Space size="middle">
							<a onClick={() => this.on_edit(record)}>Edit</a>
							<a onClick={() => this.on_view(record)}>View</a>
							<a onClick={() => this.on_delete(record)}>Delete</a>
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

	on_delete(record) {
		const _this = this;
		// todo show popoup and call the api
		antd.Modal.confirm({
			title: "Delete", content: `Delete ${record.name}?`, okText: "Confirm",
			okType: "default", cancelText: "Cancel",
			onOk() {
				_this.api_merchant_delete_uploads(record);
			}
		});
	}

	on_upload(record) {
		this.set_state({ action_item: record, action: "upload" });
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
			return <CreateForm {...this.props} api_merchant_create_uploads={this.api_merchant_create_uploads} list_change={this.list_change} />;
		} else if (this.state.action === "edit") {
			return <EditForm {...this.props} action_item={this.state.action_item} api_merchant_update_uploads={this.api_merchant_update_uploads} />;
		} else if (this.state.action === "view") {
			return <ViewForm {...this.props} action_item={this.state.action_item} />;
		} else if (this.state.action === "filter") {
			return <FilterForm {...this.props} api_merchant_list_uploads={this.api_merchant_list_uploads} />;
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
		const count = (this.props.uploads && this.props.uploads.count || 0);

		return (
			<antd.Layout>
				<antd.PageHeader
					ghost={false}
					title="Uploads"
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
								if (!this.state.loading) this.api_merchant_list_uploads({ page: page });
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

UploadListComponent.propTypes = properties;

export default UploadListComponent;