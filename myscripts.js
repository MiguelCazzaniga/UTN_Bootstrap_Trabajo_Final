    //Esta variable es parte de Form Spree
    var form = document.getElementById("my-form");
    
    //Inyecta HTML en caso de un envío exitoso- la llama la funcion asincrónica
    function mensaje(){
      const insertar=` <div class="card  shadow-lg cardValores" >
      <div class="card-body">
      <h5 class="card-title">Mensaje Enviado</h5>
      <p class="card-text">Gracias por escribir!.
        Me pondré en contacto a la brevedad
      </p>
      <button id="cerrar" class="btn btn-primary" onclick="ocultaMensaje()">Continuar</button>
    </div>
    </div>`
    let  donde= document.getElementById("mensaje")
    donde.innerHTML=insertar;       
          
    }

    //Elimina el HTML que inyecta la funcion mensaje
    //EL event listener que la activa se inyecta como código HTML en la funcion mensaje
    function ocultaMensaje(){
        console.log("oculta")
        document.getElementById("mensaje").innerHTML="";
    }

    //Funcion Asyncronica. La lógica la provee FormSpree
    async function handleSubmit(event) {
      
      event.preventDefault();
      var status = document.getElementById("my-form-status");
      var data = new FormData(event.target);
     
      console.log(event)
      fetch(event.target.action, {
        method: form.method,
        body: data,
        headers: {
            'Accept': 'application/json'
        }
      }).then(response => {
        if (response.ok) {
          mensaje();
          form.reset()
        } else {
          response.json().then(data => {
            if (Object.hasOwn(data, 'errors')) {
              status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
            } else {
              status.innerHTML = "Oops! There was a problem submitting your form"
            }
          })
        }
      }).catch(error => {
        status.innerHTML = "Oops! There was a problem submitting your form"
      });
      
    }
   
    form.addEventListener("submit", handleSubmit)
    
 
    