import React from 'react'
import imgPortada from '../imagenes/FedericoRudiero.jpeg'
import '../componentes/Portada.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faFacebook ,faInstagram , faWhatsapp , faLinkedin} from '@fortawesome/free-brands-svg-icons'


function portada() {
  return (
      <>
      <div className='divPortada'>
          
    <div className='divContenedor_portada'>
        <h2 className='Saludo-Nombre'>I'm Federico Rudiero</h2>
        <h1 className='h1Portada'>Fronted Developer </h1>
        <a className='aboutMe' href="https://drive.google.com/file/d/1JgTmuDGCgmYZWiX-8-c9NZn38sd-aNFl/view?usp=sharing">About me</a>
        <div className='Redes-Container'>
        <a href="https://www.facebook.com/fede.rudiero.1/"><FontAwesomeIcon icon={faFacebook} className='iconfa' /></a>
        <a href="https://www.instagram.com/federudiero/?hl=es-la"><FontAwesomeIcon icon={faInstagram } className='iconin' /></a>
        <a href="https://wa.me/message/MJCIY3UU4SYQD1"><FontAwesomeIcon icon={faWhatsapp} className='iconwh' /></a>
        <a href="https://www.linkedin.com/in/federico-rudiero-722243162"><FontAwesomeIcon icon={faLinkedin}  className='iconli'/></a>
    </div>
     
     </div>
      
      <img className='imgPortada' src={imgPortada} alt="" />
       
     
      
       
           
           </div>
    </>
  )
}

export default portada