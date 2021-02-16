/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const UploadCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({ ...props.action_item });
	}, [form, { ...props.action_item }]);

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"UPDATE UPLOAD"}>
				<antd.Form form={form} onFinish={props.api_merchant_update_uploads}>
					<antd.Form.Item label="Name" initialValue={props.action_item.name} name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Value" initialValue={props.action_item.value} name="value" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Upload type" initialValue={props.action_item.type} name="type" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.upload_type || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Upload category" initialValue={props.action_item.category} name="category" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.upload_category || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<a download>
						<img alt="img" style={{ width: "25%", marginBottom: 20 }} src={props.action_item.link} />
					</a>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Update </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default UploadCreateForm;