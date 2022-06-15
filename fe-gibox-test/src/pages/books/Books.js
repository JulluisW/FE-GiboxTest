import { Table } from "antd";
import { Layout } from "antd";
import { useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { tableColumns, pageTitle } from "./constants";
import './style.scss'

export function Books() {

  const [books, setBooks] = useState("")
  
  return (
    <Layout>
      <HeaderMenu page="books" />
      <MainSection title={pageTitle} >
        <Table columns={tableColumns} />
      </MainSection>
    </Layout>
  );
}
