'use client';

import { useActionState, useEffect } from 'react';
import { addProduct } from '@/app/actions/item';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { IconSquarePlus } from '@tabler/icons-react';
import { toast } from 'sonner';

export function AddProductDialog() {
  const [state, action, isPending] = useActionState(addProduct, undefined);

  useEffect(() => {
    if (state) {
      if (state?.errors) {
        (() => {
          toast.error(
            <ul>
              <li>{state.errors.name}</li>
              <li>{state.errors.price}</li>
              <li>{state.errors.description}</li>
              <li>{state.errors.category}</li>
              <li>{state.message}</li>
            </ul>,
            {
              richColors: true,
            },
          );
        })();
      }
    }
  }, [state]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <IconSquarePlus />
          Add New Item
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
        </DialogHeader>
        <form action={action}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input id="name" name="name" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input id="price" type="number" name="price" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input id="description" name="description" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Select name="category" defaultValue="apple">
                <SelectTrigger className="w-full col-span-3" id="category">
                  <SelectValue placeholder="Select a fruit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">{isPending ? 'processing...' : 'Add Product'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
