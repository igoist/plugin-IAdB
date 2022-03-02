import * as React from 'react';
// import { TableGenerator } from '@Components'; // いませんよ
import { TableGenerator } from '../TableGenerator';
import { extension } from '@Utils';

const { getStoreLocal } = extension;

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
    key: 'id',
    width: 80,
    supportSearch: true,
    render: (item) => (
      <a key={`id-${item.id}`} href={item.url} target='_blank' style={{ color: item.incognito ? '#149cec' : '#ec414d' }}>
        {item.id}
      </a>
    ),
  },
  {
    title: '标题',
    key: 'title',
    supportSearch: true,
    render: (item, index) => {
      return (
        <a key={`title-${index}`} href={item.url} target='_blank'>
          {item.title}
        </a>
      );
    },
  },
  {
    title: 'incognito',
    dataIndex: 'incognito',
    width: 120,
    supportSearch: true,
    render: (item) => <>{item ? 'Y' : 'N'}</>,
  },
];

const tableRowKey = 'id';

const tmpC = columns.filter((item) => item.supportSearch);
const withSearch = tmpC.length > 0;

const dataFetch = () => {
  return new Promise((resolve) => {
    getStoreLocal(['IAdBTabs'], (result) => {
      if (result.IAdBTabs) {
        const l = JSON.parse(result.IAdBTabs);
        resolve({
          total: l.length,
          list: l,
        });
      }
    });
  });
};

export default TableGenerator({
  columns,
  // api,
  // addBtn,
  tableRowKey,
  withSearch,
  dataFetch,
  // handleRes,
});
