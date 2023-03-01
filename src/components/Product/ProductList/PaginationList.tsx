import { Pagination } from '@mantine/core';
import { Dispatch, SetStateAction } from 'react';

type PaginationProps = {
  activePage: number;
  setActivePage: Dispatch<SetStateAction<number>>;
  totalPage: number;
};

const PaginationList = ({
  activePage,
  setActivePage,
  totalPage,
}: PaginationProps) => {
  return (
    <div className="w-full flex mt-16">
      <Pagination
        className="m-auto"
        page={activePage}
        onChange={setActivePage}
        total={totalPage}
      />
    </div>
  );
};

export default PaginationList;
