import { Formik, Form } from "formik";
import { createTeamsRequest } from "../api/teams.api";

function TeamsForm() {
  return (
    <div>
      <Formik
        initialValues={{
          nombre: "",
          ciudad: "",
          fechaFundacion: "",
        }}
        onSubmit={async (values,actions) => {
          // Convertir fechaFundacion a formato yyyy-mm-dd
          const formattedDate = new Date(values.fechaFundacion).toISOString().split('T')[0];

          const formattedValues = {
            ...values,
            fechaFundacion: formattedDate,
          };

          try {
            console.log(formattedValues);
            const response = await createTeamsRequest(formattedValues);
            console.log(response);
            actions.resetForm()
          } catch (error) {
            console.log(error);
          }
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ingrese el nombre del equipo"
              value={values.nombre}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <label>Ciudad</label>
            <input
              type="text"
              name="ciudad"
              placeholder="Ingrese la ciudad de fundación del equipo"
              value={values.ciudad}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <label>Fecha de Fundación</label>
            <input
              type="date"
              name="fechaFundacion"
              placeholder="Ingrese fecha de fundación del equipo"
              value={values.fechaFundacion}
              onChange={handleChange}
              onBlur={handleBlur}
            />

            <button type="submit">Guardar</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TeamsForm;
