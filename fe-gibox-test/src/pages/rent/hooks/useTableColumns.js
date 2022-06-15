import { Button } from "antd";
import { Space } from "antd";
import { identity } from "lodash-es";
import api from "../../../api/api.js";

const getStudentName = async (id) => {
  const { data } = await api.get(`/students/${id}`);
  return data.name;
};

const dayDiff = (date_1) =>{
  let difference = new Date() - new Date(date_1);
  let TotalDays = Math.ceil(+difference / (1000 * 3600 * 24));
  return TotalDays;
}

const CurrencyFormatter = new Intl.NumberFormat('id-ID', {
  style: 'currency',
  currency: 'IDR',
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
      title: "Student Id",
      dataIndex: "studentId",
      key: "student",
      align: "center",
      // render: (id) => {
      //   let name = "";
      //   getStudentName(id)
      //     .then((res) => {
      //       name = res;
      //       return null;
      //     })
      //     .catch((err) => console.log(err));
      //   return (
      //     <p>{name}</p>
      //   )
      // },
    },
    {
      title: "Book Id",
      dataIndex: "bookId",
      key: "bookId",
      align: "center",
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
      render: (_,record) => (
        <p>{CurrencyFormatter.format(dayDiff(record.returnDueDate) * 5000)}</p>
      )
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
