import Joi, { ArraySchema, ObjectSchema } from "joi";

export const itemSchema: ObjectSchema = Joi.object({
	itemID: Joi.number().required(),
	itemName: Joi.string().required(),
	quantity: Joi.number().required()
});

export const inventorySchema: ArraySchema = Joi.array().items(itemSchema);

export const buyItemParamsSchema: ObjectSchema = Joi.object({
	show_ID: Joi.string().required(),
	item_ID: Joi.number().required()
});

export const getSoldItemsParamsSchema: ObjectSchema = Joi.object({
	show_ID: Joi.string().required(),
	item_id: Joi.number().optional()
});
