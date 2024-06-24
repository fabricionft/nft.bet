package nft.bet.controller;

import nft.bet.model.ImagemModel;
import nft.bet.service.ImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/imagens")
public class ImagemController {

    @Autowired
    private ImagemService imagemService;


    @GetMapping
    public ResponseEntity<?> listarImagens(Pageable pageable){
        return new ResponseEntity<>(
            (pageable.getPageSize() == 20) ? imagemService.listarImagens()
            : converterEmListaPaginada(imagemService.listarImagens(), pageable)
        , HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarImagemPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(imagemService.buscarImagemPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> salvarImagem(@RequestBody ImagemModel imagem){
        return new ResponseEntity<>(imagemService.salvarImagem(imagem), HttpStatus.CREATED);
    }

    @DeleteMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirImagemPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(imagemService.deletarImagemPorCodigo(codigo), HttpStatus.OK);
    }

    //Métodos privados
    public Page<ImagemModel> converterEmListaPaginada(List<ImagemModel> imagens, Pageable pageable) {
        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), imagens.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<ImagemModel> pageListImagens
            = new PageImpl<>(
            imagens.subList(comeco, fim),
            pageable,
            imagens.size()
        );

        return pageListImagens;
    }
}
