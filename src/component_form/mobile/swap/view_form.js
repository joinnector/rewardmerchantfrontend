/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const SwapViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW SWAP"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Swap id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Connecting Swap id"}>{props.action_item.swap_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Currency id"}>{props.action_item.currency_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Min swap amount"}>{props.action_item.min_swap_amount}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Max swap amount"}>{props.action_item.max_swap_amount}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Active"}>{String(props.action_item.is_active)}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default SwapViewForm;