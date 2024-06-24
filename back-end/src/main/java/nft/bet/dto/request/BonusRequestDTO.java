package nft.bet.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BonusRequestDTO {

    private  Long codigo;
    private String tipo;
    private Double valorBonus;
    private Integer percentualBonus;
    private Integer multiplicadorDeAuditoria;
    private String dataValidade;
}
