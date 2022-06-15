import { Table } from "antd";
import { Layout } from "antd";
import { useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { tableColumns, pageTitle } from "./constants";

export function Rent() {
  const [records, setRecords] = useState('')

  return (
    <Layout>
      <HeaderMenu page="rent" />
      <MainSection title={pageTitle} >
        <Table columns={tableColumns} />
      </MainSection>
    </Layout>
  )
}
