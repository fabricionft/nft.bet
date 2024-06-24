package nft.bet.controller;

import nft.bet.dto.request.BonusRequestDTO;
import nft.bet.model.BonusModel;
import nft.bet.service.BonusService;
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
@RequestMapping("/bonus")
public class BonusController {

    @Autowired
    private BonusService bonusService;

    @GetMapping
    public ResponseEntity<?> listarBonus(Pageable pageable){
        return  new ResponseEntity<>(
            (pageable.getPageSize() == 20) ? bonusService.listarBonus()
            : converterEmListaPaginada(bonusService.listarBonus(), pageable)
        , HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> buscarBônusPorCodigo(@PathVariable Long codigo){
        return  new ResponseEntity<>(bonusService.buscarBonusPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> criarBonus(@RequestBody BonusRequestDTO bonusRequest){
        return new ResponseEntity<>(bonusService.criarBonus(bonusRequest), HttpStatus.CREATED);
    }

    @PutMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> editarBonus(@RequestBody BonusRequestDTO bonusRequest){
        return new ResponseEntity<>(bonusService.editarBonus(bonusRequest), HttpStatus.CREATED);
    }

    @DeleteMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirBonus(){
        return new ResponseEntity<>(bonusService.excluirTodosBonus(), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> excluirBônusPorCodigo(@PathVariable Long codigo){
        return  new ResponseEntity<>(bonusService.excluirBonusPorCodigo(codigo), HttpStatus.OK);
    }


    //Métodos privados
    public Page<BonusModel> converterEmListaPaginada(List<BonusModel> bonus, Pageable pageable) {
        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), bonus.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<BonusModel> pageListBonus
                = new PageImpl<>(
                bonus.subList(comeco, fim),
                pageable,
                bonus.size()
        );

        return pageListBonus;
    }
}
