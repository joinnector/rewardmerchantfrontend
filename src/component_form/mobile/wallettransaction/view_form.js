/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const WalletTransactionViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW WALLET TRANSACTION"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"WalletTransaction id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Lead id"}>{props.action_item.lead_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Wallet id"}>{props.action_item.wallet_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent id"}>{props.action_item.parent_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent type"}>{props.action_item.parent_type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Amount"}>{Number(props.action_item.amount)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Closing balance"}>{Number(props.action_item.closing_balance)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Hash"}>{props.action_item.hash}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Operation"}>{props.action_item.operation}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Type"}>{props.action_item.type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Status"}>{props.action_item.status}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remarks"}>{props.action_item.remarks}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default WalletTransactionViewForm;