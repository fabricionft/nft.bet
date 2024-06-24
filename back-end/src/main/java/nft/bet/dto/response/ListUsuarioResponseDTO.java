package nft.bet.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ListUsuarioResponseDTO {

    private Long codigo;
    private Long ID;
    private String role;
    private String dataCadastro;
    private String email;
    private String cpf;
}
