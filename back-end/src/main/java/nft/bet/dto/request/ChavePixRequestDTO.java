package nft.bet.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChavePixRequestDTO {

    private Long codigoUsuario;
    private String nomeTitular;
    private String tipoChave;
    private String chave;
    private String cpfTitular;
}
