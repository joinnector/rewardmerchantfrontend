/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const LeadEditForm = (props) => {
	const [form] = antd.Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({
			...props.action_item,
			dob: props.action_item.dob ? collection_helper.get_moment()(props.action_item.dob) : "",
		});
	}, [form, {
		...props.action_item,
		dob: props.action_item.dob ? collection_helper.get_moment()(props.action_item.dob) : "",
	}]);

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"UPDATE LEAD"}>
				<antd.Form form={form} onFinish={props.api_merchant_update_leads}>
					<antd.Form.Item label="Name" initialValue={props.action_item.name} name="name" rules={[{ type: "string", max: 100, message: "Name must be between 1 - 100 chars" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Mobile code" initialValue={props.action_item.mobile_code} name="mobile_code" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.mobile_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Mobile" initialValue={props.action_item.mobile} name="mobile" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Email" initialValue={props.action_item.email} name="email" rules={[{ type: "email", message: "Please enter valid email" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Country" name="country" initialValue={props.action_item.country} rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.country_code || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="DOB" initialValue={props.action_item.dob ? collection_helper.get_moment()(props.action_item.dob) : ""} name="dob" rules={[{ required: false, message: "Please enter a value" }]} labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.DatePicker />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Update </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default LeadEditForm;