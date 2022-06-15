import { Layout, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { pageTitle } from "./constants";
import "./style.scss";
import api from "../../api/api";
import { useTableColumns } from "./hooks/useTableColumns";

export function Rent() {
  const [records, setRecords] = useState('')
  const [selectedBook, setSelectedBook] = useState({});
  const [visible, setVisible] = useState(false);

  const fetchAllRecords = async () => {
    const { data } = await api.get("/rent_transactions");
    setRecords(data);
  };

  const handleEditRecord = (id, payload) => {
    api
      .patch(`/rent_transactions/${id}`, payload)
      .then(() => {
        fetchAllRecords();
        setVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const openEditModal = async (id) => {
    const { data } = await api.get(`/rent_transactions/${id}`);
    setSelectedBook(data);
    setVisible(true);
  };

  const handleDeleteRecord = (id) => {
    api
      .delete(`rent_transactions/${id}`)
      .then(() => {
        fetchAllRecords();
      })
      .catch((err) => console.log(err));
  };

  const tableColumns = useTableColumns({
    onClickEdit: openEditModal,
    onClickDelete: handleDeleteRecord,
  })

  useEffect(() => {
    fetchAllRecords()
  },[])

  return (
    <Layout>
      <HeaderMenu page="rent" />
      <MainSection title={pageTitle} >
        <Table columns={tableColumns} rowKey="id" dataSource={records}/>
      </MainSection>
    </Layout>
  )
}
