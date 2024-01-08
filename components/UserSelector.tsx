import { IUser, SelectOption } from "@/utils/types";
import React, { useMemo } from "react";
import Select from "./Select/Select";
import isUndefined from "lodash/isUndefined";

interface IProps {
  usersList: IUser[];
  selectedUser?: IUser;
  setSelectedUser: React.Dispatch<React.SetStateAction<IUser | undefined>>;
  label?: string;
  id?: string;
  classname?: string;
}

const getUserLabel = (user: IUser | undefined) => {
  return isUndefined(user) ? "" : `${user.firstname} ${user.lastname || ""}`;
};

export default function UserSelector({
  usersList,
  selectedUser,
  setSelectedUser,
  label,
  id,
  classname,
}: IProps) {
  const userOptons: SelectOption<IUser>[] = useMemo(
    () =>
      usersList.map((user) => ({
        value: user,
        label: getUserLabel(user),
      })),
    [usersList]
  );

  const handleUserSelect = (value: any) => {
    setSelectedUser(value.value);
  };

  return (
    <Select
      label={label || "User"}
      id={id || "user-selector"}
      value={getUserLabel(selectedUser)}
      onChange={handleUserSelect}
      options={userOptons}
      classname={classname}
      typeahead
      placeholder=""
    />
  );
}
