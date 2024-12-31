import User from "./../types/User";
import { FilterSettings } from "./../types/FilterSettings";
import UserStatus from "../types/UserStatus";

const filterData = (data: User[], filterSettings: FilterSettings): User[] => {
  const hasSearchString = filterSettings.searchString.length > 0;
  data = data.filter((userData) => {
    if (
      hasSearchString &&
      !userData.name
        .toLocaleLowerCase()
        .includes(filterSettings.searchString.toLocaleLowerCase())
    ) {
      return false;
    }
    if (!filterSettings.show.includes(userData.status as UserStatus)) {
      return false;
    }

    return true;
  });

  return data;
};

export default filterData;
