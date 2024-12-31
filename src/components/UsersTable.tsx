import UserDetails from "./UserDetails";
import ArrowDown from "./svg/ArrowUp";
import ArrowUp from "./svg/ArrowDown";
import { AscDesc, FilterSettings } from "../types/FilterSettings";
import OrderBy from "../types/OrderBy";
import { useEffect, useRef, useState } from "react";
import EditUserDialog from "./EditUserDialog";
import User from "../types/User";
import UserTablePaginationControls from "./UserTablePaginationControls";

type UsersProps = {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  copiedData: User[];
  setCopiedData: React.Dispatch<React.SetStateAction<User[]>>;
  filterSettings: FilterSettings;
  setFilterSettings: React.Dispatch<React.SetStateAction<FilterSettings>>;
  offset: number;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

export const UsersTable = ({
  isLoading,
  isSuccess,
  isError,
  copiedData,
  setCopiedData,
  filterSettings,
  setFilterSettings,
  offset,
  setOffset,
}: UsersProps) => {
  debugger;
  const [editingModalUser, setEditingModalUser] = useState<User | undefined>(
    undefined
  );
  const [pageSize, setPageSize] = useState<number>(10);
  const changeOrderBy = (newOrderBy: OrderBy) => {
    let newAscDesc = AscDesc.Asc;
    if (filterSettings.orderByField === newOrderBy) {
      if (filterSettings.orderAscDesc === AscDesc.Asc) {
        newAscDesc = AscDesc.Desc;
      }
    }
    setFilterSettings((oldFilterSettings) => {
      return {
        ...oldFilterSettings,
        orderByField: newOrderBy,
        orderAscDesc: newAscDesc,
      };
    });
  };

  return isSuccess ? (
    copiedData.length > 0 ? (
      <>
        {editingModalUser !== undefined && (
          <EditUserDialog
            setEditingModalUser={setEditingModalUser}
            setCopiedData={setCopiedData}
            editingModalUser={editingModalUser}
            filterSettings={filterSettings}
          />
        )}
        <UserTablePaginationControls
          offset={offset}
          pageSize={pageSize}
          dataLength={copiedData.length}
          setOffset={setOffset}
          setPageSize={setPageSize}
        />
        <table className="border-collapse border border-1 border-dark-lightened dark:border-light-darkened mb-1 w-full max-w-full">
          <thead className="border-dark-lightened dark:border-light-darkened border-b border-b-1 border-t border-t-1 text-left">
            <tr>
              <th className="p-0">
                <button
                  className="pl-4 bg-transparent hover:dark:bg-dark-hover hover:light:bg-light-hover w-full text-left rounded-none h-12 flex flex-row items-center"
                  onClick={() => {
                    changeOrderBy(OrderBy.Name);
                  }}
                >
                  <span className="mr-2">User</span>
                  {filterSettings.orderByField === OrderBy.Name ? (
                    filterSettings.orderAscDesc === AscDesc.Asc ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    )
                  ) : (
                    <div className="w-6 h-6"></div>
                  )}
                </button>
              </th>
              <th className="p-0 w-20">
                <button
                  onClick={() => {
                    changeOrderBy(OrderBy.ID);
                  }}
                  className="pl-4 bg-transparent hover:dark:bg-dark-hover hover:light:bg-light-hover w-full text-left rounded-none h-12 flex flex-row items-center"
                >
                  <span className="mr-2">ID</span>
                  {filterSettings.orderByField === OrderBy.ID ? (
                    filterSettings.orderAscDesc === AscDesc.Asc ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    )
                  ) : (
                    <div className="w-6 h-6"></div>
                  )}
                </button>
              </th>
              <th colSpan={2} className="p-0 w-40 max-w-40">
                <button
                  onClick={() => {
                    changeOrderBy(OrderBy.UserStatus);
                  }}
                  className="w-[calc(100% + 2.3rem)] mr-[-2.3rem] pl-4 bg-transparent hover:dark:bg-dark-hover hover:light:bg-light-hover w-full text-left rounded-none h-12 flex flex-row items-center"
                >
                  <span className="mr-2">Status</span>
                  {filterSettings.orderByField === OrderBy.UserStatus ? (
                    filterSettings.orderAscDesc === AscDesc.Asc ? (
                      <ArrowUp />
                    ) : (
                      <ArrowDown />
                    )
                  ) : (
                    <div className="w-6 h-6"></div>
                  )}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {copiedData.slice(offset, offset + pageSize).map((user, i) => {
              return (
                <UserDetails
                  {...user}
                  setEditingModalUser={setEditingModalUser}
                  key={i}
                />
              );
            })}
          </tbody>
        </table>
        <UserTablePaginationControls
          offset={offset}
          pageSize={pageSize}
          dataLength={copiedData.length}
          setOffset={setOffset}
          setPageSize={setPageSize}
        />
      </>
    ) : (
      <p>No results</p>
    )
  ) : isError ? (
    <div className="border border-1 dark:border-light-darkened light:border-dark-darkened flex items-center justify-center grow-[2]">
      <p>Error</p>
    </div>
  ) : isLoading ? (
    <div className="border border-1 dark:border-light-darkened light:border-dark-darkened flex items-center justify-center grow-[2]">
      <p>Loading...</p>
    </div>
  ) : (
    <div className="border border-1 dark:border-light-darkened light:border-dark-darkened flex items-center justify-center grow-[2]">
      <span>Error</span>
    </div>
  );
};
