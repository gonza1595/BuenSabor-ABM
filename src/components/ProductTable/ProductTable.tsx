import { useEffect, useState } from "react";
import { Product } from "../../types/Product";
import { ProductServices } from "../../services/ProductServices";
import { Button } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";

export default function ProductTable() {
  //Inicializamos un producto por defecto cuando vayamos a crear uno nuevo

  const initializableNewProduct = (): Product => {
    return {
      id: 0,
      fechaAlta: "",
      fechaBaja: "",
      fechaModificacion: "",
      denominacion: "",
      descripcion: "",
      precioVenta: 0,
      estadoArticulo: "",
      rubro: {
        id: 0,
        fechaAlta: "",
        fechaBaja: "",
        fechaModificacion: "",
        denominacion: "",
        estadoRubro: "",
        tipoRubro: "",
      },
      tiempoEstimadoCocina: 0,
      precioCosto: 0,
      receta: "",
      detallesArtManufacturado: {
        id: 0,
        cantidad: 0,
        articuloInsumo: {
          id: 0,
          fechaAlta: "",
          fechaBaja: "",
          fechaModificacion: "",
          denominacion: "",
          descripcion: "",
          precioVenta: 0,
          estadoArticulo: "",
          rubro: {
            id: 0,
            fechaAlta: "",
            fechaBaja: "",
            fechaModificacion: "",
            denominacion: "",
            estadoRubro: "",
            tipoRubro: "",
          },
          precioCompra: 0,
          stockActual: 0,
          stockMinimo: 0,
          unidadMedida: {
            id: 0,
            denominacion: "",
            abreviatura: "",
          },
          url_Imagen: "",
        },
      },
      url_Imagen: "",
    };
  };

  //Producto seleccionado que se va a pasar como prop al modal
  const [product, setProduct] = useState<Product>(initializableNewProduct);

  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  //Logica del modal
  const handleClick = (newTitle: string, prod: Product, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setProduct(prod);
    setShowModal(true);
  };

  //Estado que contiene los datos recibidos de nuestra API
  const [products, setProducts] = useState<Product[]>([]);

  //Variable que muestra el componente Loader
  const [isLoading, setIsLoading] = useState(true);

  //El useEffect se ejecuta cada vez que se renderice el componente
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await ProductServices.getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <Button
        className="mt-4 mb-3"
        onClick={() =>
          handleClick(
            "Nuevo Producto",
            initializableNewProduct(),
            ModalType.CREATE
          )
        }
      >
        {" "}
        Nuevo Producto
      </Button>
    </div>
  );
}
