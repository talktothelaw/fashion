import Hapi, { Server, ServerRoute } from '@hapi/hapi';
import InventoryController from "./InventoryController";
import { buyItemParamsSchema, getSoldItemsParamsSchema, inventorySchema } from "./validations";




const server: Server = Hapi.server({
	port: 3000,
	host: 'localhost'
});

const controller = new InventoryController();

const routes: ServerRoute[] = [
	{
		method: "GET",
		path: '/',
		handler: controller.apiRoot
	},
	{
		method: 'POST',
		path: '/inventory',
		handler: controller.inventoryHandler,
		options: {
			tags: ['api'],
			validate: {
				payload: inventorySchema
			}
		}
	},
	{
		method: 'POST',
		path: '/show/{show_ID}/buy_item/{item_ID}',
		handler: controller.buyItemHandler,
		options: {
			tags: ['api'],
			validate: {
				params: buyItemParamsSchema
			}
		}
	},
	{
		method: 'GET',
		path: '/show/{show_ID}/sold_items/{item_id?}',
		handler: controller.getSoldItemsHandler,
		options: {
			tags: ['api'],
			validate: {
				params: getSoldItemsParamsSchema
			}
		}
	}
];

server.route(routes);

export default server;
