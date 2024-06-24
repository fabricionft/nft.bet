package nft.bet.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CadastroRequestDTO {

    private String nomeCompleto;
    private String email;
    private String senha;
    private String celular;
    private String cpf;
    private Long convite;
    private Integer codigoBonus;
    private Integer confirmacao;
}
