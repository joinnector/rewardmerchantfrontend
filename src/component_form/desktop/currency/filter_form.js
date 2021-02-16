/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LoginActivityFilterForm = (props) => {
	const [form] = antd.Form.useForm();

	const filter_list = (values) => {
		const params = collection_helper.process_url_params(props.location.search);

		Object.keys(values).map(key => {
			if (values[key]) params.set(key, values[key]);
			else params.delete(key);
		});

		props.history.replace(`/currency-list?${params.toString()}`);
		props.api_merchant_list_currencies(values);
	};

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"FILTER CURRENCY"}>
				<antd.Form form={form} onFinish={filter_list}>
					<antd.Form.Item label="Id" initialValue={collection_helper.process_url_params(props.location.search).get("id", "")} name="id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Currency code" initialValue={collection_helper.process_url_params(props.location.search).get("currency_code", "")} name="currency_code" rules={[{ type: "string", min: 3, message: "Currency code must be between 3 - 4 chars" }, { type: "string", max: 4, message: "Currency code must be between 3 - 4 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
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

export default LoginActivityFilterForm;