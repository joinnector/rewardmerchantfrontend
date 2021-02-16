/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LoginActivityViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW LOGIN ACTIVITY"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"LoginActivity id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent id"}>{props.action_item.parent_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent type"}>{props.action_item.parent_type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Source"}>{props.action_item.source}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Device"}>{props.action_item.device}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"IP"}>{props.action_item.ip}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"City"}>{props.action_item.city}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Country"}>{props.action_item.country}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Reported"}>{String(props.action_item.is_reported)}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default LoginActivityViewForm;