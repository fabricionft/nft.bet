package nft.bet.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;

@ControllerAdvice
public class HandlerException extends ResponseEntityExceptionHandler {

    @ExceptionHandler(RequestException.class)
    public ResponseEntity<MessageHandlerException> tratarErro(Exception exception){
        MessageHandlerException message = new MessageHandlerException(
            new Date(),
            HttpStatus.UNAUTHORIZED.value(),
            "Não autorizado",
            exception.getMessage()
        );

        return  new ResponseEntity<>(message, HttpStatus.UNAUTHORIZED);
    }
}
