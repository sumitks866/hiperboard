"use client";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { isNull } from "lodash";
import { verifyUser } from "@/lib/store/auth/authSlice";
import AppLayout from "@/components/Wrappers/AppLayout";
import { fetchUserDetails } from "@/lib/store/user/userSlice";
import { useSearchParams } from "next/navigation";
import Workspace from "@/components/User/Workspace";

export default function Page() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const dispatch = useDispatch<AppDispatch>();
  const { activeUser } = useAppSelector((state) => state.authReducer);
  const { user } = useAppSelector((state) => state.userReducer);

  useEffect(() => {
    if (isNull(activeUser)) {
      dispatch(verifyUser());
    }

    if (isNull(user)) {
      dispatch(fetchUserDetails());
    }
  }, [activeUser, user, dispatch]);

  if (isNull(user)) return null;

  const getActiveView = (): React.ReactNode => {
    switch (view) {
      default:
        return <Workspace companyRoles={user.companyRoles} />;
    }
  };

  return (
    <AppLayout>
      <div className="w-full mx-auto h-full flex bg-white">
        {getActiveView()}
      </div>
    </AppLayout>
  );
}
