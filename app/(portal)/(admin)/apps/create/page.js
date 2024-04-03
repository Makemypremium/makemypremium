import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import AppForm from "../form";

const AppCreate = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Create App</CardTitle>
      </CardHeader>
      <CardContent>
        <AppForm />
      </CardContent>
    </Card>
  );
};

export default AppCreate;
