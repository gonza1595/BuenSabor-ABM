import { useState, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Product } from "../../types/Product";
import { Rubro } from "../../types/Rubro";
import { StateType } from "../../types/StateType";
import { ArticuloInsumo } from "../../types/ArticuloInsumo";
import { RubroType } from "../../types/RubroType";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ProductServices } from "../../services/ProductServices";
import { RubroServices } from "../../services/RubroServices";
import { ArticuloInsumosServices } from "../../services/ArticuloInsumoServices";
import { toast } from "react-toastify";

type ProductModalProps = {
  show: boolean;
  onHide: () => void;
  title: string;
  modalType: ModalType;
  prod: Product;
  products: React.Dispatch<React.SetStateAction<Product[]>>;
};

export default function ProductModal({
  show,
  onHide,
  title,
  modalType,
  prod,
  products,
}: ProductModalProps) {
  // Con esta constante nos traemos el enum de estado
  const estados = Object.keys(StateType);

  //Estado que contiene los rubros recibidos de nuestra API
  const [rubros, setRubros] = useState<Rubro[]>([]);

  //Estado que contiene los ingredientes recibidos de nuestra API
  const [ingredients, setIngredients] = useState<ArticuloInsumo[]>([]);

  //Usamos este hook para obtener los INGREDIENTES cada vez que se renderice el componente
  useEffect(() => {
    const fetchArticuloInsumo = async () => {
      const ArticuloInsumo = await ArticuloInsumosServices.getArticuloInsumo();
      setIngredients(ArticuloInsumo);
    };
    fetchArticuloInsumo();
  });

  //Usamos este hook para obtener los rubros cada vez que se renderice el componente
  useEffect(() => {
    const fetchRubros = async () => {
      const rubros = await RubroServices.getRubros();
      setRubros(rubros);
    };
    fetchRubros();
  });

  //CREATE - ACTUALIZAR
  const handleSaveUpdate = async (pro: Product) => {
    try {
      const isNew = pro.id === 0;
      if (isNew) {
        const newProduct = await ProductServices.createProduct(pro);
        let updateData = (prevProducts: any) => [...prevProducts, newProduct];
        products(updateData); // Agregar el nuevo producto al final del arreglo
      } else {
        await ProductServices.updateProduct(pro.id, pro);
        products((prevProducts) =>
          prevProducts.map((product) => (product.id === pro.id ? pro : product))
        );
      }

      toast.success(isNew ? "Producto creado" : "Producto actualizado", {
        position: "top-center",
      });

      onHide();
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");
    }
  };

  //DELETE
  const handleDelete = async () => {
    try {
      await ProductServices.deleteProduct(prod.id);
      products((prevProducts) =>
        prevProducts.filter((products) => products.id !== prod.id)
      );
      toast.success("Producto eliminado con exito", {
        position: "top-center",
      });
      onHide();
    } catch (error) {
      console.error(error);
      toast.error("Ha ocurrido un error");
    }
  };

  //Yup, esquema de validacion
  const validationSchema = () => {
    return Yup.object().shape({
      id: Yup.number().integer().min(0),
      denominacion: Yup.string().required("El nombre es requerido"),
      descripcion: Yup.string().required("La descripcion es requerida"),
      receta: Yup.string().required("La receta es requerida"),
      tiempoEstimadoCocina: Yup.number()
        .min(0)
        .required("El tiempo de cocina es requerido"),
      url_Imagen: Yup.string().required("La URL de la imagen es requerida"),
      precioVenta: Yup.number()
        .min(0)
        .required("El precio de Venta es requerido"),
    });
  };

  //Formik, crea formulario dinamico y lo bloquea en caso de haber errores
  const formik = useFormik({
    initialValues: prod,
    validationSchema: validationSchema(),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (obj: Product) => handleSaveUpdate(obj),
  });

  return (
    <>
      {modalType === ModalType.DELETE ? (
        <>
          <Modal show={show} onHide={onHide} centered backdrop="static">
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>¿Esta seguro que desea eliminar el producto?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={onHide}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleDelete}>
                Eliminar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      ) : (
        <>
          <Modal
            show={show}
            onHide={onHide}
            centered
            backdrop="static"
            className="modal-xl"
          >
            <Modal.Header>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Formulario */}
              <Form onSubmit={formik.handleSubmit}>
                {/* Nombre */}
                <Form.Group controlId="formNombre">
                  <Form.Label> Nombre </Form.Label>
                  <Form.Control
                    name="denominacion"
                    type="text"
                    value={formik.values.denominacion || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.denominacion && formik.touched.denominacion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Descripcion */}
                <Form.Group controlId="formDescripcion">
                  <Form.Label> Descripcion </Form.Label>
                  <Form.Control
                    name="descripcion"
                    type="text"
                    value={formik.values.descripcion || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.descripcion && formik.touched.descripcion
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.descripcion}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Receta */}
                <Form.Group controlId="formReceta">
                  <Form.Label> Receta </Form.Label>
                  <Form.Control
                    name="receta"
                    type="text"
                    value={formik.values.receta || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.receta && formik.touched.receta
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.receta}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Tiempo de Cocina */}
                <Form.Group controlId="formTiempoCocina">
                  <Form.Label> Tiempo de Cocina </Form.Label>
                  <Form.Control
                    name="tiempoEstimadoCocina"
                    type="number"
                    value={formik.values.tiempoEstimadoCocina || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.tiempoEstimadoCocina &&
                        formik.touched.tiempoEstimadoCocina
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.tiempoEstimadoCocina}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Rubro */}
                <Form.Group controlId="formRubro">
                  <Form.Label>Rubro</Form.Label>
                  <Form.Select
                    name="rubro.id"
                    value={formik.values.rubro.id || ""}
                    onChange={(e) => {
                      const selectedRubroId = e.target.value;
                      const selectedRubro = rubros.find(
                        (rubro) => rubro.id === parseInt(selectedRubroId)
                      );

                      formik.setFieldValue("rubro.id", selectedRubroId);
                      formik.setFieldValue(
                        "rubro.denominacion",
                        selectedRubro ? selectedRubro.denominacion : ""
                      );
                    }}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.rubro && formik.touched.rubro
                    )}
                  >
                    <option value="">Selecciona un rubro</option>
                    {rubros.map((rubro) => (
                      <option key={rubro.id} value={rubro.id}>
                        {rubro.denominacion}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.rubro?.denominacion}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Imagen */}
                <Form.Group controlId="formImagen">
                  <Form.Label> Imagen </Form.Label>
                  <Form.Control
                    name="url_Imagen"
                    type="text"
                    value={formik.values.url_Imagen || ""}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.url_Imagen && formik.touched.url_Imagen
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.url_Imagen}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Precio de Venta */}
                <Form.Group controlId="formPrecioVenta">
                  <Form.Label> Precio de Venta </Form.Label>
                  <Form.Control
                    name="precioVenta"
                    type="number"
                    value={formik.values.precioVenta}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.precioVenta && formik.touched.precioVenta
                    )}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.precioVenta}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Ingrediente */}
                {/* <Form.Group controlId="formIngredient">
                  <Form.Label>Ingrediente</Form.Label>
                  {formik.values.detallesArtManufacturado.map((index) => (
                    <Form.Select
                      key={index}
                      name={`detallesArtManufacturado[${index}].articuloInsumo.denominacion`}
                    >
                      <option value="">Selecciona un ingrediente</option>
                      {ingredients.map((ingrediente) => (
                        <option
                          key={ingrediente.id}
                          value={ingrediente.denominacion}
                        >
                          {ingrediente.denominacion}
                        </option>
                      ))}
                    </Form.Select>
                  ))}
                </Form.Group> */}

                {/* Estado */}
                <Form.Group controlId="formEstado">
                  <Form.Label>Estado</Form.Label>
                  <Form.Select
                    name="estadoArticulo"
                    value={formik.values.estadoArticulo}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={Boolean(
                      formik.errors.estadoArticulo &&
                        formik.touched.estadoArticulo
                    )}
                  >
                    <option value={StateType.Alta}>Alta</option>
                    <option value={StateType.Baja}>Baja</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.estadoArticulo}
                  </Form.Control.Feedback>
                </Form.Group>

                <Modal.Footer className="mt-4">
                  <Button variant="secondary" onClick={onHide}>
                    {" "}
                    Cancelar{" "}
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!formik.isValid}
                  >
                    {" "}
                    Guardar{" "}
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}
