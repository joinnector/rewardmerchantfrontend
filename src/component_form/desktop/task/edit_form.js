/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const TaskEditForm = (props) => {
	const [form] = antd.Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({
			...props.action_item,
			expire: props.action_item.expire ? collection_helper.get_moment()(props.action_item.expire) : "",
			count: Number(props.action_item.count),
		});
	}, [form, {
		...props.action_item,
		expire: props.action_item.expire ? collection_helper.get_moment()(props.action_item.expire) : "",
		count: Number(props.action_item.count),
	}]);

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"UPDATE TASK"}>
				<antd.Form form={form} onFinish={props.api_merchant_update_tasks}>
					<antd.Form.Item label="Task name" initialValue={props.action_item.name} name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Count" initialValue={Number(props.action_item.count)} name="count" rules={[{ type: "integer", min: 1, message: "Count must be between 1 - 50" }, { type: "integer", max: 50, message: "Count must be between 1 - 50" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Task expiry" initialValue={props.action_item.expire ? collection_helper.get_moment()(props.action_item.expire) : ""} name="expire" rules={[{ required: false, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.DatePicker />
					</antd.Form.Item>

					<antd.Form.Item label="Task category" initialValue={props.action_item.category} name="category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task sub category" initialValue={props.action_item.sub_category} name="sub_category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task description" initialValue={props.action_item.description} name="description" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Task tnc" initialValue={props.action_item.tnc} name="tnc" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Task tags" initialValue={props.action_item.tags} name="tags" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task remarks" initialValue={props.action_item.remarks} name="remarks" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Update </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default TaskEditForm;