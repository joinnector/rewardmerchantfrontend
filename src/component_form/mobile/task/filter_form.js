/* eslint-disable react/prop-types */
//from system
import * as antd from "antd";
import React from "react";
import collection_helper from "../../helper/collection_helper";



// eslint-disable-next-line no-unused-vars
const TaskFilterForm = (props) => {
	const [form] = antd.Form.useForm();

	const filter_list = (values) => {
		const params = collection_helper.process_url_params(props.location.search);

		Object.keys(values).map(key => {
			if (values[key]) params.set(key, values[key]);
			else params.delete(key);
		});

		props.history.replace(`/task-list?${params.toString()}`);
		props.api_merchant_list_tasks(values);
	};

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"FILTER DEAL"}>
				<antd.Form form={form} onFinish={filter_list}>
					<antd.Form.Item label="Id" initialValue={collection_helper.process_url_params(props.location.search).get("id", "")} name="id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Name" initialValue={collection_helper.process_url_params(props.location.search).get("name", "")} name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal id" initialValue={collection_helper.process_url_params(props.location.search).get("deal_id", "")} name="deal_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task type" initialValue={collection_helper.process_url_params(props.location.search).get("type", "")} name="type" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.task_type || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Task category" initialValue={collection_helper.process_url_params(props.location.search).get("category", "")} name="category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Task sub category" initialValue={collection_helper.process_url_params(props.location.search).get("sub_category", "")} name="sub_category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Filter </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default TaskFilterForm;