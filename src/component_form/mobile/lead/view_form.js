/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LeadViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW LEAD"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Lead id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Name"}>{props.action_item.name}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Mobile code"}>{props.action_item.mobile_code}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Mobile"}>{props.action_item.mobile}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Email"}>{props.action_item.email}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Country"}>{props.action_item.country}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"DOB"}>{props.action_item.dob}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default LeadViewForm;