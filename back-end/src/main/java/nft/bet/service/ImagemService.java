package nft.bet.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import nft.bet.exception.RequestException;
import nft.bet.model.ImagemModel;
import nft.bet.repository.ImagemRepository;

import java.util.List;

@Service
public class ImagemService {

    @Autowired
    private ImagemRepository imagemRepository;


    public List<ImagemModel> listarImagens(){
        return imagemRepository.findAll();
    }

    public ImagemModel buscarImagemPorCodigo(Long codigo){
        return  imagemRepository.findByCodigo(codigo)
                .orElseThrow(() -> new RequestException("Imagem inexistente"));
    }

    public ImagemModel salvarImagem(ImagemModel imagem){
        return imagemRepository.save(imagem);
    }

    public String deletarImagemPorCodigo(Long codigo){
        ImagemModel imagem = buscarImagemPorCodigo(codigo);
        imagemRepository.delete(imagem);
        return  "Imagem deletada com sucesso!";
    }
}
