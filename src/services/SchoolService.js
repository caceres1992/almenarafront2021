import clienteAxios from "../config/clienteAxios";

const getSchools = async () => {
  const resp = await clienteAxios.get("/schools");
  return resp.data;
};

const createSchool = async (data) => {
  const resp = await clienteAxios.post('/schools',data);
  return resp.data;
}

const viewPdfScholl = async () => {
  await clienteAxios
  .get("/schools/pdf", { responseType: "blob" })
  .then((resp) => {
    const file = new Blob([resp.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL);
    });
};


const actualizarSchool = async (data) => {
  const resp = await clienteAxios.post(`/schools/update/${data.id}`,data);
  return resp.data;
}

export { getSchools, createSchool, actualizarSchool,viewPdfScholl };
