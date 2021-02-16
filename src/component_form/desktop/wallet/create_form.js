/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const WalletCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"CREATE WALLET"}>
				<antd.Form  form={form} onFinish={props.api_merchant_create_wallets}>
					<antd.Form.Item label="Lead id" name="lead_id" initialValue={collection_helper.process_url_params(props.location.search).get("lead_id", "")} rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Currency id" name="currency_id" initialValue={collection_helper.process_url_params(props.location.search).get("currency_id", "")} rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Available" name="available" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Reserve" name="reserve" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default WalletCreateForm;