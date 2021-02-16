/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const UploadFilterForm = (props) => {
	const [form] = antd.Form.useForm();

	const filter_list = (values) => {
		const params = collection_helper.process_url_params(props.location.search);

		Object.keys(values).map(key => {
			if (values[key]) params.set(key, values[key]);
			else params.delete(key);
		});

		props.history.replace(`/upload-list?${params.toString()}`);
		props.api_merchant_list_uploads(values);
	};

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"FILTER UPLOAD"}>
				<antd.Form form={form} onFinish={filter_list}>
					<antd.Form.Item label="Id" initialValue={collection_helper.process_url_params(props.location.search).get("id", "")} name="id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Parent id" initialValue={collection_helper.process_url_params(props.location.search).get("parent_id", "")} name="parent_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Parent type" initialValue={collection_helper.process_url_params(props.location.search).get("parent_type", "")} name="parent_type" rules={[{ required: true, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.merchant_upload_parent || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Upload type" initialValue={collection_helper.process_url_params(props.location.search).get("type", "")} name="type" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.upload_type || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Upload category" initialValue={collection_helper.process_url_params(props.location.search).get("category", "")} name="category" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.upload_category || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Filter </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default UploadFilterForm;