"use client";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "@/lib/store/store";
import { isNull, isUndefined } from "lodash";
import AppLayout from "@/components/Wrappers/AppLayout";
import { updateCompaniesList } from "@/lib/store/user/globalSlice";
import { useSearchParams } from "next/navigation";
import Workspace from "@/components/Workspace/Workspace";
import { getCompanyDetails } from "@/api/company/getDetails";
import { AxiosResponse } from "axios";
import { IWorkspace } from "@/utils/types";

export default function Page() {
  const searchParams = useSearchParams();
  const view = searchParams.get("view");

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAppSelector((state) => state.globalReducer);
  const [companyIDMap, setCompanyIDMap] = useState<{
    [key: string]: IWorkspace;
  }>({});

  const getCompanies = async (ids: string[] | undefined) => {
    if (isUndefined(ids)) return;
    getCompanyDetails(ids)
      .then((res: AxiosResponse<any>) => {
        setCompanyIDMap(res.data);
        dispatch(updateCompaniesList(Object.values(res.data)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCompanies(user?.companyRoles.map((r) => r.companyId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  const getActiveView = (): React.ReactNode => {
    return (
      <Workspace
        companyRoles={user?.companyRoles!}
        companyIDMap={companyIDMap}
      />
    );
  };

  return (
    <AppLayout>
      <div className="w-full mx-auto min-h-full flex p-4 bg-white text-[12px]">
        {isNull(user) ? (
          <div>Loading</div>
        ) : (
          <Workspace
            companyRoles={user?.companyRoles!}
            companyIDMap={companyIDMap}
          />
        )}
      </div>
    </AppLayout>
  );
}
