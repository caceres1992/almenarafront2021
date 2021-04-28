import clienteAxios from "../config/clienteAxios";

const getDoctors = async () => {
  const resp = await clienteAxios.get("/doctors");
  return resp.data;
};

const getDoctors2 = async () => {
  const resp = await clienteAxios.get("/doctors/vr2");
  return resp.data;
};

const getDoctorsByTeam = async (teamId) => {
  const resp = await clienteAxios.get(`/doctors/teamId/${teamId}`);
  return resp.data;
};

const createDoctor = async (data) => {
  const resp = await clienteAxios.post("/doctors", data);
  return resp.data;
};

const createDoctor2 = async (data) => {
  const resp = await clienteAxios.post("/doctors/vr2", data);
  return resp.data;
};

const saveImportedDoctor = async (data) => {
  console.log(data);
  const resp = await clienteAxios.post("/doctors/import/doctor", data);
  return resp.data;
};
const saveImportedDoctor2 = async (data) => {
  console.log(data);
  const resp = await clienteAxios.post("/doctors/import/doctor2", data);
  return resp.data;
};

const updateDoctor = async (data) => {
  const resp = await clienteAxios.put(`/doctors/${data.id}`, data);
  return resp.data;
};

const viewPdfDoctor = async () => {
  await clienteAxios
    .get("/doctors/pdf", { responseType: "blob" })
    .then((resp) => {
      const file = new Blob([resp.data], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL);
    });
};

const createDoctorGrupo = async (teamId, nombre, team) => {
  const resp = await clienteAxios.put(
    `/doctors/updateGrup/${teamId}/${nombre}/${team}`
  );
  return resp.data;
};

const borrarDoctorGrupo = async (teamId) => {
  const resp = await clienteAxios.put(`/doctors/borrarDoctorGrupo/${teamId}`);
  return resp.data;
};

const getDoctorsByTeamTipo = async (teamId, categoria) => {
  const resp = await clienteAxios.get(
    `/doctors/teamIdCategoria/${teamId}/${categoria}`
  );
  return resp.data;
};

const getTeamIdCategoriaTodos = async () => {
  const resp = await clienteAxios.get(`/doctors/teamIdCategoriaTodos`);
  return resp.data;
};

const getFindAllByTeamIdGrupo = async (teamId, categoria) => {
  const resp = await clienteAxios.get(
    `/doctors/findAllByTeamIdGrupo/${teamId}/${categoria}`
  );
  return resp.data;
};

const findAllTipos = async () => {
  const resp = await clienteAxios.get(`/doctors/findAllTipos`);
  return resp.data;
};

const upgradeDoctorLevel = async () => {
  const resp = await clienteAxios.put(`/doctors/upgradeDoctorLevel`);
  return resp.data;
};

const deleteDoctorByDocumento = async (documento) => {
  const resp = await clienteAxios.patch(`/doctors/${documento}`);
  return resp.data;
};

export {
  getDoctors,
  getDoctors2,
  createDoctor,
  createDoctor2,
  viewPdfDoctor,
  getDoctorsByTeam,
  getDoctorsByTeamTipo,
  getTeamIdCategoriaTodos,
  getFindAllByTeamIdGrupo,
  findAllTipos,
  createDoctorGrupo,
  borrarDoctorGrupo,
  updateDoctor,
  upgradeDoctorLevel,
  saveImportedDoctor,
  saveImportedDoctor2,
  deleteDoctorByDocumento,
};
