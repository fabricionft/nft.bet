package nft.bet.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity(name = "Imagem")
@Getter
@Setter
@Table(name = "imagens")
public class ImagemModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;

    private String srcImagem;
    private String altImagem;
}
