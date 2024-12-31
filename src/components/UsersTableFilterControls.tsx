import { FilterSettings } from "../types/FilterSettings";
import UserStatus from "../types/UserStatus";

type UsersTableFilterControlsProps = {
  filterSettings: FilterSettings;
  setFilterSettings: React.Dispatch<React.SetStateAction<FilterSettings>>;
  setOffset: React.Dispatch<React.SetStateAction<number>>;
};

/*
For reasons unknown, some of the styles in index.css stopped being 
applied to the buttons after adding the <Wrapper> layer, 
with an inline-defined "reset" stylsheet (which I didn't write!)
taking precedence. No idea.
*/
export const UsersTableFilterControls = ({
  filterSettings,
  setFilterSettings,
  setOffset,
}: UsersTableFilterControlsProps) => {
  const toggleFilterSettingsShow = (userStatus: UserStatus) => {
    const index = filterSettings.show.indexOf(userStatus);
    if (index !== -1) {
      setFilterSettings((settings) => {
        let show = [...settings.show];
        show.splice(index, 1);
        return {
          ...settings,
          show: show,
        };
      });
    } else {
      setFilterSettings((settings) => {
        return {
          ...settings,
          show: [...settings.show, userStatus],
        };
      });
    }
    setOffset(0);
  };
  return (
    <div className="flex flex-row gap-4 flex-wrap w-full align-items-center mb-4">
      <div className="flex flex-row gap-4 items-center">
        <span className="flex items-center w-12">Filter:</span>
        <input
          type="text"
          className="rounded-md border border-1 border-dark-lightened dark:border-light-darkened pl-2 py-1 max-w-[20rem]"
          onChange={(e) => {
            setFilterSettings((oldFilterSettings) => {
              return {
                ...oldFilterSettings,
                searchString: e.target.value,
              };
            });
            setOffset(0);
          }}
        />
      </div>
      <div className="flex flex-row flex-wrap gap-4">
        <span className="flex items-center">Show:</span>
        <div className="flex gap-2 item-stretch  flex-wrap">
          <button
            onClick={(e) => {
              toggleFilterSettingsShow(UserStatus.Active);
            }}
            className={`py-2 px-4
            rounded-md
            dark:bg-dark-darkened
            dark:hover:bg-dark-hover
            light:bg-light-darkened
            light:hover:bg-light-hover
            ${
              filterSettings.show.includes(UserStatus.Active)
                ? "border border-1 border-dark-lightened dark:border-light-darkened"
                : ""
            }`}
          >
            active
          </button>
          <button
            onClick={(e) => {
              toggleFilterSettingsShow(UserStatus.Invited);
            }}
            className={`py-2 px-4
            rounded-md
            dark:bg-dark-darkened
            dark:hover:bg-dark-hover
            light:bg-light-darkened
            light:hover:bg-light-hover
            ${
              filterSettings.show.includes(UserStatus.Invited)
                ? "border border-1 border-dark-lightened dark:border-light-darkened"
                : ""
            }`}
          >
            invited
          </button>
          <button
            onClick={(e) => {
              toggleFilterSettingsShow(UserStatus.InviteExpired);
            }}
            className={`py-2 px-4
          rounded-md
          dark:bg-dark-darkened
          dark:hover:bg-dark-hover
          light:bg-light-darkened
          light:hover:bg-light-hover
          ${
            filterSettings.show.includes(UserStatus.InviteExpired)
              ? "border border-1 border-dark-lightened dark:border-light-darkened"
              : ""
          }`}
          >
            invite expired
          </button>
        </div>
      </div>
    </div>
  );
};
