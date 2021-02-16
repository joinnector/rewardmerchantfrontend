/* eslint-disable react/prop-types */
import React from "react";

//from system
import * as antd from "antd";

// eslint-disable-next-line no-unused-vars
const UploadViewForm = (props) => {
	return (
		<antd.Layout className="generic-form">
			<antd.Card style={{ minWidth: 400, maxWidth: 450, }} bordered={false} title={"VIEW UPLOAD"}>
				<antd.Descriptions bordered column={1}>
					<antd.Descriptions.Item label={"Upload id"}>{props.action_item._id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent id"}>{props.action_item.parent_id}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Parent type"}>{props.action_item.parent_type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Name"}>{props.action_item.name}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Value"}>{props.action_item.value}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Type"}>{props.action_item.type}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Category"}>{props.action_item.category}</antd.Descriptions.Item>
					<antd.Descriptions.Item label={"Link"}><antd.Typography.Link href={props.action_item.link} target="_blank" rel="noopener noreferrer">{props.action_item.link}</antd.Typography.Link></antd.Descriptions.Item>
					<a download>
						<img alt="img" style={{ width: "50%" }} src={props.action_item.link} />
					</a>
				</antd.Descriptions>
			</antd.Card>
		</antd.Layout>
	);
};

export default UploadViewForm;