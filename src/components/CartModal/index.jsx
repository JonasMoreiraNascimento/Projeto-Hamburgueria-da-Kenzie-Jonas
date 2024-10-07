import { MdClose } from "react-icons/md";
import { CartItemCard } from "./CartItemCard";
import style from "./style.module.sass";

export const CartModal = ({ cartList, deleteCard, setOpenModal }) => {
   
  const allDelete = cartList.map((cart) => cart.id);
  const total = cartList.reduce((prevValue, product) => {
    return prevValue + product.price;
  }, 0);
  return (

   
   <div className={style.modal__container} onClick={() => setOpenModal(false)}>
   <div
   role="dialog"
   className={style.modal}
   onClick={(e) => e.stopPropagation()}
   >
   <div className={style.modal__title}>
   <h2 className="font two white">Carrinho de compras</h2>
   <button
   aria-label="close"
   title="Fechar"
   onClick={() => setOpenModal(false)}
   >
   <MdClose size={21} />
   </button>
   </div>
   <div className={style.modal__content}>
   <div className={style.card__list}>
         <ul>
         {cartList.length === 0 ? (
         <h2 className="font two">Você ainda nao Possuí produtos no carrinho</h2>
         ) : (
            null
          )}
         {cartList.map((product) => (
            <CartItemCard
            key={product.id}
            product={product}
            deleteCard={deleteCard}
            />
            ))}
            </ul>
            </div>
            <div className={style.modal__footer}>
            <div>
            <span className="font two modifier">Total</span>
            <span className="font three ">
            {total.toLocaleString("pt-BR", {
               style: "currency",
               currency: "BRL",
            })}
            </span>
            </div>
            <button
            className="btn default"
            onClick={(e) => deleteCard(allDelete)}
            >
            Remover todos
            </button>
            </div>
            </div>
            </div>
            </div>
            
               );
            };
