import { Breadcrumb, Button, notification, Select } from "antd";
import { FilePdfTwoTone, EditOutlined } from "@ant-design/icons";
import Form from "antd/lib/form/Form";
import React, { useState, useEffect } from "react";
import {
  getServiciosDoctor2,
  getServiciosDoctorBySpecialtyId,
  viewPdfServiciosDoctor,
  viewPdfServiciosDoctorFilterSpecialty,
} from "../../../services/ServicioDoctorService";
// } from "../../../services/ServicioDoctorService";
import { getSpecialties } from "../../../services/SpecialtyService";
import { updateServicioDelegado } from "../../../services/ServicioDelegadoService";
import Formulario from "./Formulario";
import TablaServicio2 from "./TablaServicio2";
import * as Yup from "yup";
import { useFormik } from "formik";
import FormularioAsignarServicio from "./FormularioAsignarServicio";

const AsignarServicio2 = () => {
  const [serviciosDoctor, setServiciosDoctor] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [filterSpecialtyOn, setfilterSpecialtyOn] = useState(false);
  const [idSpecialty, setIdSpecialty] = useState(null);
  const [isImportDataModalVisible, setIsModalImportDataVisible] = useState(
    false
  );
  const [serviceSpecialities, setServiceSpecialities] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(null);

  const editService = (data, data3) => {
    setIsModalImportDataVisible(true);
    console.log(data3);
    console.log(data.doctor.specialty.servicios);

    let monthID = data3.mes.id;
    let monthName = getMonthName(monthID);
    let serviceSpecialities = data.doctor.specialty.servicios;

    formik.values.id = data3.id;
    formik.values.mes = { id: monthID, nombre: monthName };
    formik.values.servicio = {
      id: data3.servicio != null ? data3.servicio.id : null,
      nombre: data3.servicio != null ? data3.servicio.nombre : "",
    };
    setSelectedMonth(monthName);
    setServiceSpecialities(
      serviceSpecialities.length > 0
        ? data.doctor.specialty.servicios.filter(
            (servicio) => servicio.state == true
          )
        : []
    );
  };

  const getMonthName = (monthNumber) => {
    let monthNames = [
      "Julio",
      "Agosto",
      "Setiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Diciembre",
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Setiembre",
      "Octubre",
      "Noviembre",
    ];
    return monthNames[monthNumber - 1];
  };

  const validationSchema = Yup.object().shape({
    servicio: Yup.object().shape({
      id: Yup.number().nullable().required("Servicio requerida"),
    }),
  });

  const formik = useFormik({
    initialValues: {
      id: null,
      mes: {
        id: null,
        nombre: null,
      },
      servicio: {
        id: null,
        nombre: null,
      },
    },
    validationSchema,
    onSubmit: (value) => {
      updateServicioDelegado(value)
        .then((resp) => {
          listar();
          setIsModalImportDataVisible(false);
          openNotification("Actualizado Correctamente", "", "topRight");
          formik.resetForm();
        })
        .catch(function (error) {
          openErrorNotification(
            "Hubo un error mientras se actualizaba",
            "",
            "topRight"
          );
        });
    },
  });

  const openNotification = (msg, description, placement) => {
    notification.success({
      message: msg,
      description: description,
      placement,
    });
  };

  const openErrorNotification = (msg, description, placement) => {
    notification.error({
      message: msg,
      description: description,
      placement,
    });
  };

  const handleCancelModalImport = () => {
    setIsModalImportDataVisible(false);
  };

  const listar = () => {
    getServiciosDoctor2()
      .then(setServiciosDoctor)
      .catch((err) => console.log(err.response));
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
      viewPdfServiciosDoctorFilterSpecialty(idSpecialty);
    } else {
      viewPdfServiciosDoctor();
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
    <div>
      <header>
        <h2 className="title">
          <Breadcrumb>
            <Breadcrumb.Item>Proceso</Breadcrumb.Item>
            <Breadcrumb.Item>Servicio Médico 2</Breadcrumb.Item>
          </Breadcrumb>
        </h2>
      </header>

      <div className="content">
        <Formulario
          setfilterSpecialtyOn={setfilterSpecialtyOn}
          setIdSpecialty={setIdSpecialty}
          specialties={specialties}
          listar={listar}
          idSpecialty={idSpecialty}
          listarByIdSpecialty={listarByIdSpecialty}
        />

        <div className="table-responsive">
          <TablaServicio2
            serviciosDoctor={serviciosDoctor}
            editService={editService}
          />
        </div>
      </div>

      <FormularioAsignarServicio
        isImportDataModalVisible={isImportDataModalVisible}
        selectedMonth={selectedMonth}
        serviceSpecialities={serviceSpecialities}
        formik={formik}
        handleCancelModalImport={handleCancelModalImport}
      />
    </div>
  );
};

export default AsignarServicio2;
