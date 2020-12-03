import * as React from 'react';
// import { extension } from '@Utils';
// import { TableGenerator } from '@Components'; // いませんよ
import { TableGenerator } from '../TableGenerator';

// const { getStoreLocal } = extension;

// const { useEffect, useState } = React;

// const useListTabs = () => {
//   const [list, setList] = useState([]);

//   useEffect(() => {
//     getStoreLocal(['IAdBTabs'], (result) => {
//       // console.log('ListTabs: ', JSON.parse(result));
//       // console.log('ListTabs: ', result);
//       if (result.IAdBTabs) {
//         const l = JSON.parse(result.IAdBTabs);
//         console.log(l[0]);
//         setList(l);
//       }
//     });
//   }, []);

//   return { list };
// };

// const ListTabs = () => {
//   const { list } = useListTabs();

//   return (
//     <div>
//       <h1>XXXXXXXList</h1>
//       {list.map((item, index) => {
//         return (
//           <div key={`tab-${index}`}>
//             <a href={item.url} target='_blank'>
//               {item.title}
//             </a>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    supportSearch: true,
  },
  {
    title: '标题',
    dataIndex: 'title',
    supportSearch: true,
  },
  {
    title: 'URL',
    dataIndex: 'url',
    supportSearch: true,
  },
  {
    title: 'incognito',
    dataIndex: 'incognito',
    supportSearch: true,
  },
  // {
  //   title: '操作',
  //   dataIndex: '',
  //   supportSearch: false,
  //   key: 'x',
  //   render: (item) => {
  //     return (
  //       <>
  //         <a href={`/admin/anchor/edit/${item.id}`} style={{ marginRight: '12px' }}>
  //           编辑
  //         </a>
  //         <a href={`/admin/live/anchor/${item.id}/add/`}>创建直播</a>
  //       </>
  //     );
  //   },
  // },
];

const api = '/admin/anchor/api/listx';

// const addBtn = {
//   name: '添加讲师',
//   url: '/admin/anchor/add',
// };

const tableRowKey = 'id';

const tmpC = columns.filter((item) => item.supportSearch);
const withSearch = tmpC.length > 0;

export default TableGenerator({
  columns,
  api,
  // addBtn,
  tableRowKey,
  withSearch,
});
