import { Breadcrumb, Button, Table, Tag } from 'antd';
import React, { useEffect, useState } from 'react';
import { getSchools, viewPdfScholl } from '../../../services/SchoolService';

const UniversidadReporte = () => {
    const [dataSource, setDataSource] = useState([]);
    // const [loading, setLoading] = useState(false);

    const listar = () => {
        getSchools().then((resp) => {
            resp.forEach((data) => {
                data.key = data.id;
            });
            setDataSource(resp);
        });
    };
    const columns = [
        {
            title: "#",
            dataIndex: "id",
            key: "id",
            width: 50,
            fixed: "left",
            align: "center",
        },
        {
            title: "NOMBRE DE UNIVERSIDAD",
            dataIndex: "name",
            key: "name",
            align: "center",
        },
        {
            title: "NOMBRE CORTO DE UNIVERSIDAD",
            dataIndex: "shortName",
            key: "shortName",
            width:200,
            align: "center",
        },
     

    ];


    const exportToPdf = () => {
        viewPdfScholl();
    };

    useEffect(() => {
        listar();
    }, []);


    return <>
        <header>
            <h2 className="title">
                <Breadcrumb>
                    <Breadcrumb.Item>Mantenimiento</Breadcrumb.Item>
                    <Breadcrumb.Item>Universidad</Breadcrumb.Item>
                </Breadcrumb>
            </h2>
            <Button type="primary" size="large" onClick={() =>exportToPdf()
            }>
                Exportar PDF
            </Button>
        </header>

        <div className="content">

        <Table
          loading={!dataSource.length>0}
          dataSource={dataSource}
          columns={columns}
          pagination={{ pageSize: 20 }}
          scroll={{ x: 800 }}
        />
        </div>
    </>;
};

export default UniversidadReporte;
