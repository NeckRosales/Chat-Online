$(function(){
    const socket = io();
    var nick = '';

    
    
    const messageForm = $('#messages-form');
    const messageBox = $('#message');
    const chat = $('#chat');

    const nickForm = $('#nick-form');
    const nickError = $('#nick-error');
    const nickName = $('#nick-name');

    const userNames = $('#usernames');

 

    messageForm.submit( e =>{
   
        e.preventDefault();
      
        socket.emit('enviar mensaje', messageBox.val());

        messageBox.val('');
    });

  
    socket.on('nuevo mensaje', function(datos){
        let color = '#f5f4f4';
        if(nick == datos.nick){
            color = '#9ff4c5';
        }
        
        chat.append(`
        <div class="msg-area mb-2" style="background-color:${color}">
            <p class="msg"><b>${datos.nick} :</b> ${datos.msg}</p>
        </div>
        `);

    });


    nickForm.submit( e =>{
        e.preventDefault();
        console.log('Enviando...');
        socket.emit('nuevo usuario', nickName.val(), datos =>{
            if(datos){
                nick = nickName.val();

                $('#nick-wrap').toggleClass('hide');
                $('#content-wrap').toggleClass('hide');
            }else{
                nickError.html(`
                <div class="alert alert-danger">
                El usuario ya existe
                </div>
                `); 
            }
            nickName.val('');
        });

    });


    socket.on('usernames', datos =>{
        let html = '';
        let color = '#000';
        let salir = '';
        const colores = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500', '#800080', '#008000', '#FF4500', '#00CED1', '#FFC0CB', '#8B4513', '#4B0082', '#808000',
          ];

        console.log(nick);
        for(let i = 0; i < datos.length; i++){
            if(nick == datos[i]){
                for(let i = 0; i < 14; i++){
                var numero = Math.floor(Math.random() * 100) + 1;
                color = colores[numero];
                }  
                salir = `<a class="enlace-salir" href="/"><i class="fas fa-sign-out-alt salir"></i></a>`;
            }else{
                color = colores[i];
                salir = '';
            }
            html += `<p style="color:${color}"><i class="fas fa-user"></i> ${datos[i]} ${salir}</p>`;
        }

        userNames.html(html);
    });

});