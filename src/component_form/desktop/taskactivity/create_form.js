/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const TaskActivityCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"CREATE TASK ACTIVITY"}>
				<antd.Form form={form} onFinish={props.api_merchant_create_taskactivities}>
					<antd.Form.Item label="Task id" initialValue={collection_helper.process_url_params(props.location.search).get("task_id", "")} name="task_id" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Lead id" initialValue={collection_helper.process_url_params(props.location.search).get("lead_id", "")} name="lead_id" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default TaskActivityCreateForm;