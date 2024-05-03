import { Category } from '../models/categoryModel';
import { Product } from '../models/productModel';

class ProductRespository {
  create = async (product: object) => {
    return await Product.create(product);
  };

  async findProducts() {
    const res = await (Product as any).paginate({
      limit: 1,
    });

    if (res?.results) {
      const { results: products, ...others } = res;

      return {
        products,
        ...others,
      };
    }

    // if there is no data
    return {
      products: [],
      next: null,
      previous: null,
      hasNext: false,
      hasPrevious: false,
    };
  }

  findProduct = async (param: string) => {
    return await Product.findOne({
      $or: [{ _id: param }, { name: param }],
    }).exec();
  };

  findById = async (id: string) => {
    return await Product.findById(id).exec();
  };

  findChildCategory = async (id: string) => {
    return await Category.find({ parent: id }).exec();
  };

  updateProduct = async (condition: object, data: object) => {
    return await Product.findOneAndUpdate(condition, data, {
      new: true,
    }).exec();
  };

  checkIfIsDeletable = async (id: string): Promise<boolean> => {
    let category = await this.findById(id);

    if (!category) {
      return false;
    }

    const findChildCategory = await this.findChildCategory(id);
    //const products = await this.findChildCategory(id);

    if (findChildCategory) {
      return false;
    }

    return true;
  };

  deleteProduct = async (id: string) => {
    return await Category.findByIdAndDelete(id).exec();
  };
}

export default new ProductRespository();
