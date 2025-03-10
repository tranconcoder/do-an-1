import '';

declare global {
    namespace modelTypes {
        namespace discount {
            interface DiscountSchema {
                discount_shop: moduleTypes.mongoose.ObjectId;
                discount_products: Array<moduleTypes.mongoose.ObjectId>;
                discount_code: string;
                discount_name: string;
                discount_type: 'percentage' | 'fixed';
                discount_value: number;
                discount_count: number;
                discount_min_cost?: number; // Minimum cost to apply discount
                discount_start_at: Date;
                discount_end_at: Date;
                is_admin_voucher?: boolean;
            }
        }
    }
}
