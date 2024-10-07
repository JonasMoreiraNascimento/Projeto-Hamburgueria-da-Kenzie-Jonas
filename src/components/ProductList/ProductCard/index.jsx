import style from "./style.module.sass"
export const ProductCard = ({ product,addCart }) => {
    return(
        <li className="card__container">
            <img src={product.img} alt={product.name} />
            <div>
                <h3 className="font one">{product.name}</h3>
                <span className="font three">{product.category}</span>
                <span className="font price">{product.price.toLocaleString('pt-BR', { style: "currency", currency: "BRL"})}</span>
                <button className="btn default " onClick={()=> addCart(product)}>Adicionar</button>
            </div>
        </li>
    )
}