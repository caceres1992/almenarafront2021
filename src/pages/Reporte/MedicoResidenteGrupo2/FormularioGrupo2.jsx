import { Button, Form, Select } from "antd";
import React from "react";

const FormularioGrupo2 = ({
  handleAnio,
  servicios,
  idService,
  idAnioAcademico,

  aniosAcademico, 
  handleService,
  FilterDoctorsByServicioAndYear
}) => {
  return (
    <Form layout="inline">
      <Form.Item label="Servicio 2">
        <Select
          showSearch
          placeholder="Seleccione una especialidad"
          optionFilterProp="children"
          onChange={(input) => handleService(input)}
          value={idService}
          style={{ width: "470px" }}
        >
          {servicios.length > 0
            ? servicios.map((ser) => (
                <Select.Option key={ser.id} value={ser.id}>
                  {ser.name}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item label="Periodo">
        <Select
          style={{ width: "150px" }}
          showSearch
          name="anioAcademico"
          placeholder="Selecione un Año"
          optionFilterProp="children"
          value={idAnioAcademico}
          onChange={(e) => handleAnio(e)}
          filterOption={(input, option) => {
       
            return (
              option.props.children[0]
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            );
          }}
        >
          {aniosAcademico
            ? aniosAcademico.map((data) => (
                <Select.Option key={data.id} value={data.id}>
                  {data.anioInicio} - {data.anioFinal}
                </Select.Option>
              ))
            : null}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="ghost"
        onLoad
        onClick={FilterDoctorsByServicioAndYear}
        >Consultar</Button>
      </Form.Item>
    </Form>
  );
};

export default FormularioGrupo2;
