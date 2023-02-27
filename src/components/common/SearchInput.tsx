import { Input } from '@mantine/core';
// import { IconSearch } from '@tabler/icons';
import React from 'react';

const SearchInput = () => {
  return (
    <div className="mb-4">
      <Input
        //   icon={<IconSearch />}
        placeholder="Eco Pants"
      />
    </div>
  );
};

export default SearchInput;
