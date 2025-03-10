import {model, Schema} from "mongoose";
import { timestamps } from "../../configs/mongoose.config";

export const INVENTORY_MODEL_NAME = "Inventory";
export const INVENTORY_COLLECTION_NAME = "inventories";

const inventorySchema = new Schema({}, {
    collection: INVENTORY_COLLECTION_NAME,
    timestamps,
});

export default model(INVENTORY_MODEL_NAME, inventorySchema)
