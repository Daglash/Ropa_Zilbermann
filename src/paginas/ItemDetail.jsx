
import styled from "styled-components";
import ItemCount from "../Componentes/ItemCount";
import {useCartContext } from "../Componentes/CartContextfinal";
import React from "react";

// import { useState } from "react"

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.div`
  font-weight: 100;
  font-size: 40px;
`;

const Stock = styled.div`
font-weight: 100;
font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AmountContainer = styled.div`
  display: flex;
  flex:1;
  align-items: center;
  font-weight: 700;
 
  
  
`;

// {img,Nombre,stock,precio,descripcion}

const ItemDetail = ({product}) => {

  const {addToCart} = useCartContext();

 const onAdd = (cantidad)=>{ 
    addToCart( {...product,cantidad} );
    console.log(`Adicionaste ${cantidad} unidades de ${product.Nombre} tu carrito`)
  };

  



 


  return (
    <Container>
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.Nombre}</Title>
          <Desc>{product.descripcion}</Desc>
          <Price>Precio: ${product.precio}</Price>
          <Stock>Stock:  {product.stock}</Stock>
          <FilterContainer>
            <Filter>
              <FilterTitle>Color</FilterTitle>
              <FilterColor color="Yellow" />
              <FilterColor color="Red" />
              <FilterColor color="Black" />
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize>
                <FilterSizeOption>XS</FilterSizeOption>
                <FilterSizeOption>S</FilterSizeOption>
                <FilterSizeOption>M</FilterSizeOption>
                <FilterSizeOption>L</FilterSizeOption>
                <FilterSizeOption>XL</FilterSizeOption>
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
                <ItemCount initial={1} stock={product.stock} onAdd={onAdd} data={product}/>
            </AmountContainer>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
    </Container>
  );
};

export default ItemDetail;
