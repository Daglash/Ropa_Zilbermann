import React from 'react';
import {productosventa} from "../data";
import styled from "styled-components";
import Producto from "./Producto";



const Container = styled.div`
padding:20px;
display:flex;
flex-wrap: wrap;
`

const Productos = () => {



    return(
        <Container>
            {productosventa.map((item)=>(
                <Producto item={item} key={item.id}/>
            ))}
            
            

        </Container>
    )
}

export default Productos