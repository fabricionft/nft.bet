package nft.bet.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "pixs")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "Pix")
public class ChavePixModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String nomeTitular;
    private String tipoChave;
    private String chave;
    private String cpfTitular;
}
