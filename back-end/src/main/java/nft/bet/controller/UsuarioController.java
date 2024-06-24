package nft.bet.controller;

import nft.bet.dto.request.*;
import nft.bet.dto.response.ListUsuarioResponseDTO;
import nft.bet.model.UsuarioModel;
import nft.bet.service.UsuarioService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import nft.bet.dto.response.UsuarioResponseDTO;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private ModelMapper modelMapper;
    

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> listarUsuarios(Pageable pageable){
        return new ResponseEntity<>(
            (pageable.getPageSize() == 20) ? usuarioService.listarUsuarios()
            : converterEmListaPaginadaDeResponseDTO(usuarioService.listarUsuarios()
        , pageable), HttpStatus.OK);
    }

    @GetMapping(path = "/porCodigo/{codigo}")
    public ResponseEntity<?> buscarUsuarioPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.buscarUsuarioPorCodigo(codigo)), HttpStatus.OK);
    }

    @GetMapping(path = "/porID/{id}")
    public ResponseEntity<?> buscarUsuarioPorID(@PathVariable Long id){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.buscarUsuarioPorID(id)), HttpStatus.OK);
    }

    @GetMapping("/saldo/{codigo}")
    public ResponseEntity<?> buscarSaldoDeUmUsuarioPorCodigo(@PathVariable Long codigo){
        return new ResponseEntity<>(usuarioService.buscarSaldoDeUmUsuarioPorCodigo(codigo), HttpStatus.OK);
    }

    @PostMapping(path = "/solicitarCodigo")
    public ResponseEntity<?> solicitarCodigoDeConfirmacao(@RequestParam String email,
                                                          @RequestParam  Boolean recuperar){
        return new ResponseEntity<>(usuarioService.solicitarCodigoDeConfirmacao(email, recuperar), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> salvarUsuario(@RequestBody CadastroRequestDTO cadastroRequest){
        UsuarioModel usuario = modelMapper.map(cadastroRequest, UsuarioModel.class);
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.salvarUsuario(usuario, cadastroRequest.getCodigoBonus(), cadastroRequest.getConfirmacao())), HttpStatus.CREATED);
    }

    @PostMapping(path = "/login")
    public ResponseEntity<?> fazerLogin(@RequestBody LoginRequestDTO loginRequest){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.fazerLogin(loginRequest)), HttpStatus.OK);
    }

    @PostMapping(path = "/loginAdmin")
    public ResponseEntity<?> fazerLoginComoAdmin(@RequestBody LoginAdminRequestDTO loginAdminRequest){
        return new ResponseEntity<>(usuarioService.fazerLoginComoAdmin(loginAdminRequest), HttpStatus.OK);
    }

    @PutMapping(path = "/recuperarSenha")
    public  ResponseEntity<?> recuperarSenhaUsuario(@RequestBody RecuperarSenhaRequestDTO recuperarSenhaRequest){
        return new ResponseEntity<>(usuarioService.recuperarSenhaUsuario(recuperarSenhaRequest), HttpStatus.OK);
    }

    @PutMapping(path = "/alterarRole/{codigo}/{senha}")
    public ResponseEntity<?> alterarRoleUsuario(@PathVariable Long codigo,
                                                @PathVariable String senha){
        return new ResponseEntity<>(converterEmResponseDTO(usuarioService.alterarRoleUsuario(codigo, senha)), HttpStatus.OK);
    }

    @PutMapping(path = "/alterarSenha")
    public ResponseEntity<?> alterarSenhaUsuario(@RequestBody AlterarSenhaRequestDTO alterarSenhaRequest){
        return new ResponseEntity<>(usuarioService.alterarSenhaUsuario(alterarSenhaRequest), HttpStatus.OK);
    }

    @PutMapping(path = "/alterarStatus/{codigo}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> alterarStatusUsuario(@PathVariable Long codigo){
        return new ResponseEntity<>(usuarioService.alterarStatusUsuario(codigo), HttpStatus.OK);
    }


    //Metódos privados
    private UsuarioResponseDTO converterEmResponseDTO(UsuarioModel usuario){
        return modelMapper.map(usuario, UsuarioResponseDTO.class);
    }

    private ListUsuarioResponseDTO converterEmListResponseDTO(UsuarioModel usuario){
        return modelMapper.map(usuario, ListUsuarioResponseDTO.class);
    }


    private List<ListUsuarioResponseDTO> converterEmListaDeListResponseUSuario(List<UsuarioModel> usuarios){
        List<ListUsuarioResponseDTO> listUsuariosResonse = new ArrayList<>();
        for(UsuarioModel usuario: usuarioService.listarUsuarios()){
            listUsuariosResonse.add(converterEmListResponseDTO(usuario));
        }
        return listUsuariosResonse;
    }

    public Page<ListUsuarioResponseDTO> converterEmListaPaginadaDeResponseDTO(List<UsuarioModel> usuarios, Pageable pageable) {
        List<ListUsuarioResponseDTO> listUsuarioResponseDTO = converterEmListaDeListResponseUSuario(usuarios);

        int comeco = (int) pageable.getOffset();
        int fim = Math.min((comeco + pageable.getPageSize()), usuarios.size());

        if(comeco > fim){
            comeco = 0;
            fim = 0;
        }


        Page<ListUsuarioResponseDTO> pageListUsuariosResponseDTO
            = new PageImpl<>(
            listUsuarioResponseDTO.subList(comeco, fim),
            pageable,
            listUsuarioResponseDTO.size()
        );

        return pageListUsuariosResponseDTO;
    }
}
