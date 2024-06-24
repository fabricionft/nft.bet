package nft.bet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Table(name = "jogos")
@Getter
@Setter
@Entity(name = "Jogo")
public class JogoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String nome;

    private String urlJogo;

    private String urlImagem;

    private String tipo;
}
