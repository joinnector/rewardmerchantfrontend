/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const WalletEditForm = (props) => {
	const [form] = antd.Form.useForm();

	React.useEffect(() => {
		form.setFieldsValue({
			reserve: Number(props.action_item.reserve)
		});
	}, [form, {
		reserve: Number(props.action_item.reserve)
	}]);

	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"UPDATE WALLET"}>
				<antd.Form form={form} onFinish={props.api_merchant_update_wallets}>
					<antd.Form.Item label="Reserve" initialValue={Number(props.action_item.reserve)} name="reserve" rules={[{ type: "number", min: 0, message: "Minimum should be 0" }, { required: false, message: "Please enter a value" }]} hasFeedback labelCol={{ span: 24 }} wrapperCol={{ span: 24 }}>
						<antd.InputNumber />
					</antd.Form.Item>

					<antd.Form.Item>
						<antd.Button type="primary" htmlType="submit" size="middle" style={{ width: "100%" }}> Update </antd.Button>
					</antd.Form.Item>
				</antd.Form>
			</antd.Card>
		</antd.Layout>
	);
};

export default WalletEditForm;