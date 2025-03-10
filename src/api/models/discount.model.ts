import { model, Schema } from 'mongoose';
import { timestamps, required, ObjectId } from '../../configs/mongoose.config';
import { PRODUCT_MODEL_NAME } from './product.model';
import { USER_MODEL_NAME } from './user.model';

export const DISCOUNT_MODEL_NAME = 'Discount';
export const DISCOUNT_COLLECTION_NAME = 'discounts';

const discountSchema = new Schema<modelTypes.discount.DiscountSchema>(
    {
        discount_shop: { type: ObjectId, ref: USER_MODEL_NAME, required },
        discount_code: { type: String, minLength: 6, maxLength: 6, required },
        discount_name: { type: String, required },
        discount_type: {
            type: String,
            enum: ['percentage', 'fixed'],
            required
        },
        discount_value: { type: Number, required },
        discount_count: { type: Number, required },
        discount_min_cost: { type: Number },
        discount_products: {
            type: [{ type: ObjectId, ref: PRODUCT_MODEL_NAME }],
            default: []
        },
        discount_end_at: { type: Date, required },
        discount_start_at: { type: Date, required },
        is_admin_voucher: { type: Boolean, default: false, select: false },
        is_available: { type: Boolean, default: false }
    },
    {
        timestamps,
        collection: DISCOUNT_COLLECTION_NAME
    }
);

/* ------------- Unique discount code in a shop  ------------- */
discountSchema.index({ discount_code: 1, discount_shop: 1 }, { unique: true });

export default model(DISCOUNT_MODEL_NAME, discountSchema);
