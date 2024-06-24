package nft.bet.controller;

import nft.bet.model.DepositoModel;
import nft.bet.service.DepositoService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import nft.bet.dto.request.DepositoRequestDTO;
import nft.bet.dto.response.UsuarioResponseDTO;
import nft.bet.model.UsuarioModel;

import java.util.List;

@RestController
@RequestMapping("/depositos")
public class DepositoController {

    @Autowired
    private DepositoService depositoService;

    @Autowired
    private ModelMapper modelMapper;


    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarDepositos(Pageable pageable){
        return new ResponseEntity<>(
            (pageable.getPageSize() == 20) ? depositoService.listarDepositos()
            : depositoService.listarDepositos()
        , HttpStatus.OK);
    }

    @GetMapping(path = "/status/{status}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarDepositosPorStatus(@PathVariable String status,
                                                      Pageable pageable){
        return new ResponseEntity<>(converterEmListaPaginada(depositoService.listarDepositosPorStatus(status), pageable), HttpStatus.OK);
    }

    @GetMapping(path = "/{codigo}")
    public ResponseEntity<?> buscarDepositoPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(depositoService.buscarDepositoPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> solicitarDeposito(@RequestBody DepositoRequestDTO depositoRequest){
        return new ResponseEntity<>(converterEmUsuarioResponse(depositoService.solicitarDeposito(depositoRequest)), HttpStatus.CREATED);
    }

    @PostMapping(path = "/autorizar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> autorizarDeposito(@RequestBody DepositoModel deposito){
        return new ResponseEntity<>(depositoService.autorizarDeposito(deposito), HttpStatus.OK);
    }

    @PostMapping(path = "/recusar")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> recusarDeposito(@RequestBody DepositoModel deposito){
        return new ResponseEntity<>(depositoService.recusarDeposito(deposito), HttpStatus.OK);
    }

    //Metódos privados
    private UsuarioResponseDTO converterEmUsuarioResponse(UsuarioModel usuario){
        return modelMapper.map(usuario, UsuarioResponseDTO.class);
    }

    //Métodos privados
    public Page<DepositoModel> converterEmListaPaginada(List<DepositoModel> depositos, Pageable pageable) {
        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), depositos.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }

        Page<DepositoModel> pageListDepositos
            = new PageImpl<>(
            depositos.subList(comeco, fim),
            pageable,
            depositos.size()
        );

        return pageListDepositos;
    }
}
