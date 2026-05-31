'use client';

import React, { useState } from 'react';
import SelectFile from './SelectFile';
import ProductInput from './ProductInput';
import { Toaster } from 'sonner';

function AddProduct() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="flex flex-row p-4 justify-between overflow-y-auto custom-scrollbar w-full">
      <SelectFile onImageUploaded={setImageUrl} />
      <ProductInput imageUrl={imageUrl} />
     
    </div>
  );
}

export default AddProduct;
