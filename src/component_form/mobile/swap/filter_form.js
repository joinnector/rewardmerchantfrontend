/* eslint-disable react/prop-types */
//from system
import * as antd from "antd";
import React from "react";
import collection_helper from "../../helper/collection_helper";



// eslint-disable-next-line no-unused-vars
const SwapFilterForm = (props) => {
	const [form] = antd.Form.useForm();

	const filter_list = (values) => {
		const params = collection_helper.process_url_params(props.location.search);

		Object.keys(values).map(key => {
			if (values[key]) params.set(key, values[key]);
			else params.delete(key);
		});

		props.history.replace(`/swap-list?${params.toString()}`);
		props.api_merchant_list_swaps(values);
	};

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"FILTER SWAP"}>
				<antd.Form form={form} onFinish={filter_list}>
					<antd.Form.Item label="Id" initialValue={collection_helper.process_url_params(props.location.search).get("id", "")} name="id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Name" initialValue={collection_helper.process_url_params(props.location.search).get("name", "")} name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Connecting swap id" initialValue={collection_helper.process_url_params(props.location.search).get("swap_id", "")} name="swap_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Currency id" initialValue={collection_helper.process_url_params(props.location.search).get("currency_id", "")} name="currency_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Is active" initialValue={collection_helper.process_url_params(props.location.search).get("is_active", false)} name="is_active" valuePropName="checked" rules={[{ required: false }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Checkbox>Is active</antd.Checkbox>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Filter </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default SwapFilterForm;