import React from 'react';
import { Button, Col, Form, Input, Row, Table, Select } from 'antd';
import { useAntdTable } from 'ahooks';

const returnGetTableData = (api, handleRes) => {
  return ({ current, pageSize }, formData) => {
    let query = `page=${current}&limit=${pageSize}`;

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        query += `&${key}=${value}`;
      }
    });

    console.log('queryx: ', query);

    let handle;

    if (handleRes) {
      handle = handleRes;
    } else {
      handle = (res) => ({
        total: res.total,
        list: res.hits,
      });
    }

    return fetch(`${api}?${query}`)
      .then((res) => res.json())
      .then(handle);
  };
};

/**
 *
 * 有 getTableData，优先
 * 有 handleRes，优先
 */
const TableGenerator = (config) => {
  const { columns, api, tableRowKey, addBtn, withSearch, getTableData, handleRes } = config;

  let fetchFn;

  if (getTableData) {
    fetchFn = getTableData;
  } else {
    fetchFn = returnGetTableData(api, handleRes);
  }

  return () => {
    const [form] = Form.useForm();

    const { tableProps, search } = useAntdTable(fetchFn, {
      defaultPageSize: 10,
      form,
    });

    const { type, changeType, submit, reset } = search;

    const tmpN = Math.floor(24 / columns.length);
    const tmpArr = columns.map((item) => {
      if (!item.supportSearch) {
        return null;
      } else {
        return (
          <Col key={'col-' + (item.dataIndex || item.key)} span={tmpN}>
            <Form.Item label={item.title} name={item.dataIndex}>
              <Input placeholder={item.title} />
            </Form.Item>
          </Col>
        );
      }
    });

    const advanceSearchForm = (
      <div>
        <Form form={form}>
          <Row gutter={24}>{tmpArr}</Row>
          <Row>
            <Form.Item style={{ width: '100%' }}>
              {withSearch && (
                <>
                  <Button type="primary" style={{ float: 'right', marginLeft: 16 }} onClick={submit}>
                    查询
                  </Button>
                  <Button onClick={reset} style={{ float: 'right' }}>
                    重置
                  </Button>
                </>
              )}
              {addBtn && (
                <Button>
                  <a href={addBtn.url} target="_blank">
                    {addBtn.name}
                  </a>
                </Button>
              )}
              {/* <Button type="link" onClick={changeType}>
                Simple Search
              </Button> */}
            </Form.Item>
          </Row>
        </Form>
      </div>
    );

    // const searchForm = (
    //   <div style={{ marginBottom: 16 }}>
    //     <Form form={form} style={{ display: 'flex', justifyContent: 'flex-end' }}>
    //       {/* <Form.Item name="gender">
    //         <Select style={{ width: 120, marginRight: 16 }} onChange={submit}>
    //           <Option value="">all</Option>
    //           <Option value="male">male</Option>
    //           <Option value="female">female</Option>
    //         </Select>
    //       </Form.Item> */}
    //       <Form.Item name="name">
    //         <Input.Search placeholder="enter name" style={{ width: 240 }} onSearch={submit} />
    //       </Form.Item>
    //       <Button type="link" onClick={changeType}>
    //         Advanced Search
    //       </Button>
    //     </Form>
    //   </div>
    // );

    return (
      <div>
        {/* {type === 'simple' ? searchForm : advanceSearchForm} */}
        {advanceSearchForm}
        <Table columns={columns} rowKey={tableRowKey} {...tableProps} />
      </div>
    );
  };
};

export { returnGetTableData, TableGenerator };

export default TableGenerator;
