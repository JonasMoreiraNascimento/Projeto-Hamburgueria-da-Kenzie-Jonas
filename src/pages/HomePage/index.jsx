import { useEffect, useState } from "react";
import { CartModal } from "../../components/CartModal";
import { Header } from "../../components/Header";
import { ProductList } from "../../components/ProductList";
import { hamburguer } from "../../services/service";
import { v4 as uuidv4 } from "uuid";
import style from "./style.module.sass";

export const HomePage = () => {
  const [productList, setProductList] = useState([]);
  const [cartList, setCartList] = useState([]);
  const [search, setSearch] = useState([]);
  const [value, setValue] = useState("");
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const localStorageProducts =
      JSON.parse(localStorage.getItem("buyProducts")) || [];
    setCartList(localStorageProducts);
    const apiHamburguer = async () => {
      const { data } = await hamburguer.get("products");
      setProductList(data);
    };
    apiHamburguer();
  }, []);

  useEffect(() => {
    const handle = async () => {
      if (search.length === 0) {
        const { data } = await hamburguer.get("products");
        setProductList(data);
      } else {
        setProductList(search);
      }
    };
    handle();
  }, [search]);

  useEffect(() => {
    cartList.length !== 0 &&
      localStorage.setItem("buyProducts", JSON.stringify(cartList));
  }, [cartList]);

  useEffect(() => {
    const closeModal = (e) => {
      if (e.key === "Escape") {
        setOpenModal(false);
      }
    };
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  const addCartHome = ({ id }) => {
    const products = productList.filter((product) => product.id === id);
    const newProducts = products.map((product) => {
      return {
        ...product,
        id: uuidv4(),
      };
    });
    setCartList([...cartList, newProducts[0]]);
  };

  const deleteCard = (id) => {
    const products = JSON.parse(localStorage.getItem("buyProducts"));
    const removeProducts = products.filter((product, indice) => {
      if (typeof id == "string") {
        return product.id !== id;
      } else {
        return product.id !== id[indice];
      }
    });
    localStorage.setItem("buyProducts", JSON.stringify(removeProducts));
    setCartList(removeProducts);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const mySearch = productList.filter((product) => {
      const configString = (string) => {
        return string
          .normalize("NFD")
          .replace(/[\u0300-\u036f]/g, "")
          .toUpperCase();
      };
      const name = configString(product.name) === configString(value);
      const category = configString(product.category) === configString(value);
      if (name || category) {
        return product;
      }
    });
    setSearch(mySearch);
  };

  return (
    <>
      <Header
        handleSubmit={handleSubmit}
        setValue={setValue}
        value={value}
        setOpenModal={setOpenModal}
        cartList={cartList}
      />
      <main className={`${"container"} ${style.main__modal}`}>
        <ProductList productList={productList} addCart={addCartHome} />
        {openModal && (
          <CartModal
            cartList={cartList}
            deleteCard={deleteCard}
            setOpenModal={setOpenModal}
          />
        )}
      </main>
    </>
  );
};
