/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

import UploadComponentPartial from "../../component_partial/upload_component_partial";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const UploadCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"CREATE UPLOAD"}>
				<antd.Form  form={form} onFinish={props.api_merchant_create_uploads}>
					<antd.Form.Item label="Parent id" name="parent_id" initialValue={collection_helper.process_url_params(props.location.search).get("parent_id", "")} rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Parent type" initialValue={collection_helper.process_url_params(props.location.search).get("parent_type", "") || (props.systeminfos && props.systeminfos.default_upload_parent || "")} name="parent_type" rules={[{ required: true, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.merchant_upload_parent || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Name" name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Value" name="value" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Upload type" initialValue={(props.systeminfos && props.systeminfos.default_upload_type || "")} name="type" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.upload_type || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Upload category" initialValue={(props.systeminfos && props.systeminfos.default_upload_category || "")} name="category" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.upload_category || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item name="file">
						<UploadComponentPartial list_change={props.list_change}/>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default UploadCreateForm;