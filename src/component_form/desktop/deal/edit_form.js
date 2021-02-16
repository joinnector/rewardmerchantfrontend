/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const DealEditForm = (props) => {
	const [form] = antd.Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({
			...props.action_item,
			expire: props.action_item.expire ? collection_helper.get_moment()(props.action_item.expire) : "",
			sell_price: Number(props.action_item.sell_price),
			count: Number(props.action_item.count)
		});
	}, [form, {
		...props.action_item,
		expire: props.action_item.expire ? collection_helper.get_moment()(props.action_item.expire) : "",
		count: Number(props.action_item.count)
	}]);

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"UPDATE DEAL"}>
				<antd.Form form={form} onFinish={props.api_merchant_update_deals}>
					<antd.Form.Item label="Deal name" initialValue={props.action_item.name} name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Sell price" initialValue={Number(props.action_item.sell_price)} name="sell_price" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Promo code" initialValue={props.action_item.promo_code} name="promo_code" rules={[{ type: "string", min: 4, message: "Promo code must be between 4 - 20 chars" }, { type: "string", max: 20, message: "Promo code must be between 4 - 20 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Currency code" initialValue={props.action_item.currency_code} name="currency_code" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.digital_currency_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Deal type" initialValue={props.action_item.type} name="type" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select >
							{(props.systeminfos && props.systeminfos.merchant_deal_type || []).map(type => <antd.Select.Option key={type} value={type}>{collection_helper.get_lodash().capitalize(type)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Deal redeem count by single user" initialValue={Number(props.action_item.count)} name="count" rules={[{ type: "integer", min: 1, message: "Count must be between 1 - 50" }, { type: "integer", max: 50, message: "Count must be between 1 - 50" }, { required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item label="Deal expiry" initialValue={props.action_item.expire ? collection_helper.get_moment()(props.action_item.expire) : ""} name="expire" rules={[{ required: false, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.DatePicker />
					</antd.Form.Item>

					<antd.Form.Item label="Deal provider" initialValue={props.action_item.provider} name="provider" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal category" initialValue={props.action_item.category} name="category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal sub category" initialValue={props.action_item.sub_category} name="sub_category" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal description" initialValue={props.action_item.description} name="description" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Deal tnc" initialValue={props.action_item.tnc} name="tnc" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Deal tags" initialValue={props.action_item.tags} name="tags" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Deal remarks" initialValue={props.action_item.remarks} name="remarks" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input.TextArea />
					</antd.Form.Item>

					<antd.Form.Item label="Is deal spotlight" initialValue={props.action_item.is_spotlight} name="is_spotlight" valuePropName="checked" rules={[{ required: false }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Checkbox>Is spotlight</antd.Checkbox>
					</antd.Form.Item>

					<antd.Form.Item label="Is deal available" initialValue={props.action_item.is_available} name="is_available" valuePropName="checked" rules={[{ required: false }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Checkbox>Is available</antd.Checkbox>
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Update </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default DealEditForm;