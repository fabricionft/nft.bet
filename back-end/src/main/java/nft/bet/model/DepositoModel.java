package nft.bet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "depositos")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Deposito")
public class DepositoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String email;
    private String dataDeposito;
    private String statusDeposito;
    private Double valorDeposito;
    private Double valorComBonus;
    private Double auditoriaNecessaria;
    private Integer multiplicadorDeAudutoria;
    private Integer codigoBonus;
    private String motivoRejeicao;
}
