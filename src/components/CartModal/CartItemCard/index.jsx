import { MdDelete } from "react-icons/md";
import style from "./style.module.sass";

export const CartItemCard = ({ product, deleteCard }) => {
  return (
    <li className={style.card__modal}>
          <div>
            <div className={style.card__img}>
              <img src={product.img} alt={product.name} />
            </div>
            <h3 className="font two">{product.name}</h3>
          </div>
          <button
            aria-label="delete"
            title="Remover item"
            onClick={(e) => {
              e.stopPropagation();
              deleteCard(product.id);
            }}
          >
            <MdDelete size={21} />
          </button>
    </li>
  );
};
