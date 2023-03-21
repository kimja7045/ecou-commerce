import { Input } from '@mantine/core';
import { ChangeEventHandler } from 'react';
import { BiSearchAlt } from 'react-icons/bi';

type SearchInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <div className="mb-4">
      <Input
        icon={<BiSearchAlt size={18} style={{ marginRight: -10 }} />}
        placeholder="Eco Pants"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
