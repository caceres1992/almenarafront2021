import { FilePdfTwoTone } from "@ant-design/icons";
import { Breadcrumb, Button, Empty, Form, Select } from "antd";
import {
  getServiciosDoctor2,
  getServiciosDoctorBySpecialtyId,
  viewPdfServiciosDoctor2,
  viewPdfServiciosDoctorFilterSpecialty2,
} from "../../../services/ServicioDoctorService";
import { getSpecialties } from "../../../services/SpecialtyService";
import React, { useEffect, useState } from "react";
import "../ServicioTableCss.css";
const Servicio2 = () => {
  const [serviciosDoctor, setServiciosDoctor] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [filterSpecialtyOn, setfilterSpecialtyOn] = useState(false);
  const [idSpecialty, setIdSpecialty] = useState(null);

  const listar = () => {
    getServiciosDoctor2().then(setServiciosDoctor);
  };

  const listarByIdSpecialty = (id) => {
    getServiciosDoctorBySpecialtyId(id).then(setServiciosDoctor);
  };

  const hanldeSelectSpecialty = (e) => {
    setIdSpecialty(e);
    setfilterSpecialtyOn(true);
    listarByIdSpecialty(e);
  };

  const exportToPdf = () => {
    if (filterSpecialtyOn) {
      viewPdfServiciosDoctorFilterSpecialty2(idSpecialty);
    } else {
      viewPdfServiciosDoctor2();
    }
  };

  const clearFilter = () => {
    setfilterSpecialtyOn(false);
    setIdSpecialty(null);
    listar();
  };

  useEffect(() => {
    listar();
    getSpecialties().then(setSpecialties);
  }, []);

  return (
    <div className="mantenimiento">
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Reporte</Breadcrumb.Item>
            <Breadcrumb.Item>Servicio Médico 2</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button
          type="dashed"
          color="red"
          size="large"
          danger
          onClick={exportToPdf}
        >
          <FilePdfTwoTone twoToneColor="red" /> Exportar a PDF
        </Button>
      </header>
      <div className="content">
        <Form layout="inline" style={{ marginBottom: "20px" }}>
          <Form.Item label="Filtrar por Especialidad">
            <Select
              showSearch
              name="specialty"
              placeholder="Seleccione una especialidad"
              optionFilterProp="children"
              style={{ width: "300px" }}
              value={idSpecialty}
              onChange={hanldeSelectSpecialty}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {specialties.map((data) => (
                <Select.Option key={data.id} value={data.id}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Button type="ghost" onClick={clearFilter}>
              Limpiar
            </Button>
          </Form.Item>
        </Form>
        <div
          className="table-responsive"
          style={{ maxHeight: "60vh", overflow: "auto" }}
        >
          {serviciosDoctor.length === 0 ? (
            <Empty />
          ) : (
            <table
              className="table table-hover table-striped"
              border="1"
              style={{ textAlign: "center" }}
            >
              <thead className="tableStick">
                <tr>
                  <th className="stickResidente" style={{ width: "300px" }}>
                    Residente
                  </th>
                  <th className="stickEspecialidad">Especialidad</th>
                  <th>NIV.</th>
                  <th>AÑO</th>
                  <th>DIC</th>
                  <th>ENE</th>
                  <th>FEB</th>
                  <th>MAR</th>
                  <th>ABR</th>
                  <th>MAY</th>
                  <th>JUN</th>
                  <th>JUL</th>
                  <th>AGO</th>
                  <th>SET</th>
                  <th>OCT</th>
                  <th>NOV</th>
                </tr>
              </thead>
              <tbody>
                {serviciosDoctor.map((data) => (
                  <React.Fragment key={data.id}>
                    <tr>
                      <td
                        className="stickResidente"
                        rowSpan="4"
                        style={{ width: "300px" }}
                      >
                        {data.doctor.name} -{" "}
                        {data.doctor.schoolAgreement.school.shortName}
                      </td>
                      <td className="stickEspecialidad" rowSpan="4">
                        {data.doctor.specialty.name}
                      </td>
                    </tr>
                    {data.anioAcademicoDelegados.map((data2) => (
                      <tr key={String(data.id).concat(String(data2.id))}>
                        <td>{data2.anioAcademico.codigo}</td>
                        <td>
                          {data2.anioAcademico.anioInicio} -{" "}
                          {data2.anioAcademico.anioFinal}
                        </td>
                        {data2.servicioDelegados.map((data3) => (
                          <td
                            style={
                              data3.servicio
                                ? data3.servicio.id === 1
                                  ? { backgroundColor: "#abe1ff" }
                                  : null
                                : { background: "silver" }
                            }
                            align="center"
                          >
                            {data3.servicio
                              ? data3.servicio.name
                              : "Servicio no asignado"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Servicio2;
