/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const DealCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"CREATE DEAL"}>
				<antd.Form form={form} onFinish={props.api_merchant_create_deals}>
					<antd.Form.Item label="Deal name" name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Sell price" name="sell_price" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Promo code" name="promo_code" rules={[{ type: "string", min: 4, message: "Promo code must be between 4 - 20 chars" }, { type: "string", max: 20, message: "Promo code must be between 4 - 20 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Currency code" initialValue={(props.systeminfos && props.systeminfos.default_digital_currency_code || "")} name="currency_code" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.digital_currency_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Deal type" initialValue={(props.systeminfos && props.systeminfos.default_merchant_deal_type || "")} name="type" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.merchant_deal_type || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select >
					</antd.Form.Item>

					<antd.Form.Item label="Deal redeem count by single user" name="count" rules={[{ type: "integer", min: 1, message: "Count must be between 1 - 50" }, { type: "integer", max: 50, message: "Count must be between 1 - 50" }, { required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Deal expiry" name="expire" rules={[{ required: false, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.DatePicker />
					</antd.Form.Item>

					<antd.Form.Item label="Deal provider" name="provider" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal category" name="category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal sub category" name="sub_category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal description" name="description" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Deal tnc" name="tnc" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Deal tags" name="tags" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal remarks" name="remarks" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Is deal spotlight" name="is_spotlight" valuePropName="checked" rules={[{ required: false }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Checkbox defaultChecked={false}>Is spotlight</antd.Checkbox>
					</antd.Form.Item>

					<antd.Form.Item label="Is deal available" name="is_available" valuePropName="checked" rules={[{ required: false }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Checkbox defaultChecked={true}>Is available</antd.Checkbox>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Create </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default DealCreateForm;