import { useQuery } from "react-query";
import { UsersTable } from "./UsersTable";
import { useEffect, useState } from "react";
import { AscDesc, FilterSettings } from "../types/FilterSettings";
import UserStatus from "../types/UserStatus";
import { UsersTableFilterControls } from "./UsersTableFilterControls";
import OrderBy from "../types/OrderBy";
import { getUsers } from "../getUsers";
import User from "../types/User";
import filterData from "../utilities/filterData";
import sortData from "../utilities/sortData";

/*
  this component exists primarily as a level at which the data returned by
  the useQuery is available to both <Users> and <FilterControls>,
  while being beneath the wrapping QueryClientProvider.
*/
export default function FormWrapper() {
  const { isLoading, isSuccess, isError, data } = useQuery<User[]>(
    ["users"],
    getUsers
  );
  const [copiedData, setCopiedData] = useState<User[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [filterSettings, setFilterSettings] = useState<FilterSettings>({
    show: [UserStatus.Active, UserStatus.Invited, UserStatus.InviteExpired],
    orderByField: OrderBy.Name,
    orderAscDesc: AscDesc.Asc,
    searchString: "",
  });

  /*
    run when the length of the relevant section of the data can change
  */
  useEffect(() => {
    if (data) {
      setCopiedData(sortData(filterData(data, filterSettings), filterSettings));
    } else {
      setCopiedData([]);
    }
  }, [data, filterSettings]);

  /*
    run when a User is altered
  */
  useEffect(() => {
    if (copiedData) {
      setCopiedData(sortData(copiedData, filterSettings));
    } else {
      setCopiedData([]);
    }
  }, [copiedData]);

  return (
    <div className="w-screen max-w-screen flex flex-col min-h-screen p-4">
      <UsersTableFilterControls
        filterSettings={filterSettings}
        setFilterSettings={setFilterSettings}
        offset={offset}
        setOffset={setOffset}
      />
      <UsersTable
        copiedData={copiedData}
        setCopiedData={setCopiedData}
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        filterSettings={filterSettings}
        setFilterSettings={setFilterSettings}
        offset={offset}
        setOffset={setOffset}
      />
    </div>
  );
}
