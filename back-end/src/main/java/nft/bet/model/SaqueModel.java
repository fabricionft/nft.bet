package nft.bet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "saques")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Saque")
public class SaqueModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String email;
    private String dataSaque;
    private String statusSaque;
    private Double valorSaque;
    private String nomeTitular;
    private String tipoChave;
    private String chave;
    private String cpfTitular;
    private String motivoRejeicao;
}
