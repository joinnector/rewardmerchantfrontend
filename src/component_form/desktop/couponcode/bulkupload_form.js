/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

import UploadComponentPartial from "../../component_partial/upload_component_partial";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const CouponCodeCreateForm = (props) => {
	const [form] = antd.Form.useForm();

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"BULK UPLOAD COUPONCODE"}>
				<antd.Form form={form} onFinish={props.api_merchant_create_bulkcouponcodes}>
					<antd.Form.Item label="Deal id" initialValue={collection_helper.process_url_params(props.location.search).get("deal_id", "")} name="deal_id" rules={[{ required: true, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item label="Reference id" name="base_reference_id" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item name="file">
						<UploadComponentPartial list_change={props.list_change} />
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