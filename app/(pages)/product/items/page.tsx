import React from 'react';
import Box from '@/components/Box';
import { AddProductDialog } from './component/AddProduct';
import { CustomDataTable } from '@/components/custom-data-table';
import { getCollection } from '@/lib/db';

const Items = async () => {
  const productsCollection = await getCollection('products');
  const products = await productsCollection?.find({}).toArray();

  return (
    <>
      <Box>
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All Items</h2>
            <p className="text-muted-foreground">Here&apos;s a list of all of your items.</p>
          </div>
          <div className="flex flex-col gap-4">
            <AddProductDialog />
          </div>
        </div>
      </Box>
      <Box>
        <CustomDataTable data={JSON.parse(JSON.stringify(products))} />
      </Box>
    </>
  );
};

export default Items;
