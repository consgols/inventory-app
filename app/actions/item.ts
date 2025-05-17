'use server';

import { getCollection } from '@/lib/db';
import getAuthUser from '@/lib/getAuthUser';
import { ItemFormSchema } from '@/lib/rules';
import { ObjectId } from 'mongodb';
import { redirect } from 'next/navigation';

export type ResponseType = {
  errors: {
    name?: string[] | string | undefined;
    price?: string[] | string | undefined;
    description?: string[] | undefined;
    category?: string[] | undefined;
  };
  message?: string;
};

export async function addProduct(state: unknown, formData: FormData): Promise<ResponseType> {
  const user = await getAuthUser();
  //Check if the user is authenticated. If not, redirect to the login page.
  if (!user) return redirect('/login');

  const validatedFields = ItemFormSchema.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    description: formData.get('description'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) return { errors: validatedFields.error.flatten().fieldErrors };

  const { name, price, description, category } = validatedFields.data;

  const productsCollection = await getCollection('products');

  if (!productsCollection) return { errors: {}, message: 'Server Error!' };

  const existingUser = await productsCollection?.findOne({ name });
  if (existingUser) return { errors: {}, message: 'Product already exists!' };

  try {
    await productsCollection?.insertOne({
      name,
      price,
      description,
      category,
      userId: ObjectId.createFromHexString(user.userId as string),
    });
  } catch (error) {
    console.log('Error adding product:', error);
    return { errors: {}, message: 'Server Error!' };
  }

  redirect('/product/items'); // Redirect to the products page after adding the product
}

export async function deleteProduct(state: unknown, formData: FormData) {
  const productsCollection = await getCollection('products');
  await productsCollection?.deleteOne({ _id: new ObjectId(formData.get('id') as string) });
  redirect('/product/items'); // Redirect to the products page after deleting the product
}
