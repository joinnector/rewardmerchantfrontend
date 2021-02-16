//from system
import * as antd_icons from "@ant-design/icons";
import * as antd from "antd";
import prop_types from "prop-types";
import React from "react";
import * as react_redux from "react-redux";
import * as react_router_dom from "react-router-dom";
import * as redux from "redux";
import FooterComponentPartial from "../component_partial/footer_component_partial";
import HeaderComponentPartial from "../component_partial/header_component_partial";
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";
import * as app_action from "../store/action/app_action";
import axios_wrapper from "../wrapper/axios_wrapper";
import security_wrapper from "../wrapper/security_wrapper";
import winston_wrapper from "../wrapper/winston_wrapper";








const properties = {
	children: prop_types.object.isRequired,
	mode: prop_types.string.isRequired,
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	location: prop_types.any.isRequired,
	entities: prop_types.object.isRequired,
	kycs: prop_types.object.isRequired,

	// actions
	app_action: prop_types.object.isRequired,
};


class AppContainer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			sidebar_menu_key: "none",
			sidebar_collapsed: false,
		};


		this.api_open_get_systeminfos = this.api_open_get_systeminfos.bind(this);
		this.api_merchant_get_kycs = this.api_merchant_get_kycs.bind(this);
		this.api_merchant_get_entities = this.api_merchant_get_entities.bind(this);
		this.api_merchant_get_settings = this.api_merchant_get_settings.bind(this);

		this.on_home_view = this.on_home_view.bind(this);
		this.on_mode_change = this.on_mode_change.bind(this);

		this.toggle_sidebar = this.toggle_sidebar.bind(this);
		this.toggle_menu_sidebar = this.toggle_menu_sidebar.bind(this);

		this.set_state = this.set_state.bind(this);
	}

	// mounted
	componentDidMount() {
		axios_wrapper.init();
		winston_wrapper.init();
		security_wrapper.init();

		// init reducers
		this.api_open_get_systeminfos();
		this.api_merchant_get_kycs(this.props);
		this.api_merchant_get_entities(this.props);
		this.api_merchant_get_settings(this.props);
	}

	// updating
	// eslint-disable-next-line no-unused-vars
	shouldComponentUpdate(nextProps, nextState) {
		if (this.props.header.authorization != nextProps.header.authorization) {
			this.api_merchant_get_kycs(nextProps);
			this.api_merchant_get_entities(nextProps);
			this.api_merchant_get_settings(nextProps);
		}

		return true;
	}

	// unmount
	componentWillUnmount() {

	}

	api_open_get_systeminfos() {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_OPEN_GET_SYSTEMINFOS,
			endpoint: "api/open/systeminfos",
			params: {},
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_get(opts, (result) => {

		});
	}

	api_merchant_get_kycs(props) {
		if (!props.header.authorization) return null;

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

	api_merchant_get_entities(props) {
		if (!props.header.authorization) return null;

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

	api_merchant_get_settings(props) {
		if (!props.header.authorization) return null;

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

	toggle_sidebar() {
		// eslint-disable-next-line no-unused-vars
		this.set_state({ sidebar_collapsed: !this.state.sidebar_collapsed });
	}

	toggle_menu_sidebar(e) {
		const sidebar_menu_key = e.key;
		// eslint-disable-next-line no-unused-vars
		this.set_state({ sidebar_menu_key: sidebar_menu_key });

		if (sidebar_menu_key == "list_apis") this.props.history.push("/api-list");
		else if (sidebar_menu_key == "list_leads") this.props.history.push("/lead-list");
		else if (sidebar_menu_key == "list_deals") this.props.history.push("/deal-list");
		else if (sidebar_menu_key == "list_tasks") this.props.history.push("/task-list");
		else if (sidebar_menu_key == "list_taskactivities") this.props.history.push("/taskactivity-list");
		else if (sidebar_menu_key == "list_swaps") this.props.history.push("/swap-list");
		else if (sidebar_menu_key == "list_coupons") this.props.history.push("/coupon-list");
		else if (sidebar_menu_key == "list_wallets") this.props.history.push("/wallet-list");
		else if (sidebar_menu_key == "list_wallettransactions") this.props.history.push("/wallettransaction-list");
		else if (sidebar_menu_key == "list_couponcodes") this.props.history.push("/couponcode-list");
		else if (sidebar_menu_key == "list_currencies") this.props.history.push("/currency-list");
		else if (sidebar_menu_key == "list_uploads") this.props.history.push("/upload-list");
		else if (sidebar_menu_key == "list_reviews") this.props.history.push("/review-list");
		else if (sidebar_menu_key == "list_stats") this.props.history.push("/stat-list");
	}

	on_home_view() {
		this.props.history.push("/");
	}

	on_mode_change(e) {
		const mode = e === true ? "prod" : "dev";

		const _this = this;
		antd.Modal.confirm({
			title: "Report", content: `Alert!, Chaging to ${mode} mode, Are you sure?`, okText: "Confirm",
			okType: "default", cancelText: "Cancel",
			onOk() {
				collection_helper.process_add_item(constant_helper.get_app_constant().NECTOR_MODE, mode);

				// eslint-disable-next-line no-unused-vars
				const opts = {
					event: constant_helper.get_app_constant().INTERNAL_DISPATCH,
					key: "mode",
					value: mode
				};

				// eslint-disable-next-line no-unused-vars
				_this.props.app_action.internal_generic_dispatch(opts, (result) => {
					// eslint-disable-next-line no-undef
					window.location.reload();
				});
			}
		});
	}

	set_state(values) {
		// eslint-disable-next-line no-unused-vars
		this.setState((state, props) => ({
			...state,
			...values,
		}));
	}

	render() {
		const base_url = this.props.mode === "prod" ? collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_PROD_URL]) : collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_API_BASE_DEV_URL]);

		const show_layout = ["/register", "/login", "/forgot-password", "/maintenance", "/404"].indexOf(this.props.location.pathname) > -1 ? false : true;
		if (show_layout) {
			return (
				<antd.Layout>
					<antd.Layout>
						<antd.Layout.Sider trigger={null} collapsible collapsed={this.state.sidebar_collapsed} theme="light">
							<div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 60 }}>
								<antd.Tooltip title="nector"><antd.Avatar style={{ cursor: "pointer" }} src={"https://res.cloudinary.com/esternetwork/image/upload/v1609523844/nector/images/blogo.png"} onClick={this.on_home_view} /></antd.Tooltip>
							</div>
							<antd.Menu mode="inline" defaultSelectedKeys={[this.state.sidebar_menu_key]} onClick={this.toggle_menu_sidebar}>
								<antd.Menu.SubMenu key="apis" icon={<antd_icons.ApiOutlined />} title="Apis">
									<antd.Menu.Item key="list_apis">
										List Apis
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="deals" icon={<antd_icons.TrophyOutlined />} title="Deals">
									<antd.Menu.Item key="list_deals">
										List Deals
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="couponcodes" icon={<antd_icons.FileDoneOutlined />} title="Coupon codes">
									<antd.Menu.Item key="list_couponcodes">
										List Coupon Codes
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="coupons" icon={<antd_icons.BarcodeOutlined />} title="Coupons">
									<antd.Menu.Item key="list_coupons">
										List Coupons
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="tasks" icon={<antd_icons.EditOutlined />} title="Tasks">
									<antd.Menu.Item key="list_tasks">
										List Tasks
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="taskactivities" icon={<antd_icons.EditFilled />} title="Task Activities">
									<antd.Menu.Item key="list_taskactivities">
										List Task Activities
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="swaps" icon={<antd_icons.SwapOutlined />} title="Swaps">
									<antd.Menu.Item key="list_swaps">
										List Swaps
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="leads" icon={<antd_icons.UserOutlined />} title="Leads">
									<antd.Menu.Item key="list_leads">
										List Leads
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="wallets" icon={<antd_icons.WalletOutlined />} title="Wallets">
									<antd.Menu.Item key="list_wallets">
										List Wallets
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="wallettransactions" icon={<antd_icons.WalletOutlined />} title="Wallet Transactions">
									<antd.Menu.Item key="list_wallettransactions">
										List Wallet Transactions
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="currencies" icon={<antd_icons.PoundCircleOutlined />} title="Currencies">
									<antd.Menu.Item key="list_currencies">
										List Currencies
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="uploads" icon={<antd_icons.CloudUploadOutlined />} title="Uploads">
									<antd.Menu.Item key="list_uploads">
										List Uploads
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="reviews" icon={<antd_icons.SlidersOutlined />} title="Reviews">
									<antd.Menu.Item key="list_reviews">
										List Reviews
									</antd.Menu.Item>
								</antd.Menu.SubMenu>

								<antd.Menu.SubMenu key="stats" icon={<antd_icons.NumberOutlined />} title="Stats">
									<antd.Menu.Item key="list_stats">
										List Stats
									</antd.Menu.Item>
								</antd.Menu.SubMenu>
							</antd.Menu>
						</antd.Layout.Sider>
						<antd.Layout>
							<HeaderComponentPartial {...this.props} toggle_sidebar={this.toggle_sidebar} sidebar_collapsed={this.state.sidebar_collapsed} hide_toggle={false} />
							<antd.Layout.Content style={{ padding: "2%" }}>
								<div style={{ display: "flex", flex: 1, justifyContent: "flex-end", marginBottom: 20 }}>
									<antd.Switch checked={this.props.mode === "prod"} onChange={this.on_mode_change} checkedChildren={collection_helper.get_lodash().upperCase(this.props.mode)} unCheckedChildren={collection_helper.get_lodash().upperCase(this.props.mode)} />
								</div>
								<div style={{ display: "flex", flex: 1, justifyContent: "center", marginBottom: 20 }}>
									<antd.Tag color={this.props.mode === "prod" ? "green" : "blue"} style={{ padding: 10, fontSize: 18 }}> Pointing to {base_url}</antd.Tag>
								</div>
								{this.props.children}
							</antd.Layout.Content>
						</antd.Layout>
					</antd.Layout>
				</antd.Layout>
			);
		} else {
			return (
				<antd.Layout>
					<HeaderComponentPartial {...this.props} toggle_sidebar={this.toggle_sidebar} sidebar_collapsed={this.state.sidebar_collapsed} hide_toggle={true} />
					<antd.Layout.Content style={{ padding: "2%" }}>
						{this.props.children}
					</antd.Layout.Content>
					<FooterComponentPartial {...this.props} />
				</antd.Layout>
			);
		}

	}
}

AppContainer.propTypes = properties;

const map_state_to_props = state => ({
	mode: state.app_reducer.mode,
	header: state.app_reducer.header,
	entities: state.app_reducer.entities,
	kycs: state.app_reducer.kycs
});

const map_dispatch_to_props = dispatch => ({
	app_action: redux.bindActionCreators(app_action, dispatch)
});

export default react_router_dom.withRouter(react_redux.connect(map_state_to_props, map_dispatch_to_props, null, { pure: false })(AppContainer));