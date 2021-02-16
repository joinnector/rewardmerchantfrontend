// system or lib import
import winston from "winston";

// app import
import collection_helper from "../helper/collection_helper";
import constant_helper from "../helper/constant_helper";

import winston_level_enum from "../enum/winston_level_enum";

class WinstonClient {
	constructor(notify_callback) {
		this.notify_callback_called = false;
		if (collection_helper.validate_is_function(notify_callback) === true) this.notify_callback = notify_callback;
	}

	init() {
		// used to print inside the internal file
		this.prepare_ie_winston_instance();
	}

	// prepare
	prepare_common_instance() {
		/*
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		*/

		return winston.createLogger({
			level: "info",
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.simple(),
				winston.format.printf((message) =>
					(message.level, `${message.timestamp} - ${message.level} - ${message.message}`)
				)
			),
			defaultMeta: { service: collection_helper.process_env_value(process.env[constant_helper.get_env_constant().REACT_APP_SERVICE_NAME]) },
			exceptionHandlers: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.simple(),
						winston.format.printf((message) =>
							winston.format.colorize().colorize(message.level, `${message.timestamp} - ${message.level} - ${message.message}`)
						)
					)
				}),
			]
		});
	}

	prepare_ie_winston_instance() {
		this.ie_winston_instance = this.prepare_common_instance()
			.add(new winston.transports.Console({
				format: winston.format.combine(
					winston.format.timestamp(),
					winston.format.simple(),
					winston.format.printf((message) =>
						winston.format.colorize().colorize(message.level, `${message.timestamp} - ${message.level} - ${message.message}`)
					)
				)
			}));

		if (collection_helper.validate_is_function(this.notify_callback) === true && this.notify_callback_called === false) {
			this.notify_callback_called = true;
			this.notify_callback(true);
		}
	}

	process_ie_log(level = winston_level_enum.INFO, title = "", message = "", stack = "", param = "") {
		const environment = collection_helper.process_env_value(process.env[constant_helper.get_env_constant().NODE_ENV]);
		if (environment === "production") return;

		const winstonopts = collection_helper.process_serialize_data({
			level: level,
			data: {
				title: title,
				message: message,
				param: param,
				stack: stack,
			}
		});

		this.ie_winston_instance.log(level, winstonopts);
	}
}

export default WinstonClient;