/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const CouponCodeCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"BULK GENERATE COUPONCODE"}>
				<antd.Form form={form} onFinish={props.api_merchant_create_generatecouponcodes}>
					<antd.Form.Item label="Deal id" initialValue={collection_helper.process_url_params(props.location.search).get("deal_id", "")} name="deal_id" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Count" name="count" rules={[{ type: "integer", max: 1000, message: "Count must be between 1 - 1000" },{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Coupon code" name="code" rules={[{ type: "string", min: 4, message: "Coupon code must be between 4 - 20 chars" }, { type: "string", max: 20, message: "Coupon code must be between 4 - 20 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Prefix" name="prefix" rules={[{ type: "string", len: 3, message: "Prefix must be 3 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Reference id" name="base_reference_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default CouponCodeCreateForm;