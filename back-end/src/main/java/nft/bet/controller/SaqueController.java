package nft.bet.controller;

import nft.bet.dto.request.SaqueRequestDTO;
import nft.bet.model.SaqueModel;
import nft.bet.service.SaqueService;
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
@RequestMapping("/saques")
public class SaqueController {

    @Autowired
    private SaqueService saqueService;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarSaques(Pageable pageable){
        return new ResponseEntity<>(
            (pageable.getPageSize() == 20) ? saqueService.listarSaques()
            : saqueService.listarSaques()
        , HttpStatus.OK);
    }

    @GetMapping(path = "/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarSaquesPorStatus(@PathVariable String status,
                                                   Pageable pageable){
        return new ResponseEntity<>(converterEmListaPaginada(saqueService.listarSaquesPorStatus(status), pageable), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarSaquePorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(saqueService.buscarSaquePorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> solicitarSaque(@RequestBody SaqueRequestDTO saqueRequest){
        return new ResponseEntity<>(saqueService.solicitarSaque(saqueRequest), HttpStatus.CREATED);
    }

    @PostMapping(path = "/autorizar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> autorizarSaque(@RequestBody SaqueModel saque){
        return new ResponseEntity<>(saqueService.autorizarSaque(saque), HttpStatus.OK);
    }

    @PostMapping(path = "/recusar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> recusarSaque(@RequestBody SaqueModel saque){
        return new ResponseEntity<>(saqueService.recusarSaque(saque), HttpStatus.OK);
    }


    //Métodos privados
    public Page<SaqueModel> converterEmListaPaginada(List<SaqueModel> saques, Pageable pageable) {
        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), saques.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<SaqueModel> pageListSaques
            = new PageImpl<>(
            saques.subList(comeco, fim),
            pageable,
            saques.size()
        );

        return pageListSaques;
    }
}
