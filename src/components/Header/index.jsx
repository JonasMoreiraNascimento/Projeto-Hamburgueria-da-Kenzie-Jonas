import Logo from "../../assets/Logo.svg";
import { MdSearch, MdShoppingCart } from "react-icons/md";
import style from "./style.module.sass";
export const Header = ({
  handleSubmit,
  setValue,
  value,
  setOpenModal,
  cartList,
}) => {
  return (
    <header className={style.headerColor}>
      <div className={`${style.header} ${"container"}`}>
        <div className={style.header__container}>
          <div className={style.handle}>
            <img src={Logo} alt="Logo Kenzie Burguer" />
            <button onClick={() => setOpenModal(true)} className={style.cart}>
              <MdShoppingCart size={26} className={style.color} />
              <span>{cartList.length}</span>
            </button>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="handle_input">
              <input
                type="text"
                name="pesquisa"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="submit" className={style.search}>
                <MdSearch size={21} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </header>
  );
};
