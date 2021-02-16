/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const WalletViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW WALLET"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Wallet id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Lead id"}>{props.action_item.lead_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Currency id"}>{props.action_item.currency_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Available"}>{Number(props.action_item.available)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Reserve"}>{Number(props.action_item.reserve)}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default WalletViewForm;