/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LoginForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<antd.Card style={{ minWidth: 400, maxWidth: 450 }} title={"LOGIN"}>
				<antd.Form form={form} onFinish={props.api_open_create_logins}>
					<antd.Form.Item label="Email" name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Password" name="password" rules={[{ type: "string", min: 8, message: "Password must be between 8 - 20 chars" }, { type: "string", max: 20, message: "Password must be between 8 - 20 chars" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.Password type="password" />
					</antd.Form.Item>

					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<antd.Typography.Link href={"/forgot-password"}>Forgot password</antd.Typography.Link>
					</div>

					<antd.Form.Item name="remember" valuePropName="checked" style={{ alignSelf: "start" }}>
						<antd.Checkbox>Remember me</antd.Checkbox>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Log in </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default LoginForm;