//from system
import * as antd_icons from "@ant-design/icons";
import * as antd from "antd";
import prop_types from "prop-types";
import React from "react";
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";




const properties = {
	header: prop_types.object.isRequired,
	history: prop_types.any.isRequired,
	entities: prop_types.object.isRequired,
	kycs: prop_types.object.isRequired,

	toggle_sidebar: prop_types.func.isRequired,

	sidebar_collapsed: prop_types.bool.isRequired,
	hide_toggle: prop_types.bool,

	// actions
	app_action: prop_types.object.isRequired,
};
class HeaderComponentPartial extends React.Component {
	constructor(props) {
		super(props);

		this.api_merchant_delete_logouts = this.api_merchant_delete_logouts.bind(this);

		this.on_loginactivity = this.on_loginactivity.bind(this);
		this.on_notifcation = this.on_notifcation.bind(this);
		this.on_profile = this.on_profile.bind(this);
		this.on_logout = this.on_logout.bind(this);

		this.on_register = this.on_register.bind(this);
		this.on_login = this.on_login.bind(this);

		this.toggle_sidebar = this.toggle_sidebar.bind(this);
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

	api_merchant_delete_logouts() {
		// eslint-disable-next-line no-unused-vars
		const opts = {
			event: constant_helper.get_app_constant().API_LOGOUT_DISPATCH,
			endpoint: "api/v1/merchant/logout",
			params: {},
			has_authorization: true,
			headers: {
				"content-type": "application/x-www-form-urlencoded",
			}
		};

		// eslint-disable-next-line no-unused-vars
		this.props.app_action.api_generic_delete(opts, (result) => {
			if (result.meta.status === "success") {
				collection_helper.process_delete_items();
			}
		});
	}

	on_loginactivity() {
		this.props.history.push("/loginactivity-list");
	}

	on_notifcation() {
		this.props.history.push("/notification-list");
	}

	on_profile() {
		this.props.history.push("/profile");
	}

	on_logout() {
		const _this = this;
		// todo show popoup and call the api
		antd.Modal.confirm({
			title: "Logout", content: "Logout from nector?", okText: "Confirm",
			okType: "default", cancelText: "Cancel",
			onOk() {
				_this.api_merchant_delete_logouts();
			}
		});
	}

	on_register() {
		this.props.history.push("/register");
	}

	on_login() {
		this.props.history.push("/login");
	}

	toggle_sidebar() {
		this.props.toggle_sidebar();
	}

	render() {
		if (this.props.hide_toggle === false) {
			return (
				<antd.Layout.Header>
					<antd.Row>
						<antd.Col span={12}>
							<span style={{ fontSize: 20 }}>
								{this.props.hide_toggle === false ? <antd_icons.MenuOutlined style={{ fontSize: 20, marginRight: 10 }} className="trigger" onClick={this.toggle_sidebar} /> : <div />}
							</span>
						</antd.Col>
						<antd.Col span={12}>
							<div style={{ textAlign: "end" }}>
								<antd.Space style={{ fontSize: 20 }}>
									<antd.Tooltip title="Activities"><antd.Badge> <antd_icons.SecurityScanOutlined style={{ fontSize: 20 }} className="trigger" onClick={this.on_loginactivity} /> </antd.Badge></antd.Tooltip>
									<antd.Tooltip title="Notifications"><antd.Badge dot> <antd_icons.NotificationOutlined style={{ fontSize: 20 }} className="trigger" onClick={this.on_notifcation} /> </antd.Badge></antd.Tooltip>
									<antd.Tooltip title="Profile"><antd.Badge> <antd_icons.UserOutlined style={{ fontSize: 20 }} className="trigger" onClick={this.on_profile} /> </antd.Badge></antd.Tooltip>
									<antd.Tooltip title="Logout"><antd.Badge> <antd_icons.LogoutOutlined style={{ fontSize: 20 }} className="trigger" onClick={this.on_logout} /> </antd.Badge></antd.Tooltip>
								</antd.Space>
							</div>
						</antd.Col>
					</antd.Row>
				</antd.Layout.Header>
			);
		} else {
			return (
				<antd.Layout.Header>
					<div style={{ margin: "0 auto", maxWidth: 1200 }}>
						<antd.Row>
							<antd.Col span={12}>
								<span style={{ fontSize: 20 }}>
									<img src="https://res.cloudinary.com/esternetwork/image/upload/v1609524722/nector/images/favicon.png" alt="" style={{ marginRight: 5 }} />
									<span style={{ color: "#3c4858" }}>nector.</span>
								</span>
							</antd.Col>
							<antd.Col span={12}>
								<div style={{ textAlign: "end" }}>
									<antd.Space>
										<antd.Button type="primary" onClick={this.on_register}>Register</antd.Button>
										<antd.Button type="link" onClick={this.on_login}>Login</antd.Button>
									</antd.Space>
								</div>
							</antd.Col>
						</antd.Row>
					</div>
				</antd.Layout.Header>
			);
		}
	}
}

HeaderComponentPartial.propTypes = properties;
export default HeaderComponentPartial;