import { getCollection } from '@/lib/db';

export async function getProducts() {
  const productsCollection = await getCollection('products');
  const products = await productsCollection?.find({}).toArray();

  return products;
}
