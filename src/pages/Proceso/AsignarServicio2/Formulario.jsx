import {
  Form,
  Breadcrumb,
  Button,
  Select,
  Empty,
  Modal,
  Input,
  Row,
  Col,
  Drawer,
  notification,
} from "antd";

import React from "react";

const Formulario = ({
  specialties,
  idSpecialty,
  setfilterSpecialtyOn,
  setIdSpecialty,
  listar,
  listarByIdSpecialty,
}) => {
  console.log(specialties);

  const clearFilter = () => {
    setfilterSpecialtyOn(false);
    setIdSpecialty(null);
    listar();
  };

  const hanldeSelectSpecialty = (e) => {
    setIdSpecialty(e);
    setfilterSpecialtyOn(true);
    listarByIdSpecialty(e);
  };
  return (
    <Form layout="inline" style={{ marginBottom: "20px" }}>
      <Form.Item label="Filtrar por Especialidad">
        <Select
          loading={!specialties.length > 0}
          showSearch
          name="specialty"
          placeholder="Seleccione una especialidad"
          optionFilterProp="children"
          style={{ width: "300px" }}
          value={idSpecialty}
          onChange={hanldeSelectSpecialty}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
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
  );
};

export default Formulario;
