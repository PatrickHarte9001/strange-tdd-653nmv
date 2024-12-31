import User from "./../types/User";
import { AscDesc, FilterSettings } from "./../types/FilterSettings";
import OrderBy from "../types/OrderBy";

const sortData = (
  copiedData: User[],
  filterSettings: FilterSettings
): User[] => {
  copiedData.sort((a, b) => {
    let rv = 0;
    if (filterSettings.orderByField === OrderBy.Name) {
      rv = a.name.localeCompare(b.name);
    } else {
      if (filterSettings.orderByField === OrderBy.ID) {
        rv = a.id - b.id;
      } else {
        rv = a.status.localeCompare(b.status);
      }
    }
    return rv * (filterSettings.orderAscDesc === AscDesc.Asc ? 1 : -1);
  });

  return copiedData;
};

export default sortData;
