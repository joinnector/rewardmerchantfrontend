/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const TaskCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"CREATE TASK"}>
				<antd.Form form={form} onFinish={props.api_merchant_create_tasks}>
					<antd.Form.Item label="Task name" name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Currency id" initialValue={collection_helper.process_url_params(props.location.search).get("currency_id", "")} name="currency_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal id" name="deal_id" initialValue={collection_helper.process_url_params(props.location.search).get("deal_id", "")} rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task Type" initialValue={collection_helper.process_url_params(props.location.search).get("type", "") || (props.systeminfos && props.systeminfos.default_task_type || "")} name="type" rules={[{ required: true, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.task_type || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Count" name="count" rules={[{ type: "integer", min: 1, message: "Count must be between 1 - 50" }, { type: "integer", max: 50, message: "Count must be between 1 - 50" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Min amount" name="min_task_amount" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Max amount" name="max_task_amount" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Task expiry" name="expire" rules={[{ required: false, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.DatePicker />
					</antd.Form.Item>

					<antd.Form.Item label="Task category" name="category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task sub category" name="sub_category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task description" name="description" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Task tnc" name="tnc" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Task tags" name="tags" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task remarks" name="remarks" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default TaskCreateForm;