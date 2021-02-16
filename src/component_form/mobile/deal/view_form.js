/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const DealViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW DEAL"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Deal id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Name"}>{props.action_item.name}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Sell price"}>{Number(props.action_item.sell_price)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Promo code"}>{props.action_item.promo_code}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Currency code"}>{props.action_item.currency_code}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Deal type"}>{props.action_item.type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Deal Redeem count by single user"}>{Number(props.action_item.count)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Expires on"}>{props.action_item.expire}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Provider"}>{props.action_item.provider}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Category"}>{props.action_item.category}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Sub category"}>{props.action_item.sub_category}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Description"}>{props.action_item.description}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"TnC"}>{props.action_item.tnc}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Tags"}>{props.action_item.tags}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remarks"}>{props.action_item.remarks}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Spotlight"}>{String(props.action_item.is_spotlight)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Available"}>{String(props.action_item.is_available)}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default DealViewForm;