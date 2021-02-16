/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const StatViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW STAT"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Stat id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Type"}>{props.action_item.type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Amount"}>{Number(props.action_item.amount)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Currency"}>{props.action_item.currency_code}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remarks"}>{props.action_item.remarks}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default StatViewForm;