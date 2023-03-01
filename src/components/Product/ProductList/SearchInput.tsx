import { Input } from '@mantine/core';
import React from 'react';

const SearchInput = () => {
  return (
    <div className="mb-4">
      <Input placeholder="Eco Pants" />
      {/* <Input icon={<IconSearch />} placeholder="Eco Pants" /> */}
    </div>
  );
};

export default SearchInput;
