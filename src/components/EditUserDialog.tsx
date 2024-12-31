import React, { ForwardedRef, forwardRef, useState } from "react";
import User from "../types/User";
import { FilterSettings } from "../types/FilterSettings";

type EditUserDialogProps = {
  editingModalUser: User;
  setEditingModalUser: React.Dispatch<React.SetStateAction<User | undefined>>;
  setMasterData: React.Dispatch<React.SetStateAction<User[]>>;
  filterSettings: FilterSettings;
};

const validateEmail = (email: string): boolean => {
  //courtesy of https://stackoverflow.com/questions/201323/how-can-i-validate-an-email-address-using-a-regular-expression
  const regExp = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );
  return !regExp.test(email);
};

const EditUserDialog = ({
  editingModalUser,
  setEditingModalUser,
  setMasterData,
}: EditUserDialogProps) => {
  const [tempUser] = useState<User>(editingModalUser);
  const [nameError, setNameError] = useState<boolean>(() => {
    return editingModalUser.name.length === 0;
  });
  const [emailError, setEmailError] = useState<boolean>(() => {
    return validateEmail(tempUser.email);
  });
  return (
    <dialog
      autoFocus={true}
      open={true}
      className="bg-light-lightened dark:bg-dark p-8 border border-2 border-dark dark:border-light rounded-md"
    >
      <form
        className="flex flex-col"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setMasterData((oldMasterData) => {
            let index = oldMasterData.findIndex((v) => {
              return v.id === editingModalUser.id;
            });
            oldMasterData[index] = {
              id: tempUser.id,
              name:
                (formData.get("edit-modal-dialog-name") as string) ??
                tempUser.name,
              email:
                (formData.get("edit-modal-dialog-email") as string) ??
                tempUser.email,
              status:
                (formData.get("edit-modal-dialog-status") as string) ??
                tempUser.status,
            };
            return [...oldMasterData];
          });
          setEditingModalUser(undefined);
        }}
      >
        <h2 className="mb-8">Edit User Information</h2>
        <div
          className="mb-6 grid items-center gap-y-2 gap-x-4"
          style={{
            gridTemplateColumns: "max-content 1fr",
            gridTemplateRows: "min-content min-content min-content",
          }}
        >
          <label htmlFor="edit-modal-dialog-name">Name: </label>
          <input
            id="edit-modal-dialog-name"
            className={`p-2 rounded-md border border-1 border-dark-darkened dark:border-light-darkened ${
              nameError ? "border-red-500" : ""
            }`}
            name="edit-modal-dialog-name"
            type="text"
            defaultValue={tempUser?.name}
            onChange={(e) => {
              setNameError(e.target.value.length === 0);
            }}
          />
          <label htmlFor="edit-modal-dialog-email">Email: </label>
          <input
            id="edit-modal-dialog-email"
            className={`p-2 rounded-md border border-1 border-dark-darkened dark:border-light-darkened ${
              emailError ? "border-red-500" : ""
            }`}
            name="edit-modal-dialog-email"
            type="text"
            defaultValue={tempUser?.email}
            onChange={(e) => {
              setEmailError(validateEmail(e.target.value));
            }}
          />
          <label htmlFor="edit-modal-dialog-status">Status: </label>
          <select
            className="p-2 rounded-md border border-1 border-dark-darkened dark:border-light-darkened"
            name="edit-modal-dialog-status"
            defaultValue={tempUser?.status}
            id="edit-modal-dialog-status"
          >
            <option selected={tempUser?.status === "active"} value="active">
              active
            </option>
            <option selected={tempUser?.status === "invited"} value="invited">
              invited
            </option>
            <option
              selected={tempUser?.status === "invite expired"}
              value="invite expired"
            >
              invite expired
            </option>
          </select>
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="h-10 py-2 grow rounded-md border border-1 border-dark-darkened dark:border-light-darkened disabled:opacity-50 disabled:border-transparent hover:bg-light-hover dark:hover:bg-dark-hover"
            disabled={nameError || emailError}
          >
            Save ✅
          </button>
          <button
            className="h-10 py-2 grow rounded-md border border-1 border-dark-darkened dark:border-light-darkened hover:bg-light-hover dark:hover:bg-dark-hover"
            onClick={() => {
              setEditingModalUser(undefined);
            }}
          >
            Cancel ❌
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default EditUserDialog;
