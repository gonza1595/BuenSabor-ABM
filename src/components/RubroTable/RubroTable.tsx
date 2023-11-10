import { useEffect, useState } from "react";
import { RubroServices } from "../../services/RubroServices";
import { Button, Table } from "react-bootstrap";
import { ModalType } from "../../types/ModalType";
import { Rubro } from "../../types/Rubro";
import { RubroType } from "../../types/RubroType";
import { StateType } from "../../types/StateType";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import Loader from "../Loader/Loader";
import RubroModal from "../RubroModal/RubroModal";

export default function RubroTable() {
  //Inicializamos un producto por defecto cuando vayamos a crear uno nuevo
  const initializableNewRubro = (): Rubro => {
    return {
      id: 0,
      denominacion: "",
      estadoRubro: StateType.Alta,
      tipoRubro: RubroType.insumo,
    };
  };

  //Producto seleccionado que se va a pasar como prop al modal
  const [rubro, setRubro] = useState<Rubro>(initializableNewRubro);

  //const para manejar el estado del modal
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>(ModalType.NONE);
  const [title, setTitle] = useState("");

  //Logica del modal
  const handleClick = (newTitle: string, rub: Rubro, modal: ModalType) => {
    setTitle(newTitle);
    setModalType(modal);
    setRubro(rub);
    setShowModal(true);
  };

  //Estado que contiene los productos recibidos de nuestra API
  const [rubros, setRubros] = useState<Rubro[]>([]);

  //Variable que muestra el componente Loader
  const [isLoading, setIsLoading] = useState(true);

  //El useEffect se ejecuta cada vez que se renderice el componente
  useEffect(() => {
    const fetchRubros = async () => {
      const rubros = await RubroServices.getRubros();
      setRubros(rubros);
      setIsLoading(false);
    };

    fetchRubros();
  }, []);

  return (
    <div className="container">
      <Button
        className="mt-4 mb-3"
        onClick={() =>
          handleClick("Nuevo Rubro", initializableNewRubro(), ModalType.CREATE)
        }
      >
        {" "}
        Nuevo Rubro
      </Button>
      {isLoading ? (
        <Loader />
      ) : (
        <Table hover>
          <thead>
            <tr className="text-center">
              <th>Nombre</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {rubros.map((rubro) => (
              <tr className="text-center">
                <td>{rubro.denominacion}</td>
                <td>{rubro.estadoRubro}</td>
                <td>
                  <EditButton
                    onClick={() =>
                      handleClick("Editar Rubro", rubro, ModalType.UPDATE)
                    }
                  />
                </td>
                <td>
                  <DeleteButton
                    onClick={() =>
                      handleClick("Eliminar Rubro", rubro, ModalType.DELETE)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      {showModal && (
        <RubroModal
          show={showModal}
          onHide={() => setShowModal(false)}
          title={title}
          modalType={modalType}
          rub={rubro}
          rubros={setRubros}
        />
      )}
    </div>
  );
}
