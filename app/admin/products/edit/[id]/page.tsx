import {prisma} from '@/lib/prisma';

import { ProductAction } from '@/lib/type';
import ProductInput from '../../add-product/ProductInput';

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EditProductPage({ params }: PageProps) {
  const {id} = await params;

  console.log('EDIT PRODUCT ID:', id);

  if (!id) {
    return <div className="p-4">Invalid product ID</div>;
  }

  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  /**
   * Normalize Prisma result to match frontend Product type
   * (action from string | null → ProductAction)
   */
  const normalizedProduct = {
    ...product,
    action: (product.action ?? 'Publish') as ProductAction,
  };

  return (
    <ProductInput
      mode="edit"
      imageUrl={normalizedProduct.imageUrl}
      initialProduct={normalizedProduct}
    />
  );
}
