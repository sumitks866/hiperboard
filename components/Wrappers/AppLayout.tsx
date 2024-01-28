"use client";
import React, { ReactNode, useEffect } from "react";
import Header from "../Headers/Header";
import NavigationWrapper from "../Navigation/NavigationWrapper";
import { isNull, isUndefined } from "lodash";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { useDispatch } from "react-redux";
import {
  fetchUserDetails,
  setActiveCompany,
} from "@/lib/store/user/globalSlice";
import { useParams, usePathname } from "next/navigation";
import WorkspaceNavigator from "../Navigation/WorkspaceNavigator";
import BoardNavigator from "../Navigation/BoardNavigator";
import UserNavigator from "../Navigation/UserNavigator";
import { verifyUser } from "@/lib/store/auth/authSlice";
import { useQuery } from "react-query";
import { getProjectsByCompanyId } from "@/api/project";
import { updateProjectList } from "@/lib/store/projects/projectSlice";
import { getWorkspaceDetailByPathname } from "@/api/company/getDetails";

interface IProps {
  children: ReactNode;
}

export default function AppLayout({ children }: IProps) {
  const params = useParams();
  const pathname = usePathname();
  const dispatch = useDispatch<AppDispatch>();

  const { activeUser } = useAppSelector((state) => state.authReducer);
  const { user, activeCompany } = useAppSelector(
    (state) => state.globalReducer
  );

  const { data: projects } = useQuery(["projects", activeCompany?.id], () =>
    getProjectsByCompanyId(activeCompany?.id!)
  );

  useEffect(() => {
    getWorkspaceDetailByPathname(params.workspacePathname as string)
      .then((res) => {
        dispatch(setActiveCompany(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [params.workspacePathname, dispatch]);

  useEffect(() => {
    if (isUndefined(projects)) return;
    dispatch(updateProjectList(projects?.data));
  }, [projects, activeCompany, dispatch]);

  useEffect(() => {
    if (isNull(activeUser)) {
      dispatch(verifyUser());
    }
    if (isNull(user)) {
      dispatch(fetchUserDetails());
    }
  }, [activeUser, user, dispatch]);

  const getNavigatorComponent = () => {
    if (
      !isUndefined(params.workspacePathname) &&
      !isUndefined(params.projectCode)
    )
      return <BoardNavigator />;
    else if (!isUndefined(params.workspacePathname))
      return <WorkspaceNavigator />;
    else if (pathname.startsWith("/home")) return <UserNavigator />;
    else return null;
  };

  return (
    <div className="flex h-screen pt-14 text-[12px]">
      <Header />
      <NavigationWrapper>{getNavigatorComponent()}</NavigationWrapper>
      <main className="flex flex-1 overflow-y-auto">
        <div className="w-full">{children}</div>
      </main>
    </div>
  );
}
