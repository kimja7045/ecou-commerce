import { categories } from '@prisma/client';
import React from 'react';

const CategoryList = ({ categoryList }: { categoryList: categories[] }) => {
  return (
    <>
      {categoryList?.map((category) => (
        <div key={category.id}>{category.name}</div>
      ))}
    </>
  );
};

export default CategoryList;
