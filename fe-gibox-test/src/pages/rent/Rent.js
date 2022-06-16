import { Layout, Table, Modal } from "antd";
import { useEffect, useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { pageTitle } from "./constants";
import "./style.scss";
import api from "../../api/api";
import { useTableColumns } from "./hooks/useTableColumns";

export function Rent() {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [createEditModal, setCreateEditModal] = useState({
    visible: false,
    title: "",
    submitType: "",
  });

  const fetchAllRecords = async () => {
    const { data } = await api.get("/rent_transactions");
    setRecords(data);
  };

  const fetchAllBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  const fetchAllStudents = async () => {
    const { data } = await api.get("/students");
    setStudents(data);
  };

  const handleCreateEditRecord = (id, payload) => {
    if (createEditModal.submitType === "edit") {
      api
        .patch(`/rent_transactions/${id}`, payload)
        .then(() => {
          fetchAllRecords();
          setCreateEditModal({
            visible: false,
            title: "",
            submitType: "",
          });
          setSelectedRecord({});
        })
        .catch((err) => console.log(err));
    } else {
      api
        .post(`/rent_transactions`, payload)
        .then(() => {
          fetchAllRecords();
          setCreateEditModal({
            visible: false,
            title: "",
            submitType: "",
          });
          setSelectedRecord({});
        })
        .catch((err) => console.log(err));
    }
  };

  const openEditModal = async (id) => {
    const { data } = await api.get(`/rent_transactions/${id}`);
    setSelectedRecord(data);
    setCreateEditModal({ ...createEditModal, visible: true, title: "Edit Rent Transaction", submitType: "edit" });
  };

  const openAddModal = () => {
    setSelectedRecord({});
    setCreateEditModal({ ...createEditModal, visible: true, title: "Add Rent Transaction", submitType: "add" });
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
  });

  useEffect(() => {
    fetchAllBooks();
    fetchAllStudents();
    fetchAllRecords();
  }, []);

  return (
    <Layout id="rent-page">
      <HeaderMenu page="rent" />
      <MainSection title={pageTitle}>
        <Table columns={tableColumns} rowKey="id" dataSource={records} />
      </MainSection>
      <Modal
        title={createEditModal.title}
        visible={createEditModal.visible}
        onOk={() => handleCreateEditRecord(selectedRecord.id, selectedRecord)}
        onCancel={() => {
          setSelectedRecord({});
          setCreateEditModal({ ...createEditModal, visible: false });
        }}
        centered
      >
        <div className="form-container">
          <div className="form-wrapper">
            <label>Student Name</label>
            <select onChange={(e) => setSelectedRecord({ ...selectedRecord, studentId: e.target.value })}>
              <option value="">-</option>
              {students.map((e) => {
                if (+e.id === +selectedRecord.studentId) {
                  return (
                    <option key={e.id} selected value={e.id}>
                      {e.name}
                    </option>
                  );
                } else {
                  return <option value={e.id}>{e.name}</option>;
                }
              })}
            </select>
          </div>
          <div className="form-wrapper">
            <label>Book Title</label>
            <select defaultValue={selectedRecord.bookId} onChange={(e) => setSelectedRecord({ ...selectedRecord, bookId: e.target.value })}>
              <option value="">-</option>
              {books.map((e) => {
                if (+e.id === +selectedRecord.bookId) {
                  return (
                    <option key={e.id} selected value={e.id}>
                      {e.name}
                    </option>
                  );
                } else {
                  return <option value={e.id}>{e.name}</option>;
                }
              })}
            </select>
          </div>
          <div className="form-wrapper">
            <label>Start Date</label>
            <input type="date" value={selectedRecord.rentDate} onChange={(e) => setSelectedRecord({ ...selectedRecord, rentDate: e.target.value })} />
          </div>
          <div className="form-wrapper">
            <label>Return Date</label>
            <input type="date" value={selectedRecord.returnDueDate} onChange={(e) => setSelectedRecord({ ...selectedRecord, returnDueDate: e.target.value })} />
          </div>
        </div>
      </Modal>
      <button onClick={openAddModal} id="add-button">
        Add Transaction
      </button>
    </Layout>
  );
}
