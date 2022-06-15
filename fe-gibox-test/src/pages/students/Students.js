import { Table } from "antd";
import { Layout } from "antd";
import { useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { tableColumns, pageTitle } from "./constants";

export function Students() {
  const [students, setStudents] = useState('')

  return (
    <Layout>
      <HeaderMenu page="students"/>
      <MainSection title={pageTitle} >
        <Table columns={tableColumns} />
      </MainSection>
    </Layout>
  )
}
