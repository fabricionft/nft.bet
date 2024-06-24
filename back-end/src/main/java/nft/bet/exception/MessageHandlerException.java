package nft.bet.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MessageHandlerException {

    private Date timestamp;
    private Integer status;
    private String error;
    private String message;
}
