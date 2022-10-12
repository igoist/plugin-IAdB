import * as React from 'react';
// import { TableGenerator } from '@Components'; // いませんよ
import { TableGenerator } from '../TableGenerator';
import { extension } from '@Utils';

const { getStoreLocal } = extension;

const columns = [
  {
    title: 'ID',
    key: 'id',
    width: 80,
    supportSearch: false,
    render: (item) => (
      <a key={`id-${item.id}`} href={item.link} target="_blank" style={{ color: item.incognito ? '#149cec' : '#ec414d' }}>
        {item.id}
      </a>
    ),
  },
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title',
    supportSearch: true,
    render: (item, i) => {
      return (
        <a key={`title-${i.id}`} href={i.link} target="_blank">
          {item}
        </a>
      );
    },
  },
  {
    title: 'IMG',
    key: 'img',
    width: 120,
    supportSearch: false,
    render: (item) => {
      if (item.img) {
        return <img src={item.img} width={108} height={60} />;
      } else {
        return null;
      }
    },
  },
];

const tableRowKey = 'id';

const tmpC = columns.filter((item) => item.supportSearch);
const withSearch = tmpC.length > 0;

export default TableGenerator({
  columns,
  api: 'http://localhost:6085/api/v1/item/zhihu',
  // addBtn,
  tableRowKey,
  withSearch,
  // getTableData,
  handleRes: (res) => ({
    total: res.count,
    list: res.list,
  }),
});
