import React from 'react';
import { SegmentedControl } from '@mantine/core';
import { categories } from '@prisma/client';

type CategoryListProps = {
  categoryList: categories[];
  selectedCategory: string;
  onSelectCategory: Function;
};

const CategoryList = ({
  categoryList,
  selectedCategory,
  onSelectCategory,
}: CategoryListProps) => {
  return (
    <div className="mb-4">
      {categoryList ? (
        <SegmentedControl
          color="dark"
          value={selectedCategory}
          onChange={onSelectCategory}
          data={[
            { label: 'ALL', value: '-1' },
            ...categoryList.map((category) => ({
              label: category.name,
              value: String(category.id),
            })),
          ]}
        />
      ) : null}
    </div>
  );
};

export default CategoryList;
