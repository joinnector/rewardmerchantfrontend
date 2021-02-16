// app import
import winston_client from "../client/winston_client";

class WinstonWrapper {
	init() {
		this.prepare_common_wrapper();
	}

	prepare_common_wrapper() {
		this.winston_wrapper = new winston_client();
		
		// init
		this.winston_wrapper.init();
	}

	// getter
	get_wrapper() {
		return this.winston_wrapper;
	}
}

const winston_wrapper = new WinstonWrapper();
export default winston_wrapper;