package nft.bet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Table(name = "bonus")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Bonus")
public class BonusModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private Integer codigoBonus;

    private String tipo;

    private Double valorBonus;

    private Integer percentualBonus;

    private Integer multiplicadorDeAuditoria;

    private Date dataValidade;
}
