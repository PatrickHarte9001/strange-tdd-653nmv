import React from "react";
import ArrowLeft from "./svg/ArrowLeft";
import ArrowRight from "./svg/ArrowRight";
import ArrowDoubleLeft from "./svg/ArrowDoubleLeft";
import ArrowDoubleRight from "./svg/ArrowDoubleRight";

type UserTablePaginationControlsProps = {
  offset: number;
  pageSize: number;
  dataLength: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
  setPageSize: React.Dispatch<React.SetStateAction<number>>;
};

const UserTablePaginationControls = ({
  offset,
  pageSize,
  dataLength,
  setOffset,
  setPageSize,
}: UserTablePaginationControlsProps) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-between my-2 gap-2">
      <label htmlFor="select-page-size">
        Page size:
        <select
          id="select-page-size"
          className="rounded-md border border-1 border-dark-darkened dark:border-light-darkened py-2 px-4 ml-2 mb-0 rounded-md h-10"
          defaultValue={pageSize.toLocaleString()}
          onChange={(e) => {
            setOffset(0);
            setPageSize(parseInt(e.target.value));
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
        </select>
      </label>
      <div className="flex flex-row flex-wrap gap-2 items-center">
        <div className="flex flex-row items-center h-10">
          <span>
            Page {Math.floor(offset / pageSize) + 1} of{" "}
            {Math.ceil(dataLength / pageSize)}
          </span>
        </div>
        <div>
          <button
            className="rounded-md border border-1 border-dark-darkened dark:border-light-darkened py-2 px-4 disabled:border-transparent disabled:opacity-50 rounded-md mr-2"
            disabled={offset === 0}
            onClick={() => {
              setOffset(0);
            }}
          >
            <ArrowDoubleLeft />
          </button>
          <button
            disabled={offset - pageSize < 0}
            onClick={() => {
              setOffset((oldOffset) => {
                return oldOffset - pageSize;
              });
            }}
            className="rounded-md border border-1 border-dark-darkened dark:border-light-darkened py-2 px-4 disabled:border-transparent disabled:opacity-50 rounded-md mr-2"
          >
            <ArrowLeft />
          </button>
          <button
            className="rounded-md border border-1 border-dark-darkened dark:border-light-darkened py-2 px-4 disabled:border-transparent disabled:opacity-50 rounded-md mr-2"
            disabled={offset + pageSize >= dataLength}
            onClick={() => {
              setOffset((oldOffset) => {
                return oldOffset + pageSize;
              });
            }}
          >
            <ArrowRight />
          </button>
          <button
            className="rounded-md border border-1 border-dark-darkened dark:border-light-darkened py-2 px-4 disabled:border-transparent disabled:opacity-50 dark:border-light light:border-dark rounded-md"
            disabled={offset + pageSize >= dataLength}
            onClick={() => {
              setOffset((Math.ceil(dataLength / pageSize) - 1) * pageSize);
            }}
          >
            <ArrowDoubleRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserTablePaginationControls;
