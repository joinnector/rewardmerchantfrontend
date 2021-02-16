module.exports = {
	apps: [
		{
			name: "rewardmerchantfrontend",
			// instances: "max",
			// exec_mode: "cluster_mode",
			exec_interpreter: "./node_modules/babel-cli/bin/babel-node.js",
			interpreter_args: ["--presets", "es2015,stage-2"],
			script: "./app.js",
			autorestart: true,
			watch: false,
			max_memory_restart: "1G",
		},
	],

	deploy: {
		production: {
			user: "ubuntu",
			host: ["15.207.207.205"],
			key: "~/.ssh/deploy_pm2",
			ref: "origin/master",
			repo: "git@github.com:joinnector/rewardmerchantfrontend.git",
			path: "/home/ubuntu/apps/rewardmerchantfrontend",
			"post-deploy": "yarn && yarn build && pm2 reload ecosystem.config.js --env production"
		},
		staging: {
			user: "ubuntu",
			host: ["15.207.207.205"],
			key: "~/.ssh/deploy_pm2",
			ref: "origin/master",
			repo: "git@github.com:joinnector/rewardmerchantfrontend.git",
			path: "/home/ubuntu/apps/rewardmerchantfrontend",
			"post-deploy": "yarn && yarn build && pm2 reload ecosystem.config.js --env staging"
		},
		development: {
			user: "ubuntu",
			host: ["15.207.207.205"],
			key: "~/.ssh/deploy_pm2",
			ref: "origin/master",
			repo: "git@github.com:joinnector/rewardmerchantfrontend.git",
			path: "/home/ubuntu/apps/rewardmerchantfrontend",
			"post-deploy": "yarn && yarn build && pm2 reload ecosystem.config.js --env development"
		},
	}
};