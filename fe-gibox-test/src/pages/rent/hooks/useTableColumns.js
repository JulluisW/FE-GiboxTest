import { Button } from "antd";
import { Space } from "antd";
import { identity } from "lodash-es";
import api from "../../../api/api.js";

let students = [];
let books = [];

const getStudentNames = async () => {
  try {
    const { data } = await api.get(`/students`);
    students = data;
  } catch (error) {
    console.log(error);
  }
};

const getBookNames = async () => {
  try {
    const { data } = await api.get(`/books`);
    books = data;
  } catch (error) {
    console.log(error);
  }
};

getStudentNames();
getBookNames();

const dayDiff = (date_1) => {
  let difference = new Date() - new Date(date_1);
  let TotalDays = Math.ceil((+difference - 3) / (1000 * 3600 * 24));
  if (TotalDays < 0) {
    return 0;
  } else {
    return TotalDays;
  }
};

const CurrencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
});

export function useTableColumns({ onClickEdit = identity, onClickDelete = identity }) {
  return [
    {
      title: "No",
      key: "index",
      width: 50,
      render: (text, record, index) => <>{index + 1}</>,
      align: "center",
    },
    {
      title: "Student",
      dataIndex: "studentId",
      key: "student",
      align: "center",
      render: (id) => {
        // eslint-disable-next-line array-callback-return
        const student = students.filter((el) => {
          if (+el.id === +id) {
            return el;
          }
        });
        return <p>{student[0]?.name}</p>;
      },
    },

    {
      title: "Book",
      dataIndex: "bookId",
      key: "bookId",
      align: "center",
      render: (id) => {
        // eslint-disable-next-line array-callback-return
        const book = books.filter((el) => {
          if (+el.id === +id) {
            return el;
          }
        });
        return <p>{book[0]?.name}</p>;
      },
    },
    {
      title: "Rent Date",
      dataIndex: "rentDate",
      key: "rentDate",
      align: "center",
    },
    {
      title: "Return Date",
      dataIndex: "returnDueDate",
      key: "returnDueDate",
      align: "center",
    },
    {
      title: "Penalty",
      key: "penalty",
      align: "center",
      render: (_, record) => <p>{CurrencyFormatter.format(dayDiff(record.returnDueDate) * 5000)}</p>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button style={{ backgroundColor: "green", color: "white" }} onClick={() => onClickEdit(record?.id)}>
            Edit
          </Button>
          <Button type="danger" onClick={() => onClickDelete(record?.id)}>
            Delete
          </Button>
        </Space>
      ),
      align: "center",
    },
  ];
}
