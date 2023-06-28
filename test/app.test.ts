import server from '../src/app';

beforeAll(async () => {
	await server.initialize();
});

afterAll(async () => {
	await server.stop();
});

describe('POST /inventory', () => {
	it('should add items to inventory', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/inventory',
			payload: [
				{ itemID: 12345, itemName: 'Fancy Dress', quantity: 10 }
			]
		});
		
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe(null);
	});
	
	it('should update existing item', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/inventory',
			payload: [
				{ itemID: 12345, itemName: 'Updated Fancy Dress', quantity: 15 }
			]
		});
		
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe(null);
	});
});

describe('POST /show/{show_ID}/buy_item/{item_ID}', () => {
	it('should deduct one item from inventory', async () => {
		const response = await server.inject({
			method: 'POST',
			url: '/show/test-show/buy_item/12345',
		});
		
		expect(response.statusCode).toBe(200);
		expect(response.result).toBe(null);
	});
	
	it('should return error if there is insufficient inventory', async () => {
		// Buy all items to empty inventory
		for (let i = 0; i < 15; i++) {
			await server.inject({
				method: 'POST',
				url: '/show/test-show/buy_item/12345',
			});
		}
		
		const response = await server.inject({
			method: 'POST',
			url: '/show/test-show/buy_item/12345',
		});
		
		expect(response.statusCode).toBe(400);
		expect(response.result).toEqual('Insufficient inventory');
	});
});

describe('GET /show/{show_ID}/sold_items/{item_id}', () => {
	it('should return the name and quantity of item sold by show_ID', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/show/test-show/sold_items/12345',
		});
		
		expect(response.statusCode).toBe(200);
		expect(response.result).toEqual({
			itemName: 'Updated Fancy Dress',
			quantity: 15
		});
	});
	
	it('should return a list of all items sold by show_ID', async () => {
		const response = await server.inject({
			method: 'GET',
			url: '/show/test-show/sold_items',
		});
		
		expect(response.statusCode).toBe(200);
		expect(Array.isArray(response.result)).toBe(true);
	});
});
