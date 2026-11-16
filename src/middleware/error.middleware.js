function middleware_error_server (error,request,response,next) {
    
            //Error esperable
            if (error.status){
                    return response.send({
                        ok:false,
                        status: error.status,
                        message: error.message
                        }
                    )
                }
                //Error inesperado*
                else{
                    console.log('[Middleware Error]', error.message)
                    return response.send({
                        ok:false,
                        status: 500,
                        message: "Error interno del servidor"
                        }
                    )
                }
            }

export default middleware_error_server