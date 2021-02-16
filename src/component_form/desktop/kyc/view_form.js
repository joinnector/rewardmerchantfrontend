/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const KycViewForm = (props) => {
	const text = props.entities.kyc_status === "verified"
		? "KYC is verified"
		: (props.entities.kyc_status === "rejected"
			? "Please reupload KYC along with proper docs"
			: (props.entities.kyc_status === "pending"
				? "Please submit KYC"
				: "KYC is under review"));

	return (
		<antd.Layout className="generic-form" style={{ background: "transparent" }}>
			<antd.Badge.Ribbon text={text}>
				<antd.Card>
					<antd.Descriptions column={2}>
						<antd.Descriptions.Item label={"Kyc id"}>{props.kycs._id}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"Annual income"}>{props.kycs.annual_income}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"Street"}>{props.kycs.street}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"City"}>{props.kycs.city}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"Region"}>{props.kycs.region}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"Country"}>{props.kycs.country}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"Zipcode"}>{props.kycs.zipcode}</antd.Descriptions.Item>
						<antd.Descriptions.Item label={"Remarks"}>{props.kycs.remarks}</antd.Descriptions.Item>
					</antd.Descriptions>
				</antd.Card>
			</antd.Badge.Ribbon>

		</antd.Layout>
	);
};

export default KycViewForm;