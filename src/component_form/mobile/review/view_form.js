/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const ReviewViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW REVIEW"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Review id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent id"}>{props.action_item.parent_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent type"}>{props.action_item.parent_type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Title"}>{props.action_item.title}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Description"}>{props.action_item.description}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Rating"}>{props.action_item.rating}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remarks"}>{props.action_item.remarks}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default ReviewViewForm;