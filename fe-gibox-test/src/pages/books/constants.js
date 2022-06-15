import { Space } from 'antd';

export const pageTitle = 'Book List'

export const tableColumns = [
  {
    title: 'No',
    key: 'index',
    width: 50,
    render: (text="", record="", index) => <>{index+1}</>,
  },
  {
    title: 'Title',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Cover Image',
    dataIndex: 'imgUrl',
    key: 'imgUrl',
    render: (imgUrl, record) => <img style={{width:'100px', height:'150px', objectFit:'cover'}} src={imgUrl} alt={record.name}/>
  },
  {
    title: 'Released Year',
    dataIndex: 'year',
    key: 'year',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
    render: (description) => <p style={{maxWidth:'60ch'}}>{description}</p>
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];