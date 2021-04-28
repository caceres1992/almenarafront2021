import clienteAxios from "../config/clienteAxios";

const getSpecialties = async () => {
  const resp = await clienteAxios.get("/specialties");
  return resp.data;
};

const getSpecialtiesPdf = async () => {
  await clienteAxios
    .get("/specialties/pdf", { responseType: "blob" })
    .then((resp) => {
      const file = new Blob([resp.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
};

const getSpecialtiesDto = async () => {
  const resp = await clienteAxios.get("/specialties/simple");
  return resp.data;
};

const createEspecialidad = async (newService) => {
  const resp = await clienteAxios.post("/specialties/create", newService);
  return resp.data;
};

const actualizarEspecialidad = async (newService) => {
  const resp = await clienteAxios.post("/specialties/create", newService);
  return resp.data;
};

export {
  getSpecialties,
  getSpecialtiesDto,
  createEspecialidad,
  actualizarEspecialidad,
  getSpecialtiesPdf,
};
