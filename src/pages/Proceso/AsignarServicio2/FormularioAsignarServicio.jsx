import { Form, Button, Drawer, Input, Select } from "antd";

import React from "react";

const FormularioAsignarServicio = ({
  isImportDataModalVisible,
  selectedMonth,
  serviceSpecialities,
  handleCancelModalImport,
  formik,
}) => {
  return (
    <Drawer
      title="Editar Servicio"
      placement="right"
      closable={false}
      width={500}
        onClose={handleCancelModalImport}
      visible={isImportDataModalVisible}
      id="newForm"
    >
      <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
        <Form.Item label="Periodo">
          <Input
            name="document"
            // value={formik.values.document}
            // onChange={formik.handleChange}
            value={selectedMonth}
            disabled={true}
          />
        </Form.Item>

        <Form.Item label="Servicio">
          <Select
            showSearch
            name="servicio.id"
            placeholder="Seleccione un servicio"
            optionFilterProp="children"
            style={{ width: "100%" }}
            value={formik.values.servicio.id}
            onChange={(text) => formik.setFieldValue("servicio.id", text)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {serviceSpecialities.map((data) => (
              <Select.Option key={data.id} value={data.id}>
                {data.name}
              </Select.Option>
            ))}
          </Select>
          {formik.errors.servicio && formik.touched.servicio ? (
            <div className="error-field">{formik.errors.servicio.id}</div>
          ) : null}
        </Form.Item>
        <Form.Item>
          <Button type="primary" size="small" htmlType="submit" block>
            Guardar
          </Button>
        </Form.Item>
      </Form>
    </Drawer>
  );
};

export default FormularioAsignarServicio;
