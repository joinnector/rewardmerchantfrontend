/* eslint-disable react/prop-types */
import React from "react";

import collection_helper from "../../helper/collection_helper";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const WalletTransactionEditForm = (props) => {
	const [form] = antd.Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({
			status: props.action_item.status,
			remarks: props.action_item.remarks,
		});
	}, [form, {
		status: props.action_item.status,
		remarks: props.action_item.remarks,
	}]);

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"UPDATE WALLET"}>
				<antd.Form form={form} onFinish={props.api_merchant_update_wallettransactions}>
					<antd.Form.Item label="Status" initialValue={props.action_item.status} name="status" rules={[{ required: false, message: "Please select a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Select>
							{(props.systeminfos && props.systeminfos.merchant_wallettransaction_status || []).map(code => <antd.Select.Option key={code} value={code}>{collection_helper.get_lodash().capitalize(code)}</antd.Select.Option>)}
						</antd.Select>
					</antd.Form.Item>

					<antd.Form.Item label="Remarks"  initialValue={props.action_item.remarks} name="remarks" rules={[{ required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.Input />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Update </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default WalletTransactionEditForm;