/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const TaskActivityViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW TASK ACTIVITY"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"TaskActivity id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Task id"}>{props.action_item.task_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Lead id"}>{props.action_item.lead_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Remaining count"}>{props.action_item.remaining_count}</antd.Descriptions.Item>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default TaskActivityViewForm;