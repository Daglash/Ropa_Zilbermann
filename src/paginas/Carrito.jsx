import React,{useState} from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {useCartContext} from "../Componentes/CartContextfinal";
import Form from "./Forms";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import {db} from "../firebaseConfig";



const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  padding-top:30 px;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;


const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  
`;



const Carrito = ({product}) => {
  const [data, setData] = useState({ name: '', email: '', phone: '' });
  const [orderId, setOrderId] = useState('');
  
  const { cartList, clearList, removeProduct,totalPrice } = useCartContext();
  

  const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

   const handleSubmit = (e) => {
        /* const formatedCart = cart.map((prod) => {
            return {
                cantidad: prod.cantidad,
                id: prod.id,
            };
        }); */
        e.preventDefault();
        const objOrden = {
            buyer: {
                name: data.name,
                phone: data.phone,
                email: data.email,
            },
            cartList,
            total: totalPrice(),
            date: serverTimestamp(),
        };

    const ref = collection(db, 'orders');
        addDoc(ref, objOrden).then((response) => {
            setOrderId(response.id);
            removeProduct();
        });
    };
    if (orderId !== '') {
        return <h1>Gracias por tu compra, tu n??mero de env??o es: {orderId}</h1>;
    }





  return (
    <Container>
    {
  cartList.length === 0 ? 
  <Wrapper>
    <Title>Carrito de Compras</Title>
    <Desc>Carrito Vacio </Desc>
    <Link to="/">
    <TopButton>Volver al Menu</TopButton>
    </Link>
  </Wrapper> :
     <Wrapper>
     <Title>Carrito de Compras</Title>
     <Top>
          
        <ul> 
             {
                cartList.map( producto => <li key={producto.id} style= { {listStyleType: 'none'} } >
                    <Product>
                        <ProductDetail>
                            <Image src={producto.img}/>
                                    <Details>
                                    <ProductName>
                                    <b>Product: {producto.Nombre}</b>
                                    </ProductName>
                                    < h4>{producto.descripcion}</h4> 
                                    </Details>
                                    
                        </ProductDetail> 
                          <PriceDetail>
                                <ProductAmountContainer>
                                  
                                  <ProductAmount>Cantidad : {producto.cantidad}</ProductAmount>
                            
                                </ProductAmountContainer>
                                <ProductPrice>
                                   Total : {producto.precio}
                                   <button href="/" onClick={() => removeProduct(producto.id)}>Eliminar</button>
                                </ProductPrice>
                              </PriceDetail>
                             
                    </Product>
                    </li>  )
             }

        </ul >
        TOTAL : ${totalPrice()}
      </Top>
      <Form
                        handleChange={handleChange}
                        data={data}
                        handleSubmit={handleSubmit}
                    />
      </Wrapper>
}
  <Link to= "/"> <TopButton>Continuar Comprando</TopButton></Link>
  <TopButton  onClick={clearList}>Vaciar Carrito</TopButton>
  


</Container>
  )
}




export default Carrito