package nft.bet.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import nft.bet.model.JogoModel;
import nft.bet.service.JogoService;

import java.util.List;

@RestController
@RequestMapping("/jogos")
public class JogoController {

    @Autowired
    private JogoService jogoService;

    @GetMapping
    public ResponseEntity<?> listarJogos(Pageable pageable){
        return new ResponseEntity<>(
            (pageable.getPageSize() == 20) ? jogoService.listarJogos()
            : converterEmListaPaginada(jogoService.listarJogos(), pageable)
        , HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarjogoPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(jogoService.buscarjogoPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> salvarJogo(@RequestBody JogoModel jogo){
        return new ResponseEntity<>(jogoService.salvarJogo(jogo), HttpStatus.CREATED);
    }

    @PostMapping(path = "/solicitar/usuario/{codigo}/bet/{bet}")
    public ResponseEntity<?> executarJogada(@PathVariable Long codigo,
                                             @PathVariable Double bet){
        return new ResponseEntity<>(jogoService.executarJogada(codigo, bet), HttpStatus.OK);
    }

    @PostMapping(path = "/encerrar/usuario/{codigo}/lucro/{lucro}")
    public ResponseEntity<?> encerraeJogada(@PathVariable Long codigo,
                                            @PathVariable Double lucro){
        return new ResponseEntity<>(jogoService.encerraeJogada(codigo, lucro), HttpStatus.OK);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirJogos(){
        return new ResponseEntity<>(jogoService.excluirjogos(), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirJogoPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(jogoService.excluirjogoPorCodigo(codigo), HttpStatus.OK);
    }


    //Métodos Privados
    public Page<JogoModel> converterEmListaPaginada(List<JogoModel> jogos, Pageable pageable) {
        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), jogos.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<JogoModel> pageListJogos
            = new PageImpl<>(
            jogos.subList(comeco, fim),
            pageable,
            jogos.size()
        );

        return pageListJogos;
    }
}
