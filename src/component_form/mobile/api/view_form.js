/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const ApiViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW API"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Api id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Name"}>{props.action_item.name}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Callback Uri"}>{props.action_item.uri}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Key"}>{props.action_item.key}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default ApiViewForm;