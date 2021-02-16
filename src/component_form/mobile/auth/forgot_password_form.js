/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

import collection_helper from "../../helper/collection_helper";

// eslint-disable-next-line no-unused-vars
const ForgotPasswordForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="app-forgot-password-form" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
			<antd.Card style={{ minWidth: 400, maxWidth: 450 }} title={"RESET PASSWORD"}>
				<antd.Form form={form} onFinish={props.state.email_otp_requested ? props.api_open_update_forgotpasswords : props.api_open_create_otps}>

					<antd.Form.Item hidden={props.state.email_otp_requested} label="Email" name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item hidden={!props.state.email_otp_requested} label="New password" name="password" rules={props.state.email_otp_requested ? [{ type: "string", min: 8, message: "Password must be between 8 - 20 chars" }, { type: "string", max: 20, message: "Password must be between 8 - 20 chars" }, { required: true, message: "Please enter a value" }] : []} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.Password type="password" />
					</antd.Form.Item>

					<antd.Form.Item hidden={!props.state.email_otp_requested} label="Confirm new password" name="confirm_password" rules={props.state.email_otp_requested ? [{ type: "string", min: 8, message: "Password must be between 8 - 20 chars" }, { type: "string", max: 20, message: "Password must be between 8 - 20 chars" }, { required: true, message: "Please enter a value" }
						, ({ getFieldValue }) => ({
							validator(rule, value) {
								if (collection_helper.validate_is_null_or_undefined(value) === true || getFieldValue("password") === value) {
									return Promise.resolve();
								}
								return Promise.reject("Password did not match");
							},
						})] : []} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.Password type="password" />
					</antd.Form.Item>

					<antd.Form.Item hidden={!props.state.email_otp_requested} label="Otp" name="otp" rules={[{ required: props.state.email_otp_requested ? true : false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> {!props.state.email_otp_requested ? "Continue" : "Reset password"} </antd.Button>
					</antd.Form.Item>

					<div style={{ display: "flex", justifyContent: "flex-end" }}>
						<antd.Typography.Link href={"/login"}>Back to Login</antd.Typography.Link>
					</div>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default ForgotPasswordForm;