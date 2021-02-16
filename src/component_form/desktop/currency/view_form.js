/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LoginActivityViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW CURRENCY"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Currency id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Currency code"}>{props.action_item.currency_code}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Symbol"}>{props.action_item.symbol}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Conversion factor"}>{props.action_item.conversion_factor}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Place"}>{props.action_item.place}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default LoginActivityViewForm;