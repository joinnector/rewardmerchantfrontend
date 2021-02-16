//from system
import React from "react";
import prop_types from "prop-types";

import collection_helper from "../../../helper/collection_helper";
import constant_helper from "../../../helper/constant_helper";

import ViewForm from "../../../component_form/notification/view_form";
import FilterForm from "../../../component_form/notification/filter_form";

import * as antd from "antd";

const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,

	systeminfos: prop_types.object.isRequired,
	notifications: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};

//from app
class NotificationListComponent extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			drawer_visible: false,

			action: "view",
			action_item: null,

			loading: false,

			page: 1,
			limit: 20,
		};

		this.api_merchant_get_notifications = this.api_merchant_get_notifications.bind(this);
		this.api_merchant_list_notifications = this.api_merchant_list_notifications.bind(this);

		this.process_list_data = this.process_list_data.bind(this);
		this.process_list_column = this.process_list_column.bind(this);

		this.on_view = this.on_view.bind(this);
		this.on_filter = this.on_filter.bind(this);

		this.toggle_drawer = this.toggle_drawer.bind(this);

		this.render_drawer_action = this.render_drawer_action.bind(this);

		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		this.api_merchant_list_notifications({ page: this.state.page, limit: this.state.limit, ...collection_helper.process_objectify_params(this.props.location.search) });
	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	api_merchant_get_notifications(values) {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_IGNORE_DISPATCH,
			endpoint: `api/v1/merchant/notifications/${values._id}`,
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

	api_merchant_list_notifications(values) {
		this.set_state({ page: values.page || 1, limit: values.limit || 20 });

		if (this.state.action === "filter"
			&& Object.keys(collection_helper.get_lodash().omit(values, ["page", "limit", "sort", "sort_op"])).length > 0) {
			this.set_state({ drawer_visible: false });
		}

		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_MERCHANT_LIST_NOTIFICATION_DISPATCH,
			endpoint: "api/v1/merchant/notifications",
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
		return (this.props.notifications && this.props.notifications.items || []).map(item => ({ ...item, key: item._id }));
	}

	process_list_column() {
		return [
			// eslint-disable-next-line no-unused-vars
			{ title: "Lead id", dataIndex: "lead_id", key: "lead_id", render: (text, record) => <antd.Typography.Paragraph>{record.lead_id ? record.lead_id : "-" }</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Event", dataIndex: "event", key: "event", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().capitalize(collection_helper.get_lodash().split(record.event, "_").join(" "))}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Title", dataIndex: "title", key: "title", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().capitalize(record.title)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Decription", dataIndex: "description", key: "description", render: (text, record) => <antd.Typography.Paragraph>{collection_helper.get_lodash().capitalize(record.description)}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{ title: "Link", dataIndex: "link", key: "link", render: (text, record) => <antd.Typography.Paragraph>{(record.link ? collection_helper.get_lodash().capitalize(record.link) : "-")}</antd.Typography.Paragraph> },
			// eslint-disable-next-line no-unused-vars
			{
				// eslint-disable-next-line no-unused-vars
				title: "Action", key: "action", render: (text, record) => {
					return (
						<antd.Space size="middle">
							<a onClick={() => this.on_view(record)}>View</a>
						</antd.Space>
					);
				}
			},
		];
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
		if (this.state.action === "view") {
			return <ViewForm {...this.props} action_item={this.state.action_item} />;
		} else if (this.state.action === "filter") {
			return <FilterForm {...this.props} api_merchant_list_notifications={this.api_merchant_list_notifications} />;
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
		const count = (this.props.notifications && this.props.notifications.count || 0);

		return (
			<antd.Layout>
				<antd.PageHeader
					ghost={false}
					title="Notifications"
					// subTitle="This is a subtitle"
					extra={[
						<antd.Button key="1" type="default" onClick={this.on_filter}>Filter</antd.Button>
					]}>

					<antd.Table
						dataSource={dataSource}
						columns={columns}
						size="middle"
						bordered={false}
						pagination={{
							onChange: (page) => {
								if (!this.state.loading) this.api_merchant_list_notifications({ page: page });
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

NotificationListComponent.propTypes = properties;

export default NotificationListComponent;