/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const CouponViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW COUPON"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Coupon id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Deal id"}>{props.action_item.deal_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Lead id"}>{props.action_item.lead_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Rating"}>{props.action_item.rating}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remarks"}>{props.action_item.remarks}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default CouponViewForm;