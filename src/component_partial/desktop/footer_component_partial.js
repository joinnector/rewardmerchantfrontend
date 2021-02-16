//from system
import React from "react";

import prop_types from "prop-types";

import * as antd from "antd";
import * as antd_icons from "@ant-design/icons";

import constant_helper from "../../helper/constant_helper";

const properties = {
	// actions
	app_action: prop_types.object.isRequired,
};


class FooterComponentPartial extends React.Component {
	constructor(props) {
		super(props);
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

	render() {
		return (
			<antd.Layout.Footer className="app-footer">
				<div style={{ margin: "0 auto", maxWidth: 1200 }}>
					<antd.Row>
						<antd.Col span={8}>
							<div style={{ color: "#f8f9fc", fontSize: 20 }}>nector.</div>
							<br />
							<antd.Typography.Text style={{ color: "#abbebd", fontSize: 16 }}>A suite of customizable solution to take care all your customer engagement needs. Nector provides building blocks to integrate reward system and increase customer engagement.</antd.Typography.Text>
						</antd.Col>
						<antd.Col span={2} />
						<antd.Col span={6}>
							<div style={{ display: "flex", flex: 1, justifyContent: "center" }}>
								<div>
									<div style={{ color: "#f8f9fc", fontSize: 20 }}>Resources</div>
									<br />
									<antd.Typography.Link style={{ fontSize: 16 }} href={constant_helper.get_setting_constant().SITE_SOCIAL_TWITTER_URL} target="_blank" rel="noopener noreferrer">Blogs</antd.Typography.Link>
								</div>
							</div>

						</antd.Col>
						<antd.Col span={2} />
						<antd.Col span={6}>
							<div style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}>
								<div>
									<div style={{ color: "#f8f9fc", fontSize: 20 }}>Find us</div>
									<br />
									<span>
										<antd.Typography.Link style={{ fontSize: 16 }} href={constant_helper.get_setting_constant().SITE_SOCIAL_LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><antd_icons.LinkedinFilled /> LinkedIn</antd.Typography.Link>
										<antd.Typography.Link style={{ fontSize: 16 }} href={constant_helper.get_setting_constant().SITE_SOCIAL_TWITTER_URL} target="_blank" rel="noopener noreferrer"><antd_icons.TwitterOutlined /> Twitter</antd.Typography.Link>
										<antd.Typography.Link style={{ fontSize: 16 }} href={constant_helper.get_setting_constant().SITE_SOCIAL_TWITTER_URL} target="_blank" rel="noopener noreferrer"><antd_icons.MailOutlined /> product@nector.io</antd.Typography.Link>
										<antd.Typography.Link style={{ fontSize: 16 }} href={constant_helper.get_setting_constant().SITE_SOCIAL_TWITTER_URL} target="_blank" rel="noopener noreferrer"> +91 88503 12495</antd.Typography.Link>
									</span>
								</div>
							</div>

						</antd.Col>
					</antd.Row>

					<antd.Divider style={{ background: "#bebebe" }} />

					<antd.Typography.Text style={{ color: "#f8f9fc", fontSize: 16 }}>© 2020 Made with <antd_icons.HeartFilled style={{ color: "red" }} /> for rewards</antd.Typography.Text>

				</div>
			</antd.Layout.Footer>
		);
	}
}

FooterComponentPartial.propTypes = properties;
export default FooterComponentPartial;