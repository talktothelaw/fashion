import server from './app'
import inert from '@hapi/inert'
import vision from "@hapi/vision";
import * as HapiSwagger from 'hapi-swagger';
import packageJson from '../package.json'
import Hapi from "@hapi/hapi";

const swaggerOptions: HapiSwagger.RegisterOptions = {
	info: {
		title: 'Fashion & Beauty Platform API Documentation',
		version: packageJson.version
	}
};

const plugins: Array<Hapi.ServerRegisterPluginObject<any>> = [{
	plugin: inert
},
	{
		plugin: vision
	},
	{
		plugin: HapiSwagger,
		options: swaggerOptions
	}
];

(async ()=>{
	await server.register(plugins)
	await server.start()
	console.log(`Server running on ${server.info.uri}`);
})()

process.on('unhandledRejection', (err) => {
	console.log(err);
	process.exit(1);
});
