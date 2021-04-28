import { Empty } from "antd";
import React from "react";
import { useEffect } from "react";
import { getServiciosDoctor } from "../../../services/ServicioDoctorService";
const TableGrupo2 = ({ serviciosDoctor, idService }) => {


  return (
    <div className="table-responsive" style={{ marginTop: 40 }}>
      <table
        className="table table-hover table-striped"
        border="1"
        style={{ textAlign: "center" }}
      >
        <thead>
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
            <th>SET</th>
            <th>OCT</th>
            <th>NOV</th>
          </tr>
        </thead>

        <tbody>
          {serviciosDoctor.lenght != 0 ? (
            serviciosDoctor.map((data, key1) => (
              <React.Fragment key={data.id}>
                <tr>
                  <td style={{ padding: "10px 30px", border: "none" }}>
                    {`${data.doctor.name} ${data.doctor.lastname}`}-{" "}
                    {data.doctor.schoolAgreement.school.shortName}
                  </td>
                  <td>{data.doctor.specialty.name}</td>
                  {data.anioAcademicoDelegados.map((data2, key2) => (
                    <React.Fragment key={data2.id}>
                      <td>{data2.anioAcademico.codigo}</td>
                      <td>
                        {data2.anioAcademico.anioInicio} -{" "}
                        {data2.anioAcademico.anioFinal}
                      </td>

                      {data2.servicioDelegados.map((data3, key3) => (
                        <td
                          key={String(
                            data != null && data.id != null ? key1 : data.id
                          )
                            .concat(
                              String(
                                data2 != null && data2.id != null
                                  ? key2
                                  : data2.id
                              )
                            )
                            .concat(
                              String(
                                data3 != null && data3.id != null
                                  ? key3
                                  : data3.id
                              )
                            )}
                        >
                          {data3.servicio != null
                            ? data3.servicio.id == idService &&
                              data3.servicio != null
                              ? 1
                              : null
                            : null}
                        </td>
                      ))}
                    </React.Fragment>
                  ))}
                </tr>
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan={6}>"No hay Datos con esta"</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableGrupo2;
