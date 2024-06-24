package nft.bet.dto.response;

import lombok.Getter;
import lombok.Setter;
import nft.bet.model.BonusModel;
import nft.bet.model.ChavePixModel;
import nft.bet.model.DepositoModel;
import nft.bet.model.SaqueModel;

import java.util.List;

@Getter
@Setter
public class UsuarioResponseDTO {

    private Long codigo;
    private Long ID;
    private String role;
    private String dataCadastro;
    private Boolean contaAtiva;
    private String nomeCompleto;
    private String email;
    private String celular;
    private String cpf;
    private Double saldo;
    private Double saldoEmRetirada;
    private Double auditoria;
    private Integer nivel;
    private Integer pontosAdquiridos;
    private Integer pontosNecessariosParaProximoNivel;
    private Long convite;
    private Integer quantidadeDeUsuariosConvidados;
    private Double ganhosComConvite;
    private List<BonusModel> bonusUsados;
    private List<ChavePixModel> chaves;
    private List<DepositoModel> historicoDepositos;
    private List<SaqueModel> historicoSaques;
}
