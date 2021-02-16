/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LeadCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"CREATE LEADS"}>
				<antd.Form form={form} onFinish={props.api_merchant_create_leads}>
					<antd.Form.Item label="Name" name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="DOB" name="dob" rules={[{ required: false, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.DatePicker />
					</antd.Form.Item>

					<antd.Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Mobile code" name="mobile_code" initialValue={(props.systeminfos && props.systeminfos.default_mobile_code || "")} rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.mobile_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Mobile" name="mobile" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Country" name="country" initialValue={(props.systeminfos && props.systeminfos.default_country_code || "")} rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.country_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default LeadCreateForm;