/* eslint-disable react/prop-types */
// eslint-disable no-useless-escape
import React from "react";

//from system
import * as antd from "antd";

import collection_helper from "../../helper/collection_helper";

// eslint-disable-next-line no-unused-vars
const RegisterForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<antd.Card style={{ minWidth: 400, maxWidth: 450 }} title={"REGISTER"}>
				<antd.Form form={form} onFinish={props.api_open_create_accounts}>

					<antd.Form.Item label="Name" name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Country" name="country" initialValue={(props.systeminfos && props.systeminfos.default_country_code || "")} rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.country_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<div style={{ textAlign: "end" }}><antd.Typography.Link onClick={() => props.api_open_create_otps({ email: form.getFieldValue("email") })}>Send OTP</antd.Typography.Link></div>

					<antd.Form.Item label="Email OTP" name="email_otp" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Mobile code" name="mobile_code" initialValue={(props.systeminfos && props.systeminfos.default_mobile_code || "")} rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.mobile_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Mobile" name="mobile" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Password" name="password" rules={[{ type: "string", min: 8, message: "Password must be between 8 - 20 chars" }, { type: "string", max: 20, message: "Password must be between 8 - 20 chars" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.Password type="password" />
					</antd.Form.Item>

					<div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 20 }}>
						<antd.Typography.Link href={"/login"}>Back to Login</antd.Typography.Link>
					</div>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Register </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default RegisterForm;