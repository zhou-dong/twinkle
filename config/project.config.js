const path = require('path');
const ip = require('ip');


const config = {
	env: process.env.NODE_ENV || 'development',

	// Project Structure
	path_base: path.resolve(__dirname, '..'),
	dir_client: 'src',
	dir_dist: 'dist',
	dir_public: 'public',
	dir_config: 'config',
	dir_test: 'tests',

	server_host: ip.address(),
	server_port: process.env.PORT || 3000,
};

config.author = 'Dong Zhou';
config.title = 'Twinkle';
config.description = 'Virtualization of Algorithms, Data Structures, web architecture';
config.description += ' and Machine Learning Algorithms';
config.keywords = config.description;

module.exports = config