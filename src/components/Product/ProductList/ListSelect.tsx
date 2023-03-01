import { FILTER_LIST } from '@/constants/products';
import { Select } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

type ListSelectProps = {
  selectedValue: string | null;
  setSelectedValue: Dispatch<SetStateAction<string | null>>;
};

const ListSelect = ({ selectedValue, setSelectedValue }: ListSelectProps) => {
  return (
    <div className="mb-4">
      <Select
        value={selectedValue}
        onChange={setSelectedValue}
        data={FILTER_LIST}
      />
    </div>
  );
};

export default ListSelect;
