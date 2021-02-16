/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const TaskViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW DEAL"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Task id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Name"}>{props.action_item.name}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Currency id"}>{props.action_item.currency_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Deal id"}>{props.action_item.deal_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Task type"}>{props.action_item.type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Count"}>{Number(props.action_item.count)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Min amount"}>{Number(props.action_item.min_task_amount)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Max amount"}>{Number(props.action_item.max_task_amount)}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Expires on"}>{props.action_item.expire}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Category"}>{props.action_item.category}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Sub category"}>{props.action_item.sub_category}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Description"}>{props.action_item.description}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"TnC"}>{props.action_item.tnc}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Tags"}>{props.action_item.tags}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remarks"}>{props.action_item.remarks}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default TaskViewForm;