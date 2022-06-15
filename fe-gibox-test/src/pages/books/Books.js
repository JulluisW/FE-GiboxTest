import { Table } from "antd";
import { Layout } from "antd";
import { useEffect, useState } from "react";
import { HeaderMenu, MainSection } from "../../components";
import { pageTitle } from "./constants";
import "./style.scss";
import api from "../../api/api";
import { useTableColumns } from "./hooks/useTableColumns";
import { Modal } from "antd";

export function Books() {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState({ name: "hahaha" });
  const [visible, setVisible] = useState(false);

  const fetchAllBooks = async () => {
    const { data } = await api.get("/books");
    setBooks(data);
  };

  const handleEditBook = (id, payload) => {
    api
      .patch(`/books/${id}`, payload)
      .then(() => {
        fetchAllBooks();
        setVisible(false);
      })
      .catch((err) => console.log(err));
  };

  const openEditModal = async (id) => {
    const { data } = await api.get(`/books/${id}`);
    setSelectedBook(data);
    setVisible(true);
  };

  const handleDeleteBook = (id) => {
    api
      .delete(`books/${id}`)
      .then(() => {
        fetchAllBooks();
      })
      .catch((err) => console.log(err));
  };

  const tableColumns = useTableColumns({
    onClickEdit: openEditModal,
    onClickDelete: handleDeleteBook,
  });

  useEffect(() => {
    fetchAllBooks();
  }, []);

  return (
    <Layout>
      <HeaderMenu page="books" />
      <MainSection title={pageTitle}>
        <Table columns={tableColumns} rowKey="id" dataSource={books ? books : null} />
      </MainSection>
      <Modal title="Edit Book" visible={visible} onOk={() => handleEditBook(selectedBook.id, selectedBook)} onCancel={() => setVisible(false)} centered>
        <div className="form-container">
          <div className="form-wrapper">
            <label>Title</label>
            <input type="text" value={selectedBook.name} onChange={(e) => setSelectedBook({ ...selectedBook, name: e.target.value })} />
          </div>
          <div className="form-wrapper">
            <label>Released Year</label>
            <input type="text" value={selectedBook.year} onChange={(e) => setSelectedBook({ ...selectedBook, year: e.target.value })} />
          </div>
          <div className="form-wrapper">
            <label>Image Url</label>
            <input type="text" value={selectedBook.imgUrl} onChange={(e) => setSelectedBook({ ...selectedBook, imgUrl: e.target.value })} />
          </div>
          <div className="form-wrapper">
            <label>Description</label>
            <textarea rows="4" value={selectedBook.description} onChange={(e) => setSelectedBook({ ...selectedBook, description: e.target.value })} />
          </div>
        </div>
      </Modal>
    </Layout>
  );
}
