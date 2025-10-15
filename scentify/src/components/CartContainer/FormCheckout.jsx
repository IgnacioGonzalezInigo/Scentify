import { useState } from "react";

export default function FormCheckout (props){
    const [formData, setFormData] = useState ({
        nombre: "", apellido: "", email: "", telefono: ""
    })

    console.log (formData);

    function handleSubmit (evt){
        evt.preventDefault();
        console.log("Formulario Enviado", formData);
        props.handleCheckout(formData);
    }

    function handleInputChange (evt){
        const value = evt.target.value;
        const inputName = evt.target.name;

        const newFormData = {...formData};
        newFormData[inputName] = value;
        setFormData (newFormData);
    }

    return (
        <form onSubmit={ handleSubmit } style={{ padding: "12px 8px", margin: "15px 5px", border: "solid 1px gray"}}>
            <label>Nombre
                <input onChange={handleInputChange} required name="nombre" type="text" value={formData.nombre} placeholder="Ingrese su nombre..."/>
            </label>
            <label>Apellido
                <input onChange={handleInputChange} required name="apellido" type="text" value={formData.apellido} placeholder="Ingrese su apellido..."/>
            </label>
            <label>Email
                <input onChange={handleInputChange} required name="email" type="email" value={formData.email} placeholder="Ingrese su email..."/>
            </label>
            <label>Telefono
                <input onChange={handleInputChange} required name="telefono" type="tel" value={formData.telefono} placeholder="Ingrese su telefono..."/>
            </label>
            <button type ="submit"> Confirmar Compra </button>
        </form>
    )
}