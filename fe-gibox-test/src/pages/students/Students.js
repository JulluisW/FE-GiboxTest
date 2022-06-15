import { Table,Modal,Layout } from "antd";
import { useEffect, useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { pageTitle } from "./constants";
import "./style.scss";
import api from "../../api/api";
import { useTableColumns } from "./hooks/useTableColumns";

export function Students() {
  const [students, setStudents] = useState("");
  const [visible, setVisible] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState({})

  const fetchAllStudents = async () => {
    const { data } = await api.get("/students");
    setStudents(data);
  };

  const handleEditStudent = (id, payload) => {
    api
      .patch(`/students/${id}`, payload)
      .then(() => {
        fetchAllStudents();
        setVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const openEditModal = async (id) => {
    const { data } = await api.get(`/students/${id}`);
    setSelectedStudent(data);
    setVisible(true);
  };

  const handleDeleteStudent = (id) => {
    api
      .delete(`students/${id}`)
      .then(() => {
        fetchAllStudents();
      })
      .catch((err) => console.log(err));
  };

  const tableColumns = useTableColumns({
    onClickEdit: openEditModal,
    onClickDelete: handleDeleteStudent,
  })

  useEffect(() => {
    fetchAllStudents()
  }, []);

  return (
    <Layout>
      <HeaderMenu page="students" />
      <MainSection title={pageTitle}>
        <Table columns={tableColumns} rowKey="id" dataSource={students} />
      </MainSection>
      <Modal title="Edit Book" visible={visible} onOk={() => handleEditStudent(selectedStudent.id, selectedStudent)} onCancel={() => setVisible(false)} centered>
        <div className="form-container">
          <div className="form-wrapper">
            <label>Student Name</label>
            <input type="text" value={selectedStudent.name} onChange={(e) => setSelectedStudent({ ...selectedStudent, name: e.target.value })} />
          </div>
          <div className="form-wrapper">
            <label>Class</label>
            <input type="text" value={selectedStudent.class} onChange={(e) => setSelectedStudent({ ...selectedStudent, class: e.target.value })} />
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
