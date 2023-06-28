import { Request, ResponseObject, ResponseToolkit } from "@hapi/hapi";

interface Item {
	itemID: number;
	itemName: string;
	quantity: number;
	showID?: string;
}

class InventoryController {
	private inventory: Item[] = [];
	private soldItems: Item[] = [];
	
	apiRoot = (__: Request, h: ResponseToolkit) => {
		return h.response({
			status: "Running",
			message: 'visit /documentation'
		}).code(200)
	}
	
	inventoryHandler = (request: Request, h: ResponseToolkit): ResponseObject => {
		const items: Item[] = request.payload as Item[];
		items.forEach(item => {
			const existingItem = this.inventory.find(i => i.itemID === item.itemID);
			if (existingItem) {
				existingItem.itemName = item.itemName;
				existingItem.quantity = item.quantity;
			} else {
				this.inventory.push(item);
			}
		});
		return h.response().code(200);
	};
	
	buyItemHandler = (request: Request, h: ResponseToolkit): ResponseObject => {
		const { show_ID, item_ID } = request.params;
		const item = this.inventory.find(i => i.itemID === Number(item_ID));
		if (!item || item.quantity === 0) {
			return h.response('Insufficient inventory').code(400);
		}
		item.quantity--;
		const soldItem = this.soldItems.find(i => i.itemID === Number(item_ID) && i.showID === show_ID);
		if (soldItem) {
			soldItem.quantity++;
		} else {
			this.soldItems.push({
				itemID: Number(item_ID),
				showID: show_ID,
				itemName: item.itemName,
				quantity: 1
			});
		}
		return h.response().code(200);
	};
	
	getSoldItemsHandler = (request: Request, h: ResponseToolkit): ResponseObject => {
		const { show_ID, item_id } = request.params;
		if (item_id) {
			const soldItem = this.soldItems.find(i => i.itemID === item_id && i.showID === show_ID);
			if (soldItem) {
				return h.response({ itemName: soldItem.itemName, quantity: soldItem.quantity }).code(200);
			}
			return h.response('Item not found').code(404);
		}
		return h.response(this.soldItems.filter(i => i.showID === show_ID)).code(200);
	};
}
export default InventoryController
