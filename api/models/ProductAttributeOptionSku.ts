import { Schema, model, Model, Document, Types } from "mongoose";
import { IProduct } from "./productModel";
import { IProductAttributeOption } from "./productAttributeOption";
import { IProductSku } from "./productSku";

export interface IProductAttributeOptionSku extends Document {
  _id: Types.ObjectId;
  attribute_option: IProductAttributeOption;
  product_sku: IProductSku;
}

const ProductAttributeOptionSkuSchema = new Schema<IProductAttributeOptionSku>(
  {
    attribute_option: {
      type: Types.ObjectId,
      ref: "ProductAttributeOption",
      required: true,
    },
    product_sku: {
      type: Types.ObjectId,
      ref: "ProductSku",
      required: true,
    },
  },
  { timestamps: true }
);

export const ProductAttributeOptionSku: Model<IProductAttributeOptionSku> =
  model<IProductAttributeOptionSku>(
    "ProductAttributeOptionSku",
    ProductAttributeOptionSkuSchema
  );
