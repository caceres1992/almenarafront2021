import { EditOutlined } from "@ant-design/icons";
import { Button, Empty, Spin } from "antd";
import React from "react";

const TablaServicio2 = ({ serviciosDoctor, editService }) => {
  return (
    <table
      className="table table-hover table-striped"
      border="1"
      style={{ textAlign: "center" }}
    >
      <thead className="StyckyHeader">
        <tr>
          <th style={{ width: "300px" }}>Residente</th>
          <th>Especialidad</th>
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
          <th>SEP</th>
          <th>OCT</th>
          <th>NOV</th>
        </tr>
      </thead>
      <tbody>
        {serviciosDoctor.length === 0 ? (
          <>
            <Empty
              style={{
                position: "absolute",
                left: "0",
                top: "45%",
                right: "0",
                bottom: "auto",
              }}
            />
          </>
        ) : (
          serviciosDoctor.map((data) => (
            <React.Fragment key={data.id}>
              <tr>
                <td
                  className="stickyResidente"
                  rowSpan="4"
                  style={{ width: "300px" }}
                >
                  {data.doctor.name} -{" "}
                  {data.doctor.schoolAgreement.school.shortName}
                </td>
                <td className="stickyEspecialidad" rowSpan="4">
                  {data.doctor.specialty.name}
                </td>
              </tr>
              {data.anioAcademicoDelegados.map((data2) => (
                <tr
                  key={String(data.id).concat(
                    String(data2 == null ? 0 : data2.id)
                  )}
                >
                  <td>
                    {data2.anioAcademico != null
                      ? data2.anioAcademico.codigo
                      : "No definido"}
                  </td>
                  <td>
                    {data2.anioAcademico != null
                      ? data2.anioAcademico.anioInicio
                      : "No definido"}{" "}
                    -{" "}
                    {data2.anioAcademico != null
                      ? data2.anioAcademico.anioFinal
                      : "No definido"}
                  </td>
                  {data2.servicioDelegados.map((data3) => (
                    <td
                      key={String(data.id)
                        .concat(String(data2.id == null ? 0 : data2.id))
                        .concat(
                          String(
                            data3.id != null
                              ? data3.id
                              : data2.id == null
                              ? 0
                              : data2.id
                          )
                        )}
                      style={
                        data3.servicio == null
                          ? { background: "#cca6a1" }
                          : data3.servicio.id == 1
                          ? { background: "#abe1ff" }
                          : {}
                      }
                    >
                      {data3.servicio == null
                        ? "No definido"
                        : data3.servicio.name}{" "}
                      <br />
                      <Button
                        color="blue-1"
                        size="small"
                        onClick={() => {
                          editService(data, data3);
                        }}
                        style={{ marginTop: "5px" }}
                      >
                        <EditOutlined />
                      </Button>
                      {/* respaw */}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TablaServicio2;
