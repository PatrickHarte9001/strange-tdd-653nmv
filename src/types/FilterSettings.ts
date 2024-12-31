import UserStatus from "./UserStatus";
import OrderBy from "./OrderBy";

export enum AscDesc {
  Asc,
  Desc,
}

export type FilterSettings = {
  show: UserStatus[];
  orderByField: OrderBy;
  orderAscDesc: AscDesc;
  searchString: string;
};
