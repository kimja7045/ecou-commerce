import React, { useState } from 'react';
import { SegmentedControl } from '@mantine/core';
import { categories } from '@prisma/client';

const CategoryList = ({
  categoryList,
}: {
  categoryList: categories[];
  onSelectCategory: Function;
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('-1');

  return (
    <div className="mb-4">
      {categoryList ? (
        <SegmentedControl
          color="dark"
          value={selectedCategory}
          onChange={setSelectedCategory}
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
