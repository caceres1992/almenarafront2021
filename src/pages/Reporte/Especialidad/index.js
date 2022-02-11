import { FilePdfTwoTone, PrinterOutlined } from "@ant-design/icons";
import { Breadcrumb, Button, Table } from "antd";
import React, { useRef } from "react";
import { useState, useEffect } from "react";
import { getSpecialties,getSpecialtiesPdf } from "../../../services/SpecialtyService";

const colums = [
  {
    title: "#",
    dataIndex: "id",
    key: "id",
    width: 50,
    fixed: "left",
    align: "center",
  },
  {
    title: "Nombre",
    dataIndex: "name",
    key: "name",
    align: "center",
  },
];

const TablaEspecialidades = () => {
  const [dataSource, setDataSource] = useState([]);

  const listar = () => {
    getSpecialties().then((resp) => {
      resp.forEach((data) => {
        data.key = data.id;
      });
      console.log(resp);
      setDataSource(resp);
    });
  };
  useEffect(() => {
    listar();
  }, []);
  return (
    <div style={{ height: 500, position: "relative" }}>
      <Table
        id="tabla"
        loading={!dataSource.length > 0}
        dataSource={dataSource}
        columns={colums}
        rowClassName="textUppercase"
        pagination={{ pageSize: dataSource.length }}
      />
    </div>
  );
};

export const EspecialidadReporte = () => {


  const ImprimirTabla = () => {
  
  };

  const handlePrint = () => {
    // var mywindow = window.open("", "PRINT", "");
    // mywindow.document.write("<html><head>");
    // mywindow.document.write("</head><body >");
    // // mywindow.document.write('<style> #tabla{width:100%;border-collapse:collapse;margin:16px 0 16px 0;}#tabla th{border:1px solid #ddd;padding:4px;background-color:#d4eefd;text-align:left;font-size:15px;}#tabla td{border:1px solid #ddd;text-align:left;padding:6px;}</style>');
    // mywindow.document.write(document.getElementById("tabla").innerHTML);
    // mywindow.document.write("</body></html>");
    // mywindow.document.close(); // necesario para IE >= 10
    // mywindow.focus(); // necesario para IE >= 10
    // mywindow.print();
    // mywindow.close();
    // return true;
    getSpecialtiesPdf();
  
  };

  return (
    <div>
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Reporte</Breadcrumb.Item>
            <Breadcrumb.Item>Especialidad</Breadcrumb.Item>
          </Breadcrumb>
        </h2>

        <Button type="dashed" danger  onClick={handlePrint}>
            <FilePdfTwoTone twoToneColor="red" />  Exportar a PDF
        </Button>
      </header>

      <TablaEspecialidades />
    </div>
  );
};
