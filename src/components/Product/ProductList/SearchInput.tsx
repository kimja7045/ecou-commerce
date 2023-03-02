import { Input } from '@mantine/core';
import { ChangeEventHandler } from 'react';

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="mb-4">
      <Input placeholder="Eco Pants" value={value} onChange={onChange} />
      {/* <Input icon={<IconSearch />} placeholder="Eco Pants" /> */}
    </div>
  );
};

export default SearchInput;
