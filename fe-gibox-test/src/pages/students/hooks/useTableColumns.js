import { Button } from "antd";
import { Space } from "antd";
import { identity } from "lodash-es";

export function useTableColumns({ onClickEdit = identity, onClickDelete = identity }) {
  return [
    {
      title: "No",
      key: "index",
      width: 50,
      render: (text, record, index) => <>{index + 1}</>,
      align: "center"
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      align: "center"
    },
    {
      title: "Class",
      dataIndex: "class",
      key: "class",
      align: "center",
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
      align: "center"
    },
  ];
}
