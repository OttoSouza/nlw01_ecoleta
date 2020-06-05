import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "./styles.css";
import logo from "../../assets/logo.svg";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../../services/api";
import { Map, TileLayer, Marker } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import axios from "axios";
import Dropzone from "../../components/Dropzone";
interface Item {
  id: number;
  title: string;
  image_url: string;
}

interface Uf {
  sigla: string;
}

interface Cities {
  nome: string;
}

const CreatePoint: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const [selectedFile, setSelectedFile] = useState<File>();
  const [ufSelected, setUfSelectedUf] = useState("0");
  const [citySelected, setSeletectCity] = useState("0");
  const [itemsSeleted, setItemsSelected] = useState<number[]>([]);
  const [selectedPosition, setSeletectedPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [initialPosition, setInitialPosition] = useState<[number, number]>([
    0,
    0,
  ]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
  });

  const history = useHistory();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setInitialPosition([latitude, longitude]);
    });
  });

  useEffect(() => {
    api.get("/items").then((response) => {
      setItems(response.data);
    });
  }, []);

  useEffect(() => {
    axios
      .get<Uf[]>("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => {
        const ufInitials = response.data.map((uf) => uf.sigla);
        setUfs(ufInitials);
      });
  }, []);

  useEffect(() => {
    if (ufSelected === "0") return;

    axios
      .get<Cities[]>(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufSelected}/municipios`
      )
      .then((response) => {
        const citiesNames = response.data.map((city) => city.nome);
        setCities(citiesNames);
      });
  }, [ufSelected]);

  function handleSeletectUf(event: ChangeEvent<HTMLSelectElement>) {
    const uf = event.target.value;
    setUfSelectedUf(uf);
  }
  function handleSeletecCity(event: ChangeEvent<HTMLSelectElement>) {
    const city = event.target.value;
    setSeletectCity(city);
  }

  function handleMapClick(event: LeafletMouseEvent) {
    setSeletectedPosition([event.latlng.lat, event.latlng.lng]);
    console.log(selectedPosition);
  }

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  }
  function handleSeletecItem(id: number) {
    //verificar se esta rettornando um item igual ao ID que esta retornando da função
    const alreadySelected = itemsSeleted.findIndex((item) => item === id);
    // se tiver retornando
    if (alreadySelected >= 0) {
      const filteredItem = itemsSeleted.filter((item) => item !== id);

      setItemsSelected(filteredItem);
    } else {
      setItemsSelected([...itemsSeleted, id]);
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { name, email, whatsapp } = formData;
    const uf = ufSelected;
    const city = citySelected;
    const [latitude, longitude] = selectedPosition;
    const items = itemsSeleted;

    const data = new FormData();

    data.append("name", name);
    data.append("email", email);
    data.append("whatsapp", whatsapp);
    data.append("uf", uf);
    data.append("city", city);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("items", items.join(","));
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    await api.post("points", data);
    alert("Ponto de coleta criado com sucesso");
    history.push("/");
  }

  return (
    <div id="page-create-point">
      <header>
        <img src={logo} alt="Ecoleta" />
        <Link to="/">
          <FiArrowLeft />
          Voltar para home
        </Link>
      </header>

      <form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>

        <Dropzone onFileUploaded={setSelectedFile} />

        <fieldset>
          <legend>
            <h2>Dados</h2>
          </legend>

          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>

          <div className="field-group">
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </legend>

          <Map center={initialPosition} zoom={15} onClick={handleMapClick}>
            {/* tilelayer o design que ira ser utilizado */}
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <Marker position={selectedPosition} />
          </Map>

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado</label>
              <select
                name="uf"
                id="uf"
                onChange={handleSeletectUf}
                value={ufSelected}
              >
                <option value="0">Selecione o estado</option>
                {ufs.map((uf) => (
                  <option value={uf} key={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                onChange={handleSeletecCity}
                value={citySelected}
              >
                <option value="">Selecione uma cidade</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>
            <h2>Items de coleta</h2>
            <span>Selecione um item ou mais</span>
          </legend>

          <ul className="items-grid">
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => handleSeletecItem(item.id)}
                className={itemsSeleted.includes(item.id) ? "selected" : ""}
              >
                <img src={item.image_url} alt="baterias" />
                <span>{item.title}</span>
              </li>
            ))}
          </ul>

          <button type="submit">Cadastrar ponto de coleta</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreatePoint;
