package nft.bet.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AlterarSenhaRequestDTO {

    private String email;
    private String senha;
    private String novaSenha;
    private String confirmacaoNovaSenha;
}
