/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const CouponCodeViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW COUPONCODE"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Coupon code id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Deal id"}>{props.action_item.deal_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Code"}>{props.action_item.code}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Available"}>{String(props.action_item.is_available)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Reference id"}>{props.action_item.base_reference_id}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default CouponCodeViewForm;