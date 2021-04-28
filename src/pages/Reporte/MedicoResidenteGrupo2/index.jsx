import { FilePdfTwoTone } from "@ant-design/icons";
import { Alert, Breadcrumb, Button, Empty, notification, Table } from "antd";
import React, { useState, useEffect } from "react";
import FormularioGrupo2 from "./FormularioGrupo2";
import TableGrupo2 from "./TableGrupo2";
import { getSpecialties } from "../../../services/SpecialtyService";
import { getAniosAcademicos } from "../../../services/AnioAcademicoService";
import { getServiciosWithSpecialityName } from "../../../services/ServicioService";

import {
  getServiciosDoctor2,
  getServiciosDoctorByAnioAndServicio2,
  viewPdfServiciosDoctorByAnioAndServicio,
  viewPdfServiciosDoctorFilterSpecialty,
} from "../../../services/ServicioDoctorService";

const MedicoResidenteGrupo2 = () => {
  const [serviciosDoctor, setServiciosDoctor] = useState([]);
  const [idSpecialty, setIdSpecialty] = useState(null);
  const [meses, setMeses] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [aniosAcademico, setaniosAcademico] = useState(null);
  const [doctoresFiltrados, setDoctoresFiltrados] = useState([]);
  const [servicios, setServicios] = useState([]);

  const [filterMesOn, setFilterMesOn] = useState(false);
  const [idService, setidService] = useState(null);
  const [idAnioAcademico, setIdAnioAcademico] = useState(null);
  const [idMes, setIdMes] = useState(null);

  const [filterServiceOn, setfilterServiceOn] = useState(false);
  const [filterAnioAcademicoOn, setFilterAnioAcademicoOn] = useState(false);

  const listar = () => {
    getServiciosDoctor2().then(setServiciosDoctor);
  };

  function openNotification(msg, description, placement, type) {
    if (type === "exito") {
      notification.success({
        message: msg,
        description: description,
        placement,
      });
      return;
    }

    if (type === "warning") {
      notification.warning({
        message: msg,
        description: description,
        placement,
      });
      return;
    }
  }
  useEffect(() => {
    getAniosAcademicos().then((data) => setaniosAcademico(data));
    getServiciosWithSpecialityName().then((data) => setServicios(data));
  }, []);

  const FilterDoctorsByServicioAndYear = () => {
    if (filterAnioAcademicoOn && filterServiceOn) {
      getServiciosDoctorByAnioAndServicio2(idService, idAnioAcademico).then(
        (data) => {
          console.log(data);
          setServiciosDoctor(data);
        }
      );
    } else {
      alert("no Selecionno los campos requeridos");
    }
  };

  const handleAnio = (id) => {
    setIdAnioAcademico(id);
    setFilterAnioAcademicoOn(true);
  };
  const handleService = (id) => {
    setidService(id);
    setfilterServiceOn(true);
  };

  return (
    <div>
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Reporte</Breadcrumb.Item>
            <Breadcrumb.Item>
              Medicos Residentes de otras Especialidades por Periodo 2
            </Breadcrumb.Item>
          </Breadcrumb>
        </h2>
        <Button
          type="dashed"
          color="red"
          size="large"
          danger
          //   onClick={exportToPdf}
        >
          <FilePdfTwoTone twoToneColor="red" /> Exportar a PDF
        </Button>
      </header>

      <FormularioGrupo2
        servicios={servicios}
        idService={idService}
        handleService={handleService}
        idAnioAcademico={idAnioAcademico}
        handleAnio={handleAnio}
        aniosAcademico={aniosAcademico}
        FilterDoctorsByServicioAndYear={FilterDoctorsByServicioAndYear}
      />

      {serviciosDoctor.length == 0 ? (
        <Empty style={{marginTop:50}}/>
      ) : (
        <TableGrupo2
          setServiciosDoctor={setServiciosDoctor}
          serviciosDoctor={serviciosDoctor}
          idService={idService}
        />
      )}
    </div>
  );
};

export default MedicoResidenteGrupo2;
